import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mask'
})
export class MaskPipe implements PipeTransform {
	transform(value: string, mask: string): string {
		if (!value)
			return '';
		let maskedValue = value.replace(/\D/g, '');
		let pad = mask.replace(/\D/g, '').replace(/9/g, '_');
		let maskContent = maskedValue + pad.substring(0, pad.length - maskedValue.length);

		let valorMaskPos = 0;
		maskedValue = '';
		for (let i = 0; i < mask.length; i++) {
			if (isNaN(parseInt(mask.charAt(i), 10))) {
				maskedValue += mask.charAt(i);
			} else {
				maskedValue += maskContent[valorMaskPos++];
			}
		}

		if (maskedValue.indexOf('_') > -1) {
			maskedValue = maskedValue.substr(0, maskedValue.indexOf('_'));
		}
		return maskedValue;
	}
}
