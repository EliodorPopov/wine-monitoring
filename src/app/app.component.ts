import { Component, OnInit } from '@angular/core';
import { ApplicationInsights, PageViewPerformance } from '@microsoft/applicationinsights-web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'wine-monitoring';

  ngOnInit() {
    const appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: '696b6441-c6e4-49cb-9c1d-a6894bdf211a',
      },
    });
    appInsights.loadAppInsights();
    appInsights.trackPageView();
  }
}
