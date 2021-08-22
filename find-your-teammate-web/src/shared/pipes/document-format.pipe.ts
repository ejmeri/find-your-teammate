import { FormatHelper } from '../formatters/format-helper';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'document'
})
export class DocumentFormatPipe implements PipeTransform {
	transform(value: string, mask: string): string {
		if (!value)
			return '';
		const maskedValue = value.replace(/\D/g, '');
		return FormatHelper.formatDocument(maskedValue);
	}
}
