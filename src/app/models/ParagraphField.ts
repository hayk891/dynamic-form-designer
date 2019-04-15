import { AbstractField } from './AbstractField';

export class ParagraphField extends AbstractField {
    answerPlaceholder: string = 'Long answer text';
    question: string = null;
    answer: string = null;
    longAnswerLength: number = 1024;


    constructor() {
        super('paragraph');
    }

    getJson() {
        return {
            ...super.getJson(),
            answerPlaceholder: this.answerPlaceholder,
            question: this.question,
            answer: this.answer,
            longAnswerLength: this.longAnswerLength
        };
    }
}
