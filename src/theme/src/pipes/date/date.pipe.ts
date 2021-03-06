import { Pipe, PipeTransform } from '@angular/core';
import * as format from 'date-fns/format';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

@Pipe({ name: '_date'} )
export class DatePipe implements PipeTransform {
  transform(
    value: Date | string | number,
    formatString: string = 'YYYY-MM-DD HH:mm'
  ): string {
    if (value) {
      if (formatString === 'fn') {
        return distanceInWordsToNow(value, {
          locale: (window as any).__locale__
        });
      }
      return format(value, formatString);
    } else {
      return '';
    }
  }
}