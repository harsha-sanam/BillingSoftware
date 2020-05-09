import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseHttpClientService } from './services';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[BaseHttpClientService]
})
export class CoreModule { }
