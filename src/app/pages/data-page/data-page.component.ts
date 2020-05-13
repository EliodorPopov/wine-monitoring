import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from 'src/app/services/functions.service';
import { CellarData } from 'src/app/models/CellarData';
import { BarrelData } from 'src/app/models/BarrelData';
import { LevelsData } from 'src/app/models/Data';
import { BarrelInfoModel } from 'src/app/models/BarrelInfoModel';
import { Calculations } from 'src/app/utils/calculations.utils';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css'],
})
export class DataPageComponent implements OnInit {
  data1: CellarData[];
  infoData: BarrelInfoModel[];
  barrelData = new Array<BarrelData>();
  currentPercent = 0;
  barrelCurrentVolume: number;
  barrelVolume: number;
  constructor(private route: ActivatedRoute, private functionsService: FunctionsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((x) => {
      this.functionsService
        .GetFaqCategories(x.get('code'))
        .toPromise()
        .then((y) => {
          this.data1 = y.list;
          this.infoData = y.info;
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
        bd.data = new Array<LevelsData>();
        this.barrelData.push(bd);
      }
      const temp = new LevelsData();
      temp.wineLevel = d.wineLevel;
      temp.tempLevel = d.tempLevel;
      temp.createdAt = d.createdAt;
      bd.data.push(temp);
    });
    this.barrelData.forEach((barrel) => {
      barrel.barrelInfo = this.infoData.find((x) => x.barrelCode === barrel.barrelCode);
      if (barrel.barrelInfo) {
        barrel.barrelInfo.barrelVolume = Calculations.getVolume(barrel.barrelInfo);
        barrel.barrelInfo.barrelCurrentVolume = Calculations.getCurrentLevel(
          barrel.barrelInfo,
          barrel.data
            .sort((a, b) => {
              return new Date(b.createdAt).getTime() - new Date(b.createdAt).getTime();
            })
            .pop().wineLevel
        );
        barrel.barrelInfo.percent = Math.round(
          (barrel.barrelInfo.barrelCurrentVolume / barrel.barrelInfo.barrelVolume) * 100
        );
      }
    });
    console.log(this.barrelData);
  }
}
