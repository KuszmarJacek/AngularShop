import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MessageComponent } from './message.component';
import { MessageService } from './message.service';
import { MessageErrorHandler } from './ErrorHandler';

@NgModule({
  declarations: [MessageComponent],
  imports: [BrowserModule],
  exports: [MessageComponent],
  providers: [MessageService, { provide: ErrorHandler, useClass: MessageErrorHandler }],
})
export class MessagesModule {}
