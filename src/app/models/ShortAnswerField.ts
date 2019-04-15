import { AbstractField } from './AbstractField';

export class ShortAnswerField extends AbstractField {
    answerPlaceholder: string = 'Short answer text';
    question: string = null;
    answer: string = null;
    shortAnswerLength: number = 128;

    constructor() {
        super('shortAnswer');
    }

    getJson() {
        return {
            ...super.getJson(),
            answerPlaceholder: this.answerPlaceholder,
            question: this.question,
            answer: this.answer,
            shortAnswerLength: this.shortAnswerLength
        };
    }
}
