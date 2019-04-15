import { AbstractField } from './AbstractField';

export class FileUploadField extends AbstractField {
    fileUrl?: any = null;
    size?: number = null;
    rules: any = {
        type: [
            {
                name: 'JPG',
                changed: false
            },
            {
                name: 'PNG',
                changed: false
            }
        ],
        maxUploadSize: [
            {
                value: 2,
                changed: true
            },
            {
                value: 5,
                changed: false
            },
            {
                value: 10,
                changed: false
            }]
    };

    constructor() {
        super('fileUpload');
    }

    getJson() {
        return {
            ...super.getJson(),
            fileUrl: this.fileUrl,
            size: this.size,
            rules: this.rules
        };
    }
}
