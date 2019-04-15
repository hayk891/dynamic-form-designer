import { AbstractField } from './AbstractField';

export class FormLogic {
    private fields: AbstractField[];
    private title: string;
    private description: string;

    constructor() {
        this.fields = [];
    }

    getJson() {
        return {
            fields: this.fields.map(f => {
                return f.getJson();
            })
        };
    }

    addField(field: AbstractField) {
        this.fields.push(field);
    }

    editField(field: AbstractField) {

    }

    getField() {

    }

    deleteField() {

    }
}
