import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AgendaUsuariosComponent } from './components/agenda-usuarios/agenda-usuarios.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';


const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },    
    { path: 'agenda', component: AgendaComponent,canActivate:[AuthGuard] },    
    { path: 'agendaUsuarios', component: AgendaUsuariosComponent, canActivate:[AuthGuard]},
    { path: 'registro', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', pathMatch:'full', redirectTo: 'registro'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});