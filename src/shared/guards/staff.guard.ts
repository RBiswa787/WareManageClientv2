import { CanActivateFn } from '@angular/router';
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';


export const staffGuard: CanActivateFn = (route, state) => {
  let payload = inject(ApiService).parseJwt(window.localStorage.getItem("token")!);
  if((payload['role']) == "staff")
  return true;
  else
  return false;
};
