import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { Model } from './repository.model';
import { RestDataSource } from './rest.datasource';
import {ModelResolver} from "./model.resolver";

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [Model, RestDataSource, ModelResolver],
})
export class ModelModule {}
