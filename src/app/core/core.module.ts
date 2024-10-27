import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { FormComponent } from './form.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { ValidationHelper } from './validationHelper.pipe';
import { ValidationErrorsDirective } from './validationErrors.directive';
import { HiLowValidatorDirective } from '../validation/hilow';
import { RouterModule } from '@angular/router';
import {NotFoundComponent} from "./notFound.component";
import {ProductCountComponent} from "./productCount.component";
import {CategoryCountComponent} from "./categoryCount.component";

@NgModule({
  declarations: [TableComponent, FormComponent, ValidationHelper, ValidationErrorsDirective, HiLowValidatorDirective, NotFoundComponent, ProductCountComponent, CategoryCountComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, ModelModule, RouterModule],
  exports: [ModelModule, TableComponent, FormComponent],
  providers: [],
})
export class CoreModule {}
