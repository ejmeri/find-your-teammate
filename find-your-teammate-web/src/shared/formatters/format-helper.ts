import * as moment from 'moment-timezone';
moment.locale('pt-br');

export class FormatHelper {
	public static applyMask(value: string, mask: string) {
		let maskedValue = value.replace(/\D/g, '');
		const pad = mask.replace(/\D/g, '').replace(/[09]/g, '_');
		const maskContent = maskedValue + pad.substring(0, pad.length - maskedValue.length);

		let valorMaskPos = 0;
		maskedValue = '';
		for (let i = 0; i < mask.length; i++) {
			// tslint:disable-next-line:radix
			if (isNaN(parseInt(mask.charAt(i)))) {
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

	public static formatDocument(rawValue: string): string {
		if (!rawValue) return '';
		if (rawValue.length <= 11)
			return this.formatCpf(rawValue);
		return this.formatCnpj(rawValue);
	}

	public static formatCnpj(rawValue: string): string {
		return FormatHelper.applyMask(rawValue, '99.999.999/9999-99');
	}

	public static formatCpf(rawValue: string): string {
		return FormatHelper.applyMask(rawValue, '999.999.999-99');
	}

	public static formatCep(rawValue: string): string {
		return FormatHelper.applyMask(rawValue, '99999-999');
	}

	public static removeCurrencyMask(maskedValue) {
		if (!maskedValue) return maskedValue;
		return maskedValue.toString().replace(/\./g, '').replace(/,/g, '.');
	}

	public static formatDateWithTimezone(date: any, timezone?: string) {
		if (date) {
			const zone = timezone || moment.tz.guess();
			const Z = date.toString().slice(-1);
			if (Z !== 'Z') date = `${date}Z`;
			return moment(date).tz(zone).format('DD/MM/YYYY LT');
		}
		return '';
	}

	public static formatDate(date: any) {
		if (date) {
			return moment(date).format('DD/MM/YYYY');
		}
		return '';
	}

	public static removeDocumentMask(document: string) {
		if (document) {
			return document = document.replace(/\D+/g, '');
		}
		return '';
	}
}
