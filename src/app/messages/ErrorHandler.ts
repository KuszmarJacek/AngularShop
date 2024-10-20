import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Injectable()
export class MessageErrorHandler implements ErrorHandler {
  /* we need NgZone because, unlike for directives and components, angular doesn't store state of services. 
   * The ngZone.run() method is needed because if it were not used, the Angular detection process would pickup the message, but not display it.
   */
  constructor(private messageService: MessageService, private ngZone: NgZone) {}

  handleError(error: any): void {
    let msg = error instanceof Error ? error.message : error.toString();
    this.ngZone.run(() => this.messageService.reportMessage(new Message(msg, true)), 0);
  }
}