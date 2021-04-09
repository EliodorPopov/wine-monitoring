import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor(private router: Router) {}
  navigator = navigator;
  ngOnInit(): void {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = /(android)/i.test(ua);
    const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    const isMac = ua.indexOf('mac') > -1 && navigator.maxTouchPoints === 0;
    const isIpad = ua.indexOf('mac') > -1 && navigator.maxTouchPoints > 0;

    let link = 'ms-windows-store://review/?ProductId=9ngb20m8vmq1';
    let storeLink = 'https://www.microsoft.com/en-us/p/nkoda/9ngb20m8vmq1?d=9wzdncrdfwbt';
    if (isAndroid) {
      link = 'market://details?id=com.nkoda.app';
      storeLink = 'https://play.google.com/store/apps/details?id=com.nkoda.app&hl=en&gl=US';
    } else if (iOS || isIpad) {
      link = 'itms-apps://itunes.apple.com/gb/app/id1327811418?action=write-review';
      storeLink = 'https://apps.apple.com/us/app/nkoda-the-sheet-music-library/id1327811418?action=write-review';
    } else if (isMac) {
      link = 'itms-apps://itunes.apple.com/gb/app/id1386771502?action=write-review';
      storeLink = 'https://apps.apple.com/ru/app/nkoda-the-sheet-music-library/id1386771502?l=en&mt=12';
    }

    document.location.href = storeLink;
  }

  submit(event: any) {
    this.router.navigate([event.target.value]);
  }
}
