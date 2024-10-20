import { Component, computed, Signal } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component({
  selector: "paMessages",
  templateUrl: "message.component.html",
})
export class MessageComponent {
  lastMessage!: Signal<Message>;

  constructor(messageService: MessageService) {
    this.lastMessage = computed(() => {
      return messageService.messages()[messageService.messages().length - 1];
    })
  }
}