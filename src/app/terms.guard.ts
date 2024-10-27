import {Injectable} from "@angular/core";
import {MessageService} from "./messages/message.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Message} from "./messages/message.model";

@Injectable()
export class TermsGuard {
  constructor(private messages: MessageService, private router: Router) {}

  // Protect the route with mode parameter, where it's value is "create". Make the user click the accept/deny button
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (route.params["mode"] == "create") {
      return new Promise<boolean>(resolve => {
        let response: [string, () => void][] = [
          ["Yes", () => resolve(true)],
          ["No", () => resolve(false)]
        ];
        this.messages.reportMessage(new Message("Do you accept the terms and conditions?", false, response));
      })
    } else {
      return true;
    }
  }

  // Only for the categories route.
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (route.url.length > 0 && route.url[route.url.length - 1].path == "categories") {
      return new Promise<boolean>((resolve, reject) => {
        let response: [string, (arg: string) => void][] = [
          ["Yes", () => resolve(true)],
          ["No", () => resolve(false)]
        ];
        this.messages.reportMessage(new Message("Do you want to see the categories", false, response));
      })
    } else {
      return true;
    }
  }
}
