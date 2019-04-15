import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShortAnswerField } from '../models/ShortAnswerField';
import { FieldType } from '../models/enums/FieldTypeEnum';
import { ParagraphField } from '../models/ParagraphField';
import { FormService } from '../services/form.service';
import { MultipleChoiceField } from '../models/MultipleChoiceField';
import { FileUploadField } from '../models/FileUploadField';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {

    public showMenu = false;
    showViewMode = false;

    constructor(private formService: FormService) {
    }

    get FieldTypes() {
        return FieldType;
    }

    ngOnInit() {

    }

    setFormTitle(event) {
        this.formService.setTitle = event.target.value;
    }

    setFormDesc(event) {
        this.formService.setDescription = event.target.value;
    }

    addField(type) {
        const generatorFun = this.getFieldGenrator(type);
        const field = generatorFun();
        this.formService.addField(field);
    }

    getFieldGenrator(type) {
        return {
            'shortAnswer': (options) => new ShortAnswerField(),
            'paragraph': (options) => new ParagraphField(),
            'multipleChoice': (options) => new MultipleChoiceField(),
            'fileUpload': (options) => new FileUploadField()
        }[type];
    }

    refrashFormView() {
        this.showViewMode = false;
        this.showViewMode = true;
    }

    ngOnDestroy(): void {
    }
}
