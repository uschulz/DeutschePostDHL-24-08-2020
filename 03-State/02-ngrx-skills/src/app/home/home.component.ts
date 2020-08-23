import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCreditsVisible } from '../store/selectors/app.selectors';
import { ToggleCredits } from '../store/actions/app.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  creditsVisible: Observable<boolean> = this.store.select(getCreditsVisible);

  ngOnInit(): void {}

  toggleCredits(): void {
    this.store.dispatch(new ToggleCredits());
  }
}
