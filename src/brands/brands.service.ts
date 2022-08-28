import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [];

  create(createBrandDto: CreateBrandDto) {

    const {name} = createBrandDto;

    const brandByName = this.findOneByName(name.toLowerCase());

    if(brandByName) throw new BadRequestException(`Brand name "${name}" already exists`);

    const brand: Brand = {
      id: uuid(),
      name: name.toLowerCase(),
      createdAt: new Date().getTime()
    }

    this.brands.push(brand);

    return this.brands;
  }

  findAll() {
    return this.brands;
  }

  findOneById(id: string) {
    const brand = this.brands.find(item => item.id === id);
    if(!brand) throw new NotFoundException(`Brand with "${id}" not found`);
    return brand;
  }

  findOneByName(name: string){
    const brand = this.brands.find(item => item.name === name);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brand = this.findOneById(id);

    this.brands = this.brands.map(item => {
      if(item.id === id){
        brand.updatedAt = new Date().getTime();
        brand = { ...brand, ...updateBrandDto }
        return brand
      }
      return item;
    });

    return this.brands;
  }

  remove(id: string) {
    this.findOneById(id);
    this.brands = this.brands.filter(item => item.id !== id);
    return this.brands;
  }

  fillBrandsWithSeedData(brands: Brand[]){
    this.brands = brands;
  }
}
