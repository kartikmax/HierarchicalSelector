import { Component } from '@angular/core';
import { WarehouseStepperComponent } from './components/warehouse-stepper/warehouse-stepper.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WarehouseStepperComponent, MatToolbarModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Warehouse Management System';
}
