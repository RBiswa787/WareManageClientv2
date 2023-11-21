import { CanActivateFn } from '@angular/router';
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  if(window.localStorage.getItem("token") != "")
  return true;
  else
  return false;
};
