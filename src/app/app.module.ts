import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from './model/model.module';
import { CoreModule } from './core/core.module';
import { MessagesModule } from './messages/messages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import {TermsGuard} from "./terms.guard";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ModelModule, CoreModule, MessagesModule, routing],
  providers: [TermsGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
