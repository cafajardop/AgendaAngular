import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Users } from 'src/app/models/usuario.model';
import { AgendaService } from 'src/app/servicios/agenda.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  userUpdate: Users = new Users(0, '', '', '', '', '');
  document: string;
  oculto: string = 'oculto';
  @Input() iduser: string;
  @Input() name:string;
  @Input() lastName:string;
  @Input() adress:string;
  @Input() phone:string;
  @Input() idx: number;

  constructor(
    private _agendaService: AgendaService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.document;
  }

  changed(doc: string) {
    this.document = doc;
    console.log(this.document);
  }

  capturaModal() {
    this.userUpdate.Nombres = this.name;
    this.userUpdate.Apellidos = this.lastName;
    this.userUpdate.Direccion = this.adress;
    this.userUpdate.Telefono = this.phone;
  }

  actualizarUsuario() {
    this.userUpdate.NumDocumento = this.iduser;
    this.userUpdate.Nombres = this.userUpdate.Nombres.toUpperCase();
    this.userUpdate.Apellidos = this.userUpdate.Apellidos.toUpperCase();
    this.userUpdate.Direccion = this.userUpdate.Direccion.toUpperCase();
    
    this._agendaService
      .actualizarUsuario(this.userUpdate)
      .subscribe((usr: any) => {
        Swal.fire('Usuario Actualizado Correctamente', usr.ID, 'success');
        setTimeout(function(){ location.reload(); }, 2000);
      });
  }



}
