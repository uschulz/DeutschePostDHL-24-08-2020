import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../../store/facades/auth.facade';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private af: AuthFacade) {}

  ngOnInit() {}

  logOut() {
    this.af.logOff();
  }
}
