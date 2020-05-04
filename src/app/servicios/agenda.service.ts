import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import {Observable} from 'rxjs/internal/Observable';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  [x: string]: any;
  // private typeDocument: [] = service.

  constructor(public http: HttpClient) {}

  cargarTypeDocument() {
    let url = URL_SERVICIOS + '/TipoDocumento/GetType';
    //return this.http.get(url).pipe(map((resp: any) => resp));
    return this.http.get(url);
  }

  insertarUsuario(user:Users){
    let url = URL_SERVICIOS + '/Users/InsUsers';

    return this.http.post(url,user);
  }

  consultaUsuaarios(){
    let url = URL_SERVICIOS + '/Users/GetUsers';

    return this.http.get(url);
  }

  actualizarUsuario(user: Users){
    let url = URL_SERVICIOS + '/Users/UpdUsers';
    console.log(user);
    return this.http.put(url,user);
  }

  borrarUsuario(id:string){
    let url = URL_SERVICIOS + '/Users/DelUsers?id=' + id;
    console.log(url);
    return this.http.delete(url);
  }

}
