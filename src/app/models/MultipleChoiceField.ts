import { AbstractField } from './AbstractField';

export class MultipleChoiceField extends AbstractField {
    options: any[] = [
        {
            name: 'Option 1',
            checked: false
        }
    ];
    constructor() {
        super('multipleChoice');
    }

    getJson() {
        return {
            ...super.getJson(),
            options: this.options
        };
    }
}
