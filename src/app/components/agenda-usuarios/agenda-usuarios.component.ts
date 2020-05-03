import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/servicios/agenda.service';
import { Users } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-agenda-usuarios',
  templateUrl: './agenda-usuarios.component.html',
  styles: [
  ]
})
export class AgendaUsuariosComponent implements OnInit {
  users: any[]=[];

  constructor(private _agendaService: AgendaService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this._agendaService
    .consultaUsuaarios()
    .subscribe((user:any) => (this.users = user));
  }

}
