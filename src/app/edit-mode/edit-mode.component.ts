import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';

import { FormService } from '../services/form.service';
import { MultipleChoiceField } from '../models/MultipleChoiceField';
import { FieldType } from '../models/enums/FieldTypeEnum';
import { AbstractField } from '../models/AbstractField';
import { FileUploadField } from '../models/FileUploadField';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
    selector: 'app-edit-mode',
    templateUrl: './edit-mode.component.html',
    styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent implements OnInit, OnDestroy {

    private unsubscribe$ = new ReplaySubject<void>(1);
    public questionKeyUp$ = new Subject<AbstractField>();

    constructor(public formService: FormService) {
    }

    get FieldTypes() {
        return FieldType;
    }

    ngOnInit() {
        this.questionKeyUp$
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntil(this.unsubscribe$)
            )
            .subscribe((obj: any) => {
                obj.field.question = obj.event.target.value;
            });
    }

    changeFieldRequired($event, field: AbstractField) {
        field.required = $event.target.checked;
    }

    addMultipleChoiceOption(field: MultipleChoiceField){
        const optLength = field.options.length + 1;
        field.options.push({
            name: 'Option ' + optLength
        });
    }

    editMultipleChoiceOption(field: MultipleChoiceField, i, event){
        field.options[i].name = event.target.value;
    }

    deleteMultipleChoiceOption(field: MultipleChoiceField, i){
        field.options.splice(i, 1);
    }

    changeFileFieldType($event, field: FileUploadField, type_index) {
        field.rules.type[type_index].changed = $event.target.checked
    }

    changeFileFieldMaxSize($event, field: FileUploadField, sizeObj_index) {
        field.rules.maxUploadSize.forEach(obj => obj.changed = false);
        field.rules.maxUploadSize[sizeObj_index].changed = true;
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.formService.formFields, event.previousIndex, event.currentIndex);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
