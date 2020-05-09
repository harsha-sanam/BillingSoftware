import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,DashboardRoutingModule, NgbNavModule
  ]
})
export class DashboardModule { }
