import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MessageComponent } from './message.component';
import { MessageService } from './message.service';

@NgModule({
  declarations: [MessageComponent],
  imports: [BrowserModule],
  exports: [MessageComponent],
  providers: [MessageService],
})
export class MessagesModule {}
