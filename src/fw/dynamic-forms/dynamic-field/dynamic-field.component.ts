import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldDefinition } from 'fw/dynamic-forms/view-models/field-definition';
import { ClassField } from '@angular/compiler/src/output/output_ast';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'fw-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.css']
})
export class DynamicFieldComponent implements OnInit, OnChanges  {
  @Input() field: FieldDefinition;
  @Input() form: FormGroup;
  @Input() operation: string;
  @Input() submitted: boolean;
  private disabled:boolean = false;

  get isValid() { return this.form.controls[this.field.key].valid; }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setEnableDisable(this.operation);
  }

  setEnableDisable(operation):void{
    if(operation == "details" || this.field.isId)
      this.disabled = true;
    else
      this.disabled = false;
    }
}
