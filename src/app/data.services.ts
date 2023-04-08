import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { Persona } from './persona.model';

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient,
              private loginService: LoginService) {}


    //Cargar personas base de datos
  cargarPersonas() {
    const token = this.loginService.getIdToken();
    return this.httpClient.get(
      
      'https://listado-personas-22662-default-rtdb.firebaseio.com/datos.json?auth=' + token
    );
  }

  //Guardar personas base de datos

  guardarPersonas(personas: Persona[]) {
    const token = this.loginService.getIdToken();
    this.httpClient
      .put(
        'https://listado-personas-22662-default-rtdb.firebaseio.com/datos.json?auth=' + token,
        personas
      )
      .subscribe(
        (response) => {
          console.log('resultado guardar Personas: ' + response);
        },
        (error) => console.log('Error al guardar Personas:' + error)
      );
  }
    //Modificar Persona Base de datos
  modificarPersona(index: number, persona: Persona) {
    const token = this.loginService.getIdToken();
    let url: string;
    url =
      'https://listado-personas-22662-default-rtdb.firebaseio.com/datos/' +
      index +
      '.json?auth=' + token;
    this.httpClient.put(url, persona).subscribe(
      (response) => console.log('Resultado modificar Persona:' + response),
      (error) => console.log('Error en modificar Persona: ' + error)
    );
  }
    //eliminar personas base de datos
  eliminarPersona(index: number){
    const token = this.loginService.getIdToken();
    let url: string;
    url =
      'https://listado-personas-22662-default-rtdb.firebaseio.com/datos/' +
      index +
      '.json?auuth=' + token;
    this.httpClient.delete(url).subscribe(
      (response) => console.log('Resultado eliminar Persona:' + response),
      (error) => console.log('Error en eliminar Persona: ' + error)
    );
  }
}
