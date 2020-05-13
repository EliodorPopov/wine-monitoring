import { BarrelInfoModel } from '../models/BarrelInfoModel';

export class Calculations {
  static getVolume(barrelData: BarrelInfoModel) {
    if (barrelData.shape === 'cylinder') {
      let volume = (Math.PI * Math.pow(barrelData.radius, 2) * barrelData.heightCylinder) / 1000;
      volume = Math.round(volume * 100) / 100;
      return volume;
    }

    if (barrelData.shape === 'cuboid') {
      return Math.round((barrelData.heightCuboid * barrelData.length * barrelData.width) / 10) / 100;
    }
  }
  static getCurrentLevel(barrelData: BarrelInfoModel, lastLevel: number) {
    console.log(lastLevel);
    console.log(barrelData);
    if (barrelData.shape === 'cylinder') {
      if (barrelData.position === 'vertical') {
        const currentLevel =
          (Math.PI * Math.pow(barrelData.radius, 2) * (barrelData.heightCylinder - lastLevel)) / 1000;
        return Math.round(currentLevel * 100) / 100;
      }
    }
  }
}
