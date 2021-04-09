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
  ngOnInit(): void {}

  submit(event: any) {
    this.router.navigate([event.target.value]);
  }
}
