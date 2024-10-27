import {effect, Injectable} from "@angular/core";
import {Product} from "./product.model";
import {Model} from "./repository.model";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {MessageService} from "../messages/message.service";
import {Message} from "../messages/message.model";

@Injectable()
export class ModelResolver {
  private promise: Promise<Product[]>;

  /*
   * Effect needs to be in the constructor instead of the resolve method due to the fact, that functions which are used
   * for creating signals, can be used ONLY when Angular injects a service.
   */
  constructor(private model: Model, private messages: MessageService) {
    this.promise = new Promise((resolve) => {
      effect(() => {
        if (this.model.Products().length > 0) {
          resolve(this.model.Products())
        }
      });
    })
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.messages.reportMessage(new Message("Loading data..."));
    return this.promise;
  }
}
