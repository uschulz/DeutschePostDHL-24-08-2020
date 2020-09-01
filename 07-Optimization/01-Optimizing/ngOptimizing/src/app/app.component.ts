import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { ThemeService } from './shared/theme/theme.service';
import { AppInsightsService } from './shared/app-insights/app-insights.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private titleService: Title,
    private ts: ThemeService,
    private insights: AppInsightsService
  ) {
    this.insights.logPageView('EntryPage');
  }

  title: string = environment.title;
  selectedTheme = 'default';

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.ts.getTheme().subscribe((t) => {
      this.selectedTheme = t;
    });
  }

  toggleTheme() {
    this.selectedTheme = this.selectedTheme === 'default' ? 'dark' : 'default';
    console.log(this.selectedTheme);
  }
}
