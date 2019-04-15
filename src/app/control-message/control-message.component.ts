import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-control-message',
    templateUrl: './control-message.component.html'
})

export class ControlMessagesComponent implements OnChanges {
    @Input() control: FormControl;
    errorMessage = '';

    readonly validationMessages = {
        required: 'Require field'
    };


    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.control.currentValue && changes.control.currentValue != 'undefined') {
            changes.control.currentValue.valueChanges
                .pipe(debounceTime(200))
                .subscribe(val => {
                    this.getError();
                });
        }
    }

    getError() {
        for (const propertyName in this.control.errors) {
          if (this.control.errors.hasOwnProperty(propertyName) && this.control.dirty) {
                this.errorMessage = this.validationMessages[propertyName];
                console.log(propertyName, this.errorMessage);
            }
        }
        return this.errorMessage = null;
    }
}
