import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AgendaUsuariosComponent } from './components/agenda-usuarios/agenda-usuarios.component';


const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },    
    { path: 'agenda', component: AgendaComponent },    
    { path: 'agendaUsuarios', component: AgendaUsuariosComponent },    
    { path: '**', pathMatch:'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});