import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./messages/message.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Message} from "./messages/message.model";

@Injectable()
export class LoadGuard {
  private loaded: boolean = false;
  constructor(private messages: MessageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    return this.loaded || new Promise((resolve, reject) => {
      let response: [string, (r: string) => void] [] = [
        ["Yes", () => {
          this.loaded = true;
          resolve(true);
        }],
        ["No", () => {
          this.router.navigateByUrl(this.router.url);
          resolve(false);
        }]
      ];
      this.messages.reportMessage(new Message("Do you want to lazily load the module?", false, response));
    })
  }
}
