import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../persona.model';
import { Personasservice } from '../personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent {
  personas: Persona[] = [];

  constructor(
    private personasService: Personasservice,
    private router: Router
  ) {
    this.personasService.saludar.subscribe((indice: number) =>
      alert('El indice es: ' + indice)
    );
  }

  ngOnInit(): void {
 
    this.personasService.obtenerPersonas()
    .subscribe(
      res => {
        console.log("Respuesta DB: "+res)
        this.personas = <Persona[]>res;
        this.personasService.setPersonas(<Persona[]>res);
      },
      error => console.error(error)
      
    );
 
  }

  agregar() {
    this.router.navigate(['personas/agregar']);
  }
}
