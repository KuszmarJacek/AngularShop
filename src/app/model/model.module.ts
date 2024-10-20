import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { Model } from './repository.model';
import { RestDataSource } from './rest.datasource';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [Model, RestDataSource],
})
export class ModelModule {}
