import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormService } from '../services/form.service';
import { FileUploadField } from '../models/FileUploadField';
import { MultipleChoiceField } from '../models/MultipleChoiceField';
import { ShortAnswerField } from '../models/ShortAnswerField';
import { ParagraphField } from '../models/ParagraphField';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-view-mode',
    templateUrl: './view-mode.component.html',
    styleUrls: ['./view-mode.component.scss']
})
export class ViewModeComponent implements OnInit, OnDestroy {

    public viewForm: FormGroup;
    private unsubscribe$ = new ReplaySubject<void>(1);

    constructor(
        public formService: FormService,
        private formBuilder: FormBuilder,
        private router: Router,
        private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.formService.formChanged$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => this.buildForm(this.formService.formFields));
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    private buildForm(fields) {
        const obj = {};
        fields.forEach((field, index) => {
            obj[field.type + '_' + index] = new FormControl('', field.required ? Validators.required : null);
        });
        obj['title'] = new FormControl(this.formService.getTitle, Validators.required);
        obj['description'] = new FormControl(this.formService.getDescription);
        this.viewForm = this.formBuilder.group(obj);
    }

    onSubmit() {
        this.formService.answer = this.viewForm.getRawValue();
        this.router.navigate(['/responses']);
        return;
    }

    onFileChange(event, field: FileUploadField) {
        if (event.target.files && event.target.files[0]) {
            const file: File = event.target.files[0];
            const currentSizeMb = file.size / 1024 / 1024;
            const validSize = this.getFileMaxUploadSize(field);
            if (currentSizeMb > validSize) {
                return alert('File size big than ' + validSize + 'Mb');
            }

            const reader = new FileReader();
            reader.onload = e => {
                field.fileUrl = reader.result;
                field.size = file.size;
            };

            reader.readAsDataURL(file);
        }
    }

    getFileTypes(field: FileUploadField): string {
        const types = [];
        field.rules.type.forEach(obj => {
            if (obj.changed) {
                types.push(obj.name);
            }
        });
        return types.join(', ');
    }

    getFileMaxUploadSize(field: FileUploadField): number {
        let maxSize = null;
        field.rules.maxUploadSize.filter(obj => {
            if (obj.changed) {
                maxSize = obj.value;
            }
        });
        return maxSize;
    }

    changeMultipleChoiceAnswer(field: MultipleChoiceField, i, event) {
        field.options.forEach(obj => obj.checked = false);
        field.options[i].checked = true;
    }

    changeFieldTextAnswer(field: ShortAnswerField | ParagraphField, event) {
        field.answer = event.target.value;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
