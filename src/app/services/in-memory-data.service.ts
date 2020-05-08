import { Injectable } from '@angular/core';
import { Employee } from '../models/employee-model';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      {
        id: 1,
        firstname: 'Juan',
        lastname: 'Ramirez',
        email: 'juanRamirez@gmail.com',
        phone: 8093829390,
      },
      {
        id: 2,
        firstname: 'Carlos',
        lastname: 'Rodriguez',
        email: 'CarlitosR@gmail.com',
        phone: 8093459390,
      },
      {
        id: 3,
        firstname: 'Andromeda',
        lastname: 'Santos',
        email: 'AndromedaSantos@gmail.com',
        phone: 8093900390,
        note: 'Soy lo mejor que el planeta tiene.',
      },
    ];

    return { employees };
  }
  genId(employees: Employee[]): number {
    return employees.length > 0
      ? Math.max(...employees.map((employee) => employee.id)) + 1
      : 4;
  }
}
