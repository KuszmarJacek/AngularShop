import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { FormComponent } from './form.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { SharedState } from './sharedState.service';
import { ValidationHelper } from './validationHelper.pipe';
import { ValidationErrorsDirective } from './validationErrors.directive';
import { HiLowValidatorDirective } from '../validation/hilow';

@NgModule({
  declarations: [TableComponent, FormComponent, ValidationHelper, ValidationErrorsDirective, HiLowValidatorDirective],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, ModelModule],
  exports: [ModelModule, TableComponent, FormComponent],
  providers: [SharedState],
})
export class CoreModule {}
