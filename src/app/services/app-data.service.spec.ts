import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { notEqual } from 'assert';
import { first, single } from 'rxjs/operators';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppDataService } from './app-data.service';
import { Country } from '../view-models/country';
import { Countries } from '../helpers/countries-list';
import { fakeBackendProvider } from '../helpers/fake-backend.interceptor';

describe('AppDataService', () => {
  let service: AppDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppDataService, { provide: 'BASE_URL', useValue: 'http://localhost:4200' },fakeBackendProvider],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([AppDataService],(service: AppDataService)=>{
    expect(service).toBeTruthy();
  }));

  it('getCountry should return the right country',inject([AppDataService],(service: AppDataService)=>{
    service.getCountry(1).subscribe((c)=>{
      expect(c).toBeTruthy();
      return expect(c.id).toEqual(1);
    });
  }));
   
  it('createCountry should add a country', inject([AppDataService], (service: AppDataService) => {
    const country: Country = { id:0, name: 'United States', epiIndex: 68.04 };
    service.createCountry(country);
    service.getCountry(country.id).subscribe((c)=>{
      return expect(c).toEqual(country);
    });
  }));
});
