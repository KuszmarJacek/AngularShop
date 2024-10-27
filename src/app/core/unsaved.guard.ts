import {Injectable} from "@angular/core";
import {MessageService} from "../messages/message.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {FormComponent} from "./form.component";
import {Message} from "../messages/message.model";

@Injectable()
export class UnsavedGuard {
  constructor(private messages: MessageService, private router: Router) {}

  // check for form is dirty, if it is and the user wants to quit, ask him if he's sure.
  canDeactivate(component: FormComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (component.editing && component.productForm.dirty) {
      return new Promise<boolean>(resolve => {
        let response: [string, () => void][] = [
          ["Yes", () => resolve(true)],
          ["No", () => {
            this.router.navigateByUrl(this.router.url);
            resolve(false);
          }],
        ];
        this.messages.reportMessage(new Message("Discard unsaved changes?", true, response));
      })
    } else {
      return true;
    }
  }
}
