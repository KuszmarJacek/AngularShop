import { FormArray } from "@angular/forms";

export type ValueFilter = (value: any) => boolean;

export class FilteredFormArray extends FormArray {
  filter: ValueFilter | undefined = (val) => val == "" || val == null;

  /*
   * TL;DR This is an internal method of angular API, so it can't use override or super or anything else.
   * I hate this so much...
   */
  _updateValue() {
    (this as { value: any }).value = this.controls.filter(
      (control) => (control.enabled || this.disabled) && !this.filter?.(control.value)
    ).map((control) => control.value);
  }
}