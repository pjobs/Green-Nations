import { Injectable, OnInit, Inject } from '@angular/core';

import { UserService } from './user.service';
import { Country } from '../view-models/country';
import { Observable } from 'rxjs/Observable';
import { pipe } from '@angular/core/src/render3/pipe';
import { of } from 'rxjs'
import { delay, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppDataService implements OnInit {
  private countries: Country[] = [];
  ngOnInit(): void {
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<Country[]>(this.baseUrl + '/countries').subscribe((data)=> { this.countries = data;}); //.pipe(filter((c)=> c instanceof Country))
  }

  createCountry(vm: Country): Observable<Country> {
    let id = 0;
    this.countries.forEach((c) => {
        if (c.id >= id) {
          id = c.id + 1;
        }
    });
    vm.id = id;
    this.countries.push(vm);
    return of(vm);
  }

  deleteCountry(id: number): Observable<any> {
    return of({}).pipe(delay(1000))
     .do(e => this.countries.splice(this.countries.findIndex(c => c.id === id), 1));
  }

  getCountries(): Observable<any> {
    return of(this.countries);
  }

  getCountry(id: number): Observable<Country> {
    let index = this.countries.findIndex(c => c.id == id);
    return of(this.countries[index]);
  }

  updateCountry(updatedCountry: Country): Observable<Country> {
    let country = this.countries.find(c => c.id === updatedCountry.id);
    Object.assign(country, updatedCountry);
    return of(country).pipe(delay(1000));

  }

}
