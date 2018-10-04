import { TestBed, inject, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { notEqual } from 'assert';
import { first, single } from 'rxjs/operators';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppDataService } from './app-data.service';
import { Country } from '../view-models/country';
import { Countries } from '../helpers/countries-list';
import { fakeBackendProvider } from '../helpers/fake-backend.interceptor';

interface IContext {
  service: AppDataService;
  country: Country;
}

describe('AppDataService', function (this: IContext) {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppDataService, { provide: 'BASE_URL', useValue: 'http://localhost:4200' }, fakeBackendProvider],
      imports: [HttpClientModule]
    });
  });

  beforeEach(inject([AppDataService], (service: AppDataService) => {
    this.service = service;
  }));

  it('should create', () => {
    expect(this.service).toBeTruthy();
  });

  describe('.getCountry', () => {
    beforeAll(() => this.service.getCountry(1).subscribe((c) => this.country = c));
    it('should return a valid Country', () => expect(this.country).toBeTruthy());
    it('should return a right Country', () => expect(this.country.id).toEqual(1));
  });

  describe('.createCountry', () => {
    beforeEach(() => {
      this.country = { id: 0, name: 'United States', epiIndex: 68.04 };
      this.service.createCountry(this.country);
    });
    it('should add a new Country', () => {
      this.service.getCountry(this.country.id).subscribe((c) => {
        return expect(c).toEqual(this.country);
      });
    })
  });
});
