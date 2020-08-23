import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { DemoItem } from '../../../model/demo/DemoItem';

export const execHttpWithCatch = (
  client: HttpClient,
  collection: string
): Observable<DemoItem[]> => {
  return client
    .get<DemoItem[]>(`${environment.apiUrl}${collection}`)
    .pipe(catchError((err) => of([])));
};
