import { TestBed } from '@angular/core/testing';

import { FileDatabaseService } from './file-database.service';

describe('FileDatabaseService', () => {
  let service: FileDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
