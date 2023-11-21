import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { inventoryManagerGuard } from './inventory-manager.guard';

describe('inventoryManagerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => inventoryManagerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
