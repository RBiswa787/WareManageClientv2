import { CanActivateFn } from '@angular/router';
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';

export const vendorGuard: CanActivateFn = (route, state) => {
  let payload = inject(ApiService).parseJwt(window.localStorage.getItem("token")!);
  if((payload['role']) == "vendor")
  return true;
  else
  return false;
};
