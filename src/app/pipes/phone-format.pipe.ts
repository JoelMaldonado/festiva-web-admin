import { Pipe, PipeTransform } from '@angular/core';
import parsePhoneNumberFromString from 'libphonenumber-js';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (phoneNumber) {
      const formatted = phoneNumber.formatInternational();
      return formatted;
    } else {
      return value;
    }
  }
}
