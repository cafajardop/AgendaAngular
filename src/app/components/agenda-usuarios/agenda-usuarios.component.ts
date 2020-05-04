import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/servicios/agenda.service';
import { Users } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agenda-usuarios',
  templateUrl: './agenda-usuarios.component.html',
  styles: [],
})
export class AgendaUsuariosComponent implements OnInit {
  users: any[] = [];
  verSeleccion: string = '';
  id: string = '';

  constructor(private _agendaService: AgendaService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  capturar(verSeleccion: string) {
    this.verSeleccion = verSeleccion;
  }

  cargarUsuarios() {
    this._agendaService
      .consultaUsuaarios()
      .subscribe((user: any) => (this.users = user));
  }

  borrarUsuaruio1(id: string) {
    this.id = id;
    console.log(this.id);
    this._agendaService.borrarUsuario(this.id);
  }

  borrarUsuaruio(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Usted no será capaz de recuperar este archivo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, elimínelo!',
      cancelButtonText: 'No, guárdalo.',
    }).then((result) => {
      if (result.value) {
        this.id = id;
        this._agendaService.borrarUsuario(this.id).subscribe((user: any) => {
          Swal.fire(
            'Borrado!',
            'El usuario ha sido eliminado correctamente',
            'success'
          );
          setTimeout(function(){ location.reload(); }, 2000);
        });
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Su archivo es seguro :)', 'error');
      }
    });
  }
}
