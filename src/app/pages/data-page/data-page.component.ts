import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from 'src/app/services/functions.service';
import { CellarData } from 'src/app/models/CellarData';
import { BarrelData } from 'src/app/models/BarrelData';
import { Data } from 'src/app/models/Data';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css'],
})
export class DataPageComponent implements OnInit {
  data1: CellarData[];
  barrelData = new Array<BarrelData>();

  constructor(private route: ActivatedRoute, private functionsService: FunctionsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((x) => {
      this.functionsService
        .GetFaqCategories(x.get('code'))
        .toPromise()
        .then((y) => {
          this.data1 = y;
          this.processData();
        });
    });
  }

  processData() {
    this.data1.forEach((d) => {
      let bd = this.barrelData.find((x) => x.barrelCode === d.barrelCode);
      if (!bd) {
        bd = new BarrelData();
        bd.barrelCode = d.barrelCode;
        bd.data = new Array<Data>();
        this.barrelData.push(bd);
      }
      const temp = new Data();
      temp.level = d.level;
      temp.createdAt = d.createdAt;
      bd.data.push(temp);
    });
  }
}
