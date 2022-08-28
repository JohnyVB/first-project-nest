import { Car } from "src/cars/interfaces/car.interface";
import { v4 as uuid } from 'uuid';

export const CAR_SEED: Car[] = [
    {
        id: uuid(),
        brand: 'Toyota',
        model: 'Corrolla'
    },
    {
        id: uuid(),
        brand: 'Honda',
        model: 'Civic'
    },
    {
        id: uuid(),
        brand: 'Ford',
        model: 'Mustang'
    },
    {
        id: uuid(),
        brand: 'Ferrari',
        model: 'Enzo'
    },
    {
        id: uuid(),
        brand: 'McLaren',
        model: '570s'
    },
    
];