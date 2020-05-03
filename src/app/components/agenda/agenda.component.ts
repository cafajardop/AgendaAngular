import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/servicios/agenda.service';
import { Users } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styles: [],
})
export class AgendaComponent implements OnInit {
  types: any = [];
  user: Users = new Users(0, '', '', '', '', '');

  constructor(private _agendaService: AgendaService) {}
  //constructor() {}

  ngOnInit() {
    this.cargarTypesDocument();
  }

  cargarTypesDocument() {
    this._agendaService
      .cargarTypeDocument()
      .subscribe((document) => (this.types = document));
  }

  insertaUsuario(f: NgForm) {
    this._agendaService.insertarUsuario(this.user)
    .subscribe((usr:any) => {
      Swal.fire('Usuario Creado Correctamente', usr.ID, 'success');
      f.resetForm();
    });
  }
}
