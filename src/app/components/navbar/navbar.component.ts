import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  logger: any;
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.logger = this.auth.estaAutenticado();
    // console.log(`Autenticacion en el navbar ${this.logger}`);
  }

  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
    //this.logger = this.auth.estaAutenticado();
    location.reload();
  }
}
