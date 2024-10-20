import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class UniqueValidator {
  static uniqueChild(control: AbstractControl): ValidationErrors | null {
    return control.parent?.hasError('unique') ? { 'unique-child': {} } : null;
  }

  // Daring today, aren't we?
  static unique(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let badElems: AbstractControl[] = [];
      let goodElems: AbstractControl[] = [];
      if (control instanceof FormArray) {
        control.controls.forEach((child, index) => {
          if (
            control.controls
              .filter((c, index2) => index2 != index)
              .some(
                (target) => target.value != '' && target.value == child.value
              )
          ) {
            badElems.push(child);
          } else {
            goodElems.push(child);
          }
        });
        setTimeout(() => {
          badElems.forEach((c) => {
            if (!c.hasValidator(this.uniqueChild)) {
              c.markAsDirty();
              c.addValidators(this.uniqueChild);
              c.updateValueAndValidity({ onlySelf: true, emitEvent: false });
            }
          });
          goodElems.forEach((c) => {
            if (c.hasValidator(this.uniqueChild)) {
              c.removeValidators(this.uniqueChild);
            }
            c.updateValueAndValidity({ onlySelf: true, emitEvent: false });
          });
        }, 0);
      }
      return badElems.length > 0 ? { unique: {} } : null;
    };
  }

  // static unique(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (control instanceof FormArray) {
  //       // a filter in a filter eh?
  //       let badElems = control.controls.filter((child, index) => {
  //         return control.controls.filter((c, index2) => index2 != index)
  //           .some(target => target.value != "" && target.value == child.value);
  //       });
  //       if (badElems.length > 0) {
  //         return {
  //           "unique": {}
  //         }
  //       }
  //     }
  //     return null;
  //   }
  // }
}
