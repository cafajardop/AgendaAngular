import { Injectable } from '@angular/core';
import { CanActivate, Router,} from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService, 
              private router: Router) {}

  canActivate(): boolean {
   
    if (this.auth.estaAutenticado()) {
      console.log(this.auth.estaAutenticado());
      
      return true;
    } else {
      console.log('No esta atuenticado GUARD');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
