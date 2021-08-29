import { TestBed } from '@angular/core/testing';

import { OrdersArrayService } from './orders-array.service';

describe('OrdersArrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersArrayService = TestBed.get(OrdersArrayService);
    expect(service).toBeTruthy();
  });
});
