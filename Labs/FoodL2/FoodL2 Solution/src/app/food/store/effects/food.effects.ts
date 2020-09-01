import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as foodActions from '../actions/food.actions';
import { FoodItem } from '../../food.model';
import { FoodService } from '../../food.service';

@Injectable()
export class FoodEffects {
  constructor(private actions$: Actions, private fs: FoodService) {}

  @Effect()
  loadFood$: Observable<Action> = this.actions$.pipe(
    ofType(foodActions.FoodActionTypes.LoadFoods),
    mergeMap((action) =>
      this.fs.getFood().pipe(
        map((food: FoodItem[]) => new foodActions.LoadFoodSuccess(food)),
        catchError((err) => of(new foodActions.LoadFoodError(err)))
      )
    )
  );
}
