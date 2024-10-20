import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Model } from './repository.model';
import { StaticDataSource } from './static.datasource';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [Model, StaticDataSource],
})
export class ModelModule {}
