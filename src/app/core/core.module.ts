import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { FormComponent } from './form.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { SharedState } from './sharedState.service';

@NgModule({
  declarations: [TableComponent, FormComponent],
  imports: [BrowserModule, FormsModule, ModelModule],
  exports: [ModelModule, TableComponent, FormComponent],
  providers: [SharedState],
})
export class CoreModule {}
