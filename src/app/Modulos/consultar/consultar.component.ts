import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Service} from "../../Service/service.component";
import {AlunosModel} from "../../Pagina/interface/alunos";
import {Router} from "@angular/router";


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],

})
export class ConsultarComponent implements OnInit {
  public alunos: AlunosModel[] = [];

  constructor(
    private armazem: Service,
    private router: Router,
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

  public navigateTo(url:string): void {
    this.router.navigate([url]);
  }


}
