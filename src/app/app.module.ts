import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from './model/model.module';
import { CoreModule } from './core/core.module';
import { MessagesModule } from './messages/messages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import {TermsGuard} from "./terms.guard";
import {LoadGuard} from "./load.guard";
import {SimpleComponent} from "./simple.component";

@NgModule({
  declarations: [AppComponent, SimpleComponent],
  imports: [BrowserModule, ModelModule, CoreModule, MessagesModule, routing],
  providers: [TermsGuard, LoadGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
