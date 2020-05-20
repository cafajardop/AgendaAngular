import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { UserModel } from '../models/userFirebase.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = 'https://crud-usuarios-fe4a1.firebaseio.com';

  constructor(private http: HttpClient) { }

  //Crear usuario
  crearUsuario(user: UserModel){
    return this.http.post(`${this.url}/usuarios.json`,user)
    .pipe(
        map((resp:any)=>{
            user.id = resp.name;
            return user;
        })

    )
  }
  
  //Actualizar Usuario
  actualizarUsuario (user: UserModel){
    const userTemp = {
      ...user
    }
    
    delete userTemp.id;

    return this.http.put(`${this.url}/usuarios/${user.id}.json`, userTemp)
  }

  borrarUsuario(id: string){
    return this.http.delete(`${this.url}/usuarios/${id}.json`)
  }

  getUsuario(id: string){
    return this.http.get(`${this.url}/usuarios/${id}.json`)
  }

  getUsuarios(){
    return this.http.get(`${this.url}/usuarios.json`)
    .pipe(
      map(this.crearArreglo),
      delay(1500)
    )
  }

  private crearArreglo(usersObj:object){
      
    const users: UserModel[] = [];

    console.log(`${usersObj} + este es el arreglo` );

    if (usersObj === null){return[];}

    Object.keys (usersObj).forEach(key =>{
      console.log(`${key} + este es el key` );
      const user: UserModel = usersObj[key];
      user.id = key;
      users.push(user);
    })
    
    return users;
  }
}