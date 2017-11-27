import { selectOption } from "fw/dynamic-forms/view-models/select-option";

//import { selectOption } from "./select-option";

export interface FieldDefinition {
  key: string,
  type: string,
  isId: boolean,
  label: string,
  required: boolean,
  inputType?:string,
  options?:Array<selectOption>
}