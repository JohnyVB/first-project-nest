import {  BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // }
    ];

    findAll(){
        return this.cars;
    }

    findById(id: string){
        const car = this.cars.find(item => item.id === id);
        if(!car) throw new NotFoundException(`Car with id '${id}' not found`);
        return car;
    }
    
    create(createCarDto: CreateCarDto){
        const existBrand = this.cars.find(item => item.brand === createCarDto.brand);

        if(existBrand) throw new BadRequestException(`Car with brand: ${createCarDto.brand}, already exists`);

        this.cars.push({
            id: uuid(),
            ...createCarDto
        });
        return this.cars;
    }

    update(id: string, updateCarDto: CreateCarDto){

        let carDB = this.findById(id);
        this.cars = this.cars.map(item => {
            if(item.id === id){
               carDB = {...carDB,...updateCarDto,id} 
               return carDB;
            }
            return item;
        });

        return carDB;
    }

    delete(id: string){
        const car = this.findById(id);
        this.cars = this.cars.filter(item => item.id !== id);

        return this.cars;
    }

    fillCarsWithSeedData(cars: Car[]){
        this.cars = cars;
    }
}
