export class UserModel{
    id: string;
    nombre: string;
    apellidos:string;
    sexo: boolean;
    direccion:string;
    telefono:string

    constructor(){
        this.sexo = true;
    }
}