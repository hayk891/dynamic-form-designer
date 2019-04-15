import { Injectable } from '@angular/core';
import { AbstractField } from '../models/AbstractField';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  get answer(): object {
    return this._answer;
  }

  set answer(value: object) {
    this._answer = value;
  }

  public formFields: AbstractField[];
  private title: string = 'Untitled form';
  private description: string = null;
  public formChanged$ = new ReplaySubject<void>(1);

  private _answer: object = {};

  constructor() {
    this.formFields = [];
  }

  addField(field): void {
    this.formFields.push(field);
    this.formChanged$.next();
  }

  editField(index, field): void {
    this.formFields[index] = field;
  }

  set setTitle(title: string) {
    this.title = title;
  }

  set setDescription(desc: string) {
    this.description = desc;
  }

  get getTitle(): string {
    return this.title;
  }

  get getDescription(): string {
    return this.description;
  }

  deleteField (index): void {
    this.formFields.splice(index, 1);
    this.formChanged$.next();
  }

  getJson() {
    return {
      title: this.getTitle,
      description: this.getDescription,
      fields: this.formFields.map(f => {
        return f.getJson();
      })
    };
  }
}
