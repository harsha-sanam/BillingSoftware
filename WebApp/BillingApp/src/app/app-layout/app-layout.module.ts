import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout.component';
import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { SidebarModule } from 'ng-sidebar';



@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    CommonModule, AppLayoutRoutingModule,SidebarModule.forRoot()
  ]
})
export class AppLayoutModule { }
