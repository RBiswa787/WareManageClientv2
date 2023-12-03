import { CanActivateFn } from '@angular/router';
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';

export const inventoryManagerGuard: CanActivateFn = () => {
  const payload = inject(ApiService).parseJwt(window.localStorage.getItem("token") || "");
  if((payload['role']) == "inventory-manager")
  return true;
  else
  return false;
};
