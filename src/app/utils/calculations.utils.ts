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
    let currentLevel = 0;
    if (barrelData.shape === 'cylinder') {
      const radius = barrelData.radius;
      const length = barrelData.heightCylinder;
      if (barrelData.position === 'vertical') {
        currentLevel = (Math.PI * Math.pow(radius, 2) * (length - lastLevel)) / 1000;
      }
      if (barrelData.position === 'horizontal') {
        const depth = radius * 2 - lastLevel;
        currentLevel =
          length *
          (Math.pow(radius, 2) * Math.acos(1 - depth / radius) -
            (radius - depth) * Math.sqrt(2 * radius * depth - Math.pow(depth, 2)));
        currentLevel = currentLevel / 1000;
      }
    }
    if (barrelData.shape === 'cuboid') {
      currentLevel = barrelData.length * barrelData.width * (barrelData.heightCuboid - lastLevel);
      currentLevel = currentLevel / 1000;
    }
    return Math.round(currentLevel * 100) / 100;
  }
}
