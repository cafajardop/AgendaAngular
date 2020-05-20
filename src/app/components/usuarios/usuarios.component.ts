import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/userFirebase.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: UserModel[] =[];
  cargando = false;

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit() {

    this.cargando = true;
    this.usuarioService.getUsuarios()
    .subscribe(resp =>{
        this.usuarios = resp;
        this.cargando = false;
    })
  }

  borrarUsuario(user: UserModel,i:number){
    Swal.fire({
      title:'Está seguro?',
      text:`Está seguro que desea borrar a ${user.nombre} ${user.apellidos}`,
      icon: 'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then( resp =>{
        if(resp.value){
          this.usuarios.splice(i,1);
          this.usuarioService.borrarUsuario(user.id).subscribe();
          
          Swal.fire({
            title:'Usuario Borrado Correctamente!!!',
            icon:'success'
          })
        }
    })
  }
}
