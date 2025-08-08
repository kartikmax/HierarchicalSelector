import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { WarehouseService } from '../../services/warehouse.service';
import { Zone, Section, Shelf, StorageUnit, LocationSelection } from '../../models/warehouse.interface';

@Component({
  selector: 'app-warehouse-stepper',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './warehouse-stepper.component.html',
  styleUrls: ['./warehouse-stepper.component.css']
})
export class WarehouseStepperComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  // Form groups for each step
  zoneFormGroup!: FormGroup;
  sectionFormGroup!: FormGroup;
  shelfFormGroup!: FormGroup;
  storageUnitFormGroup!: FormGroup;

  // Data sources for tables
  zonesDataSource = new MatTableDataSource<Zone>([]);
  sectionsDataSource = new MatTableDataSource<Section>([]);
  shelvesDataSource = new MatTableDataSource<Shelf>([]);
  storageUnitsDataSource = new MatTableDataSource<StorageUnit>([]);

  // Table columns
  zoneColumns: string[] = ['zoneCode', 'name', 'description'];
  sectionColumns: string[] = ['sectionCode', 'name', 'description'];
  shelfColumns: string[] = ['shelfCode', 'name', 'description'];
  storageUnitColumns: string[] = ['storageUnitCode', 'name', 'capacity', 'currentOccupancy', 'occupancyRate'];

  // Loading states
  loadingZones = false;
  loadingSections = false;
  loadingShelves = false;
  loadingStorageUnits = false;

  // Selection tracking
  selection: LocationSelection = {};

  constructor(
    private formBuilder: FormBuilder,
    private warehouseService: WarehouseService
  ) {
    this.createForms();
  }

  ngOnInit(): void {
    this.loadZones();
    this.setupSearchFilters();
  }

  private createForms(): void {
    this.zoneFormGroup = this.formBuilder.group({
      search: ['']
    });

    this.sectionFormGroup = this.formBuilder.group({
      search: ['']
    });

    this.shelfFormGroup = this.formBuilder.group({
      search: ['']
    });

    this.storageUnitFormGroup = this.formBuilder.group({
      search: ['']
    });
  }

  private setupSearchFilters(): void {
    // Zone search filter
    this.zoneFormGroup.get('search')?.valueChanges.subscribe(value => {
      this.zonesDataSource.filter = value ? value.trim().toLowerCase() : '';
    });

    // Section search filter
    this.sectionFormGroup.get('search')?.valueChanges.subscribe(value => {
      this.sectionsDataSource.filter = value ? value.trim().toLowerCase() : '';
    });

    // Shelf search filter
    this.shelfFormGroup.get('search')?.valueChanges.subscribe(value => {
      this.shelvesDataSource.filter = value ? value.trim().toLowerCase() : '';
    });

    // Storage unit search filter
    this.storageUnitFormGroup.get('search')?.valueChanges.subscribe(value => {
      this.storageUnitsDataSource.filter = value ? value.trim().toLowerCase() : '';
    });
  }

  private loadZones(): void {
    this.loadingZones = true;
    this.warehouseService.getAllZones().subscribe({
      next: (zones) => {
        this.zonesDataSource.data = zones;
        this.loadingZones = false;
      },
      error: (error) => {
        console.error('Error loading zones:', error);
        this.loadingZones = false;
      }
    });
  }

  onZoneSelect(zone: Zone): void {
    this.selection.selectedZone = zone;
    this.loadingSections = true;
    
    this.warehouseService.getSectionsByZone(zone.zoneCode).subscribe({
      next: (sections) => {
        this.sectionsDataSource.data = sections;
        this.loadingSections = false;
        this.stepper.next();
      },
      error: (error) => {
        console.error('Error loading sections:', error);
        this.loadingSections = false;
      }
    });
  }

  onSectionSelect(section: Section): void {
    this.selection.selectedSection = section;
    this.loadingShelves = true;
    
    this.warehouseService.getShelvesBySection(section.sectionCode).subscribe({
      next: (shelves) => {
        this.shelvesDataSource.data = shelves;
        this.loadingShelves = false;
        this.stepper.next();
      },
      error: (error) => {
        console.error('Error loading shelves:', error);
        this.loadingShelves = false;
      }
    });
  }

  onShelfSelect(shelf: Shelf): void {
    this.selection.selectedShelf = shelf;
    this.loadingStorageUnits = true;
    
    this.warehouseService.getStorageUnitsByShelf(shelf.shelfCode).subscribe({
      next: (storageUnits) => {
        this.storageUnitsDataSource.data = storageUnits;
        this.loadingStorageUnits = false;
        this.stepper.next();
      },
      error: (error) => {
        console.error('Error loading storage units:', error);
        this.loadingStorageUnits = false;
      }
    });
  }

  onStorageUnitSelect(storageUnit: StorageUnit): void {
    this.selection.selectedStorageUnit = storageUnit;
    console.log('Final selection completed:', this.selection);
    // Here you would typically emit an event or call a service to handle the final selection
  }

  getOccupancyRate(storageUnit: StorageUnit): string {
    if (!storageUnit.capacity || !storageUnit.currentOccupancy) {
      return 'N/A';
    }
    const rate = (storageUnit.currentOccupancy / storageUnit.capacity) * 100;
    return `${rate.toFixed(1)}%`;
  }

  getOccupancyClass(storageUnit: StorageUnit): string {
    if (!storageUnit.capacity || !storageUnit.currentOccupancy) {
      return '';
    }
    const rate = (storageUnit.currentOccupancy / storageUnit.capacity) * 100;
    if (rate >= 90) return 'occupancy-high';
    if (rate >= 70) return 'occupancy-medium';
    return 'occupancy-low';
  }

  resetStepper(): void {
    this.selection = {};
    this.sectionsDataSource.data = [];
    this.shelvesDataSource.data = [];
    this.storageUnitsDataSource.data = [];
    this.stepper.reset();
    
    // Reset search forms
    this.zoneFormGroup.get('search')?.setValue('');
    this.sectionFormGroup.get('search')?.setValue('');
    this.shelfFormGroup.get('search')?.setValue('');
    this.storageUnitFormGroup.get('search')?.setValue('');
  }

  getSelectionSummary(): string {
    const parts = [];
    if (this.selection.selectedZone) parts.push(`Zone: ${this.selection.selectedZone.name}`);
    if (this.selection.selectedSection) parts.push(`Section: ${this.selection.selectedSection.name}`);
    if (this.selection.selectedShelf) parts.push(`Shelf: ${this.selection.selectedShelf.name}`);
    if (this.selection.selectedStorageUnit) parts.push(`Storage Unit: ${this.selection.selectedStorageUnit.name}`);
    return parts.join(' → ');
  }
}
