import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from 'src/app/services/functions.service';
import { CellarData } from 'src/app/models/CellarData';
import { BarrelData } from 'src/app/models/BarrelData';
import { LevelsData } from 'src/app/models/Data';
import { BarrelInfoModel } from 'src/app/models/BarrelInfoModel';
import { Calculations } from 'src/app/utils/calculations.utils';
import * as Chart from 'chart.js';

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
  private colors = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#E6B3B3',
    '#6680B3',
    '#66991A',
    '#FF99E6',
    '#CCFF1A',
    '#FF1A66',
    '#E6331A',
    '#33FFCC',
    '#66994D',
    '#B366CC',
    '#4D8000',
    '#B33300',
    '#CC80CC',
    '#66664D',
    '#991AFF',
    '#E666FF',
    '#4DB3FF',
    '#1AB399',
    '#E666B3',
    '#33991A',
    '#CC9999',
    '#B3B31A',
    '#00E680',
    '#4D8066',
    '#809980',
    '#E6FF80',
    '#1AFF33',
    '#999933',
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF',
  ];
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
          setTimeout(() => this.initChart(), 1000);
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
      const lastData = barrel.data
        .sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(b.createdAt).getTime();
        })
        .pop();
      barrel.barrelInfo = this.infoData.find((x) => x.barrelCode === barrel.barrelCode);
      if (barrel.barrelInfo) {
        barrel.barrelInfo.barrelVolume = Calculations.getVolume(barrel.barrelInfo);
        barrel.barrelInfo.barrelCurrentVolume = Calculations.getCurrentLevel(barrel.barrelInfo, lastData.wineLevel);
        barrel.barrelInfo.percent = Math.round(
          (barrel.barrelInfo.barrelCurrentVolume / barrel.barrelInfo.barrelVolume) * 100
        );
        barrel.barrelInfo.barrelCurrentTemp = lastData.tempLevel;
      }
    });
  }

  initChart() {
    const datasets = this.barrelData.filter(x => x.data && x.data.length).map((x) => {
      return {
        borderColor: this.getColor(),
        fill: false,
        label: x.barrelInfo?.name || x.barrelCode,
        data: x.data.map((y) => {
          return { y: Calculations.getCurrentLevel(x.barrelInfo, y.wineLevel), x: new Date(y.createdAt) };
        }),
      };
    });

    const canvas = document.getElementById('myChart3') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      labels: [],
      data: { datasets },
      options: {
        title: {
          display: true,
          text: 'Wine level history (liters)',
          fontSize: 16,
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'series',
            },
          ],
        },
      },
    });
  }

  getColor() {
    const color = this.colors.pop();
    return color;
  }
}
