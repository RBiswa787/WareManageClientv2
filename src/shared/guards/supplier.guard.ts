import { CanActivateFn } from '@angular/router';
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';


export const supplierGuard: CanActivateFn = () => {
  const payload = inject(ApiService).parseJwt(window.localStorage.getItem("token") || "");
  if((payload['role']) == "supplier")
  return true;
  else
  return false;
};
