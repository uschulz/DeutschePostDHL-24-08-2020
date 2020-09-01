import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, flatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MenuService } from 'src/app/shared/menu/menu.service';
import { DemoItem } from '../demo-item';
import { DemoService } from '../demo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-demo-container',
  templateUrl: './demo-container.component.html',
  styleUrls: ['./demo-container.component.scss'],
})
export class DemoContainerComponent implements OnInit {
  title: string = environment.title;
  header = 'Please select a demo';

  demos$: Observable<DemoItem[]> = null;
  current: DemoItem = this.demos$ != null ? this.demos$[0] : null;
  workbench: any;

  constructor(
    private router: Router,
    private demoService: DemoService,
    public ms: MenuService
  ) {}

  ngOnInit() {
    this.setMenu();
    this.setMetadata();
    this.getWorbenchStyle();
  }

  private setMenu() {
    this.demos$ = this.demoService.getItems();
  }

  getWorbenchStyle() {
    let result = {};
    this.ms.visible$.subscribe((visible) => {
      result = visible
        ? {
            'margin-left': '10px',
          }
        : {};
    });
    return result;
  }

  private setMetadata() {
    this.router.events
      .pipe(
        filter((evt: Event) => evt instanceof NavigationEnd),
        flatMap((evt: NavigationEnd) => {
          const childroute = evt.url.substr(evt.url.lastIndexOf('/') + 1);
          return this.demos$.pipe(
            map((items) => items.find((i) => i.url.includes(childroute)))
          );
        })
      )
      .subscribe((demo) => {
        this.header =
          demo != null
            ? `Demo: ${demo.title} - Component: ${demo.component}`
            : 'Please select a demo';
      });
  }
}
