import { TestBed } from '@angular/core/testing';

import { ItemsArrayService } from './items-array.service';

describe('ItemsArrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemsArrayService = TestBed.get(ItemsArrayService);
    expect(service).toBeTruthy();
  });
});
