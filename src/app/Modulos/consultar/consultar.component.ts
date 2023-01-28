import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Service} from "../../Service/service.component";
import {AlunosModel} from "../../Pagina/interface/alunos";
import {Router} from "@angular/router";
import {StorageService} from "../../Service/storage/storage.service";
import {InformacoesModel} from "../../Pagina/interface/informacoes";
import {EnderecoModel} from "../../Pagina/interface/endereco";

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
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

  public editarAluno(aluno:AlunosModel): void {
    this.router.navigate(['Cadastrar']);
    this.storage.setData('aluno',aluno)
  }

  public inserirNotas(aluno: AlunosModel): void{
    this.router.navigate(['Consultar/Inserir']);
    this.storage.setData('aluno',aluno)
  }

  public deletarAluno(aluno: AlunosModel): void {

    console.log(aluno.id)
    this.armazem.getEndereco(aluno.id).valueChanges().subscribe((res)=>{
      this.endereco = res;
      console.log(res)
      // this.armazem.deleteEndereco(this.endereco[this.i]).then()
    })
    this.armazem.getInformacoes(aluno.id).valueChanges().subscribe((res)=>{
      this.informacoes = res;
      console.log(res)
      // this.armazem.deleteInformacoes(this.informacoes[this.i]).then()
    })


    // this.armazem.deleteAluno(aluno).then();
    // this.armazem.deleteInformacoes(this.informacoes).then();

  }




}
