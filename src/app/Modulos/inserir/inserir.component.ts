import { Component, OnInit } from '@angular/core';
import {Materias} from "../../Pagina/interface/materias";

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html',
  styleUrls: ['./inserir.component.css']
})
export class InserirComponent implements OnInit {
  private alunos: any;


  constructor() { }

  ngOnInit(): void {
  }

  public materia: Array<Materias> = [
    {
      title: "Português"
    },
    {
      title: "Matamática"
    },
    {
      title: "História"
    },
    {
      title: "Geografia"
    },
    {
      title: "Ciências"
    },
    {
      title: "Educação Física"
    },
    {
      title: "Educação Artistíca"
    },
    {
      title: "Inglês"
    }
  ]


}
