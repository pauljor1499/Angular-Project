import { TestBed } from '@angular/core/testing';

import { EmployeeDatabaseService } from './employee-database.service';

describe('ProductDatabaseService', () => {
  let service: EmployeeDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
