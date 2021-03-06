import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginModel } from '../models/login.model';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private apikey = "AIzaSyDNauP2DA9dRVbbWwsYsPcTGx4Dh8tyohE";

  userToken: string;
  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
   }

  logout(){
    localStorage.removeItem('expira');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }

  login(usuario: LoginModel){
    const authData ={
      ...usuario,
      returnSecureToken: true
    };
    
    return this.http
        .post(`${this.url}signInWithPassword?key=${this.apikey}`,authData)
        .pipe(
          map((resp)=>{
              this.guardarToken(resp["idToken"]);
              return resp;
          })
        )
  }
  
  //Crear un nuevo usuario
  nuevoUsuario(usuario: LoginModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    }
  
    return this.http  
      .post(`${this.url}signUp?key=${this.apikey}`, authData)
      .pipe(
          map((resp)=>{
            this.guardarToken(resp["idToken"]);
            return resp;
          })
      )
  }

  //Guardar en el local storage
  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem("token",idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getDate().toString());
  }

  //Leer token
  leerToken(){
    if(localStorage.getItem("token")){
      this.userToken = localStorage.getItem("token");
    }else{
      this.userToken = "";
    }
    return this.userToken;
  }

  estaAutenticado(): boolean{
    
    //console.log(`Este es mi token ${this.userToken}` )
    return this.userToken.length > 2;

  //   if(this.userToken.length < 2){
  //     console.log("El token es menor a dos")
  //     return false;
  //   }

  //   const expira = Number(localStorage.getItem('expira'));
  //   const expiraDate = new Date();
  //   expiraDate.setTime(expira);

  //   if(expiraDate > new Date()){
  //     console.log(`Expira date verdadero es mayor a new date() ${expiraDate}`);
  //     return true;
  //   }else{
  //     console.log(`Expira date falso es mayor a new date() ${expiraDate}`);
  //     return false;
  //   }
  //  }

  }
}