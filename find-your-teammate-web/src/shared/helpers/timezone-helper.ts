import * as moment from 'moment-timezone';

export class TimezoneHelper {
  public static getTimezoneOffset(): number {
    return (new Date()).getTimezoneOffset();
  }

  public static getTimezone(): string {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (ex) {
      return moment.tz.guess();
    }
  }
}
