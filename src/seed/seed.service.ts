import { Injectable } from '@nestjs/common';
import { BRAND_SEED } from './data/brands.seed';
import { CAR_SEED } from './data/cars.seed';
import { CarsService } from '../cars/cars.service';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly carServise: CarsService,
    private readonly brandService: BrandsService
  ){}
  populateDB(){
    this.carServise.fillCarsWithSeedData(CAR_SEED);
    this.brandService.fillBrandsWithSeedData(BRAND_SEED);
    return 'Seed executed';
  }
}
