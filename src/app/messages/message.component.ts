import { Component, computed, signal, Signal } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { NavigationCancel, NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "paMessages",
  templateUrl: "message.component.html",
})
export class MessageComponent {
  lastMessage!: Signal<Message | undefined>;

  constructor(messageService: MessageService, router: Router) {
    // signal(-1) to indicate that we haven't changed the route yet
    let clearedLen = signal(-1);
    router.events.subscribe(ev => {
      if (ev instanceof NavigationCancel || ev instanceof NavigationEnd) {
        clearedLen.set(messageService.messages().length);
      }
    });

    this.lastMessage = computed(() => {
      if (messageService.messages().length > clearedLen()) {
        return messageService.messages()[messageService.messages().length - 1];
      }
      return undefined;
    })
    // this.lastMessage = computed(() => {
    //   return messageService.messages()[messageService.messages().length - 1];
    // })
  }
}