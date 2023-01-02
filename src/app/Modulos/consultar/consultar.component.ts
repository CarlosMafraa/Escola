import { Component, OnInit } from '@angular/core';
import {Service} from "../../Service/service.component";
import {AlunosModel} from "../../Pagina/interface/alunos";


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],

})
export class ConsultarComponent implements OnInit {
  public alunos: AlunosModel[] = [];

  constructor(
    private armazem: Service,
  ) { }

  ngOnInit(): void {
    this.listarAlunos();

  }

  public listarAlunos(): void{
    this.armazem.getAllAlunos().get().subscribe((doc)=>{
      this.alunos = [];
      doc.forEach((element: any)=>{
       this.alunos.push({
         id: element.id,
         ...element.data()
        });
      });
    });
  }

  public editarAlunos(alunos: AlunosModel): void{
    this.armazem.adicionar(alunos);
  }

}
