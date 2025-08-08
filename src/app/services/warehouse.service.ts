import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Zone, Section, Shelf, StorageUnit, WarehouseHierarchy } from '../models/warehouse.interface';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private mockData: WarehouseHierarchy = {
    zones: [
      { zoneCode: 'A', name: 'Receiving Zone', description: 'Incoming goods area' },
      { zoneCode: 'B', name: 'Storage Zone', description: 'Main storage area' },
      { zoneCode: 'C', name: 'Shipping Zone', description: 'Outgoing goods area' },
      { zoneCode: 'D', name: 'Cold Storage Zone', description: 'Temperature controlled area' },
      { zoneCode: 'E', name: 'Hazardous Zone', description: 'Special handling materials' }
    ],
    sections: [
      { sectionCode: 'A01', name: 'Dock Area 1', zoneCode: 'A', description: 'Loading dock 1' },
      { sectionCode: 'A02', name: 'Dock Area 2', zoneCode: 'A', description: 'Loading dock 2' },
      { sectionCode: 'B01', name: 'General Storage 1', zoneCode: 'B', description: 'General merchandise' },
      { sectionCode: 'B02', name: 'General Storage 2', zoneCode: 'B', description: 'General merchandise' },
      { sectionCode: 'B03', name: 'Heavy Items', zoneCode: 'B', description: 'Heavy equipment storage' },
      { sectionCode: 'C01', name: 'Shipping Area 1', zoneCode: 'C', description: 'Outbound processing' },
      { sectionCode: 'C02', name: 'Shipping Area 2', zoneCode: 'C', description: 'Express shipping' },
      { sectionCode: 'D01', name: 'Freezer Section', zoneCode: 'D', description: 'Frozen goods' },
      { sectionCode: 'D02', name: 'Cooler Section', zoneCode: 'D', description: 'Refrigerated goods' },
      { sectionCode: 'E01', name: 'Chemical Storage', zoneCode: 'E', description: 'Chemical materials' }
    ],
    shelves: [
      { shelfCode: 'A01-S01', name: 'Shelf 1', sectionCode: 'A01', zoneCode: 'A', description: 'Top shelf' },
      { shelfCode: 'A01-S02', name: 'Shelf 2', sectionCode: 'A01', zoneCode: 'A', description: 'Middle shelf' },
      { shelfCode: 'A01-S03', name: 'Shelf 3', sectionCode: 'A01', zoneCode: 'A', description: 'Bottom shelf' },
      { shelfCode: 'B01-S01', name: 'Aisle A', sectionCode: 'B01', zoneCode: 'B', description: 'Left aisle' },
      { shelfCode: 'B01-S02', name: 'Aisle B', sectionCode: 'B01', zoneCode: 'B', description: 'Center aisle' },
      { shelfCode: 'B01-S03', name: 'Aisle C', sectionCode: 'B01', zoneCode: 'B', description: 'Right aisle' },
      { shelfCode: 'B02-S01', name: 'Rack 1', sectionCode: 'B02', zoneCode: 'B', description: 'Storage rack 1' },
      { shelfCode: 'B02-S02', name: 'Rack 2', sectionCode: 'B02', zoneCode: 'B', description: 'Storage rack 2' },
      { shelfCode: 'C01-S01', name: 'Pack Station 1', sectionCode: 'C01', zoneCode: 'C', description: 'Packing area 1' },
      { shelfCode: 'C01-S02', name: 'Pack Station 2', sectionCode: 'C01', zoneCode: 'C', description: 'Packing area 2' }
    ],
    storageUnits: [
      { storageUnitCode: 'A01-S01-U01', name: 'Unit 1A', shelfCode: 'A01-S01', sectionCode: 'A01', zoneCode: 'A', capacity: 100, currentOccupancy: 75 },
      { storageUnitCode: 'A01-S01-U02', name: 'Unit 1B', shelfCode: 'A01-S01', sectionCode: 'A01', zoneCode: 'A', capacity: 100, currentOccupancy: 50 },
      { storageUnitCode: 'A01-S01-U03', name: 'Unit 1C', shelfCode: 'A01-S01', sectionCode: 'A01', zoneCode: 'A', capacity: 100, currentOccupancy: 25 },
      { storageUnitCode: 'B01-S01-U01', name: 'Bin 1A', shelfCode: 'B01-S01', sectionCode: 'B01', zoneCode: 'B', capacity: 200, currentOccupancy: 150 },
      { storageUnitCode: 'B01-S01-U02', name: 'Bin 1B', shelfCode: 'B01-S01', sectionCode: 'B01', zoneCode: 'B', capacity: 200, currentOccupancy: 175 },
      { storageUnitCode: 'B01-S01-U03', name: 'Bin 1C', shelfCode: 'B01-S01', sectionCode: 'B01', zoneCode: 'B', capacity: 200, currentOccupancy: 100 },
      { storageUnitCode: 'B01-S02-U01', name: 'Box 2A', shelfCode: 'B01-S02', sectionCode: 'B01', zoneCode: 'B', capacity: 150, currentOccupancy: 125 },
      { storageUnitCode: 'B01-S02-U02', name: 'Box 2B', shelfCode: 'B01-S02', sectionCode: 'B01', zoneCode: 'B', capacity: 150, currentOccupancy: 90 },
      { storageUnitCode: 'C01-S01-U01', name: 'Slot 1A', shelfCode: 'C01-S01', sectionCode: 'C01', zoneCode: 'C', capacity: 50, currentOccupancy: 30 },
      { storageUnitCode: 'C01-S01-U02', name: 'Slot 1B', shelfCode: 'C01-S01', sectionCode: 'C01', zoneCode: 'C', capacity: 50, currentOccupancy: 45 }
    ]
  };

  constructor() { }

  getAllZones(): Observable<Zone[]> {
    return of(this.mockData.zones).pipe(delay(300));
  }

  getSectionsByZone(zoneCode: string): Observable<Section[]> {
    const sections = this.mockData.sections.filter(section => section.zoneCode === zoneCode);
    return of(sections).pipe(delay(300));
  }

  getShelvesBySection(sectionCode: string): Observable<Shelf[]> {
    const shelves = this.mockData.shelves.filter(shelf => shelf.sectionCode === sectionCode);
    return of(shelves).pipe(delay(300));
  }

  getStorageUnitsByShelf(shelfCode: string): Observable<StorageUnit[]> {
    const storageUnits = this.mockData.storageUnits.filter(unit => unit.shelfCode === shelfCode);
    return of(storageUnits).pipe(delay(300));
  }

  // Get full hierarchy for a specific path
  getFullHierarchy(): Observable<WarehouseHierarchy> {
    return of(this.mockData).pipe(delay(300));
  }
}
