import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Service} from "../../Service/service.component";
import {AlunosModel} from "../../Pagina/interface/alunos";
import {Router} from "@angular/router";
import {StorageService} from "../../Service/storage/storage.service";
import {InformacoesModel} from "../../Pagina/interface/informacoes";
import {EnderecoModel} from "../../Pagina/interface/endereco";
import {_DisposeViewRepeaterStrategy, _VIEW_REPEATER_STRATEGY} from "@angular/cdk/collections";
import {_COALESCED_STYLE_SCHEDULER, _CoalescedStyleScheduler} from "@angular/cdk/table";

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  providers: [
    {provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy},
    {provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler}
  ]
})

export class ConsultarComponent implements OnInit {
  public alunos: AlunosModel[];
  public informacoes: InformacoesModel[];
  public endereco: EnderecoModel[];
  public loading: boolean = true;
  public i : number;
  public dataSource: any;
  public displayedColumns: Array<string>= ['index','CPF','nome','nascAluno','acoes'];

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

  public editarAluno(id: string): void {
    this.router.navigate(['Cadastrar']);
    this.storage.setData('aluno',id)
  }

  public inserirNotas(id: string): void{
    this.router.navigate(['Consultar/Inserir']);
    this.storage.setData('aluno',id)
  }

  public deletarAluno(aluno: AlunosModel): void {
    this.armazem.deleteAluno(aluno).then()
    console.log("Acho que foi!")
// this.armazem.deleteEndereço(aluno)
  }




}
