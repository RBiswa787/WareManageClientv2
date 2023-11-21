import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { warehouseManagerGuard } from './warehouse-manager.guard';

describe('warehouseManagerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => warehouseManagerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
