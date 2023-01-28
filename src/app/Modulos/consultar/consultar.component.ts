import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Service} from "../../Service/service.component";
import {AlunosModel} from "../../Pagina/interface/alunos";
import {Router} from "@angular/router";
import {StorageService} from "../../Service/storage/storage.service";

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
})

export class ConsultarComponent implements OnInit {
  public alunos: AlunosModel[];
  public loading: boolean = true;


  constructor(
    private armazem: Service,
    private storage : StorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listarAlunos();
  }

  public listarAlunos(): void{
    this.armazem.getAllAlunos().valueChanges().subscribe((res)=>{
      this.loading = false;
      this.alunos = res});

  }

  public editarAluno(aluno:AlunosModel): void {
    this.router.navigate(['Cadastrar']);
    this.storage.setData('aluno',aluno)
  }

  public inserirNotas(aluno: AlunosModel): void{
    this.router.navigate(['Consultar/Inserir']);
    this.storage.setData('aluno',aluno)
  }

  public deletarAluno(aluno: AlunosModel): void {
    this.armazem.deletar(aluno).then();
  }


}
