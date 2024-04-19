import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import moment from 'moment';

@Injectable()
export class UtilitiesService {
  public static objectId() {
    return new Types.ObjectId();
  }

  public static getDatesBetween(mindate, maxdate) {
    const format = 'YYYY-MM-DD';
    const datesBetween = [];
    let currentDate = moment(mindate);

    while (currentDate.isSameOrBefore(maxdate, 'day')) {
      datesBetween.push(currentDate.format(format));
      currentDate.add(1, 'day');
    }

    return datesBetween;
  }

  public static timestamp() {
    const t = new Date();
    const z = t.getTimezoneOffset() * 60 * 1000;
    let tLocal: any = (t as any) - z;
    tLocal = new Date(tLocal);
    return tLocal.toISOString();
  }

  public static compareDateStrings(dateString1: string, dateString2: string) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    const isSameDate =
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();

    return isSameDate;
  }

  public static isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  public static isBetweenDates(
    date: string,
    dateStart: string,
    dateEnd: string,
  ) {
    const dateTimestamp = new Date(date);
    const startTimestamp = new Date(dateStart);
    const endTimestamp = new Date(dateEnd);
    return dateTimestamp >= startTimestamp && dateTimestamp < endTimestamp;
  }

  public static getDateBeforeAndAfter(dateString) {
    const inputDate = new Date(dateString);
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day

    const dateBefore = new Date(inputDate.getTime() - oneDay)
      .toISOString()
      .slice(0, 10);
    const dateAfter = new Date(inputDate.getTime() + oneDay)
      .toISOString()
      .slice(0, 10);

    return { dateBefore, dateAfter };
  }

  public static getNumDaysBetweenDates(
    startDateString: string,
    endDateString: string,
  ): number {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const numDays =
      Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;
    return numDays;
  }
}
