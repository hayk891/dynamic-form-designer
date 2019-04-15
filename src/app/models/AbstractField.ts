export class AbstractField {
    public type;
    public required: boolean = false;
    public question: string;
    public questionPlaceholder: string = 'Question';

    constructor(type) {
        this.type = type;
    }

    getJson() {
        return {
            type: this.type,
            required: this.required,
            question: this.question,
            questionPlaceholder: this.questionPlaceholder
        };
    }
}
