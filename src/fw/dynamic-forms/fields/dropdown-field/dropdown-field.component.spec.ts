import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DropdownFieldComponent } from './dropdown-field.component';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

describe('DropdownFieldComponent', () => {
  let component: DropdownFieldComponent;
  let fixture: ComponentFixture<DropdownFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownFieldComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownFieldComponent);
    component = fixture.componentInstance;
    const field:FieldDefinition  = {id:1, key:'test', type:'lookUp', options:[]};
    const formControl = new FormControl(field);
    component.field = field;
    component.form = new FormGroup({test : formControl});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
