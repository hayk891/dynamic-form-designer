import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';

@Component({
    selector: 'app-responses',
    templateUrl: './responses.component.html',
    styleUrls: ['./responses.component.scss']
})
export class ResponsesComponent implements OnInit {

    allFormFields = {};
    answer = {};

    constructor(private formService: FormService) {
    }

    ngOnInit() {
        this.answer = this.formService.answer;
        this.allFormFields = this.formService.getJson();
    }
}
