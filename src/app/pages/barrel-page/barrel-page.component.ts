import { Component, OnInit } from '@angular/core';
import { CellarData } from 'src/app/models/CellarData';
import { BarrelData } from 'src/app/models/BarrelData';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from 'src/app/services/functions.service';
import { LevelsData } from 'src/app/models/Data';
import { FormControl } from '@angular/forms';
import { BarrelInfoModel } from 'src/app/models/BarrelInfoModel';

@Component({
  selector: 'app-barrel-page',
  templateUrl: './barrel-page.component.html',
  styleUrls: ['./barrel-page.component.css'],
})
export class BarrelPageComponent implements OnInit {
  data1: CellarData[];
  infoData: BarrelInfoModel[];
  barrelData = new Array<BarrelData>();
  barrelCode: string;
  currentBarrel: BarrelData;
  name = new FormControl();
  shape = new FormControl();
  radius = new FormControl();
  heightCylinder = new FormControl();
  position = new FormControl();
  length = new FormControl();
  width = new FormControl();
  heightCuboid = new FormControl();
  otherData = new FormControl();

  editState = false;
  constructor(private route: ActivatedRoute, private functionsService: FunctionsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((x) => {
      this.barrelCode = x.get('barrel');
      this.functionsService
        .GetFaqCategories(x.get('code'))
        .toPromise()
        .then((y) => {
          this.data1 = y.list;
          this.infoData = y.info;
          this.processData();
        });
    });
    this.shape.setValue('cylinder');
    this.shape.valueChanges.subscribe((x) => {
      console.log(x);
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
    });
    this.currentBarrel = this.barrelData.find((x) => x.barrelCode === this.barrelCode);
    if (!this.currentBarrel.barrelInfo) {
      this.currentBarrel.barrelInfo = {} as BarrelInfoModel;
    }
    this.fillForm();
    console.log(this.currentBarrel);
  }

  update() {
    const updateModel = {
      name: this.name.value,
      shape: this.shape.value,
      radius: this.radius.value,
      heightCylinder: this.heightCylinder.value,
      position: this.position.value,
      length: this.length.value,
      width: this.width.value,
      heightCuboid: this.heightCuboid.value,
      otherData: this.otherData.value,
    } as BarrelInfoModel;
    console.log(updateModel);
    this.functionsService
      .UpdateBarrelInfo(this.data1[0].cellarCode, this.currentBarrel.barrelCode, updateModel)
      .toPromise()
      .catch(() => {});
  }

  fillForm() {
    if (this.currentBarrel.barrelInfo.name) {
      this.name.setValue(this.currentBarrel.barrelInfo.name);
    }
    if (this.currentBarrel.barrelInfo.heightCuboid) {
      this.heightCuboid.setValue(this.currentBarrel.barrelInfo.heightCuboid);
    }
    if (this.currentBarrel.barrelInfo.heightCylinder) {
      this.heightCylinder.setValue(this.currentBarrel.barrelInfo.heightCylinder);
    }
    if (this.currentBarrel.barrelInfo.length) {
      this.length.setValue(this.currentBarrel.barrelInfo.length);
    }
    if (this.currentBarrel.barrelInfo.otherData) {
      this.otherData.setValue(this.currentBarrel.barrelInfo.otherData);
    }
    if (this.currentBarrel.barrelInfo.position) {
      this.position.setValue(this.currentBarrel.barrelInfo.position);
    }
    if (this.currentBarrel.barrelInfo.radius) {
      this.radius.setValue(this.currentBarrel.barrelInfo.radius);
    }
    if (this.currentBarrel.barrelInfo.shape) {
      this.shape.setValue(this.currentBarrel.barrelInfo.shape);
    }
    if (this.currentBarrel.barrelInfo.width) {
      this.width.setValue(this.currentBarrel.barrelInfo.width);
    }
  }
}
