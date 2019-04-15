import { AbstractField } from './AbstractField';

export class InputField extends AbstractField {

    constructor() {
        super('input');
    }

    getJson() {
        return {
            ...super.getJson(),
        };
    }
}
