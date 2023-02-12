import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Service} from "../../Service/service.component";
import {AlunosModel} from "../../Pagina/interface/alunos";
import {EnderecoModel} from "../../Pagina/interface/endereco";
import {InformacoesModel} from "../../Pagina/interface/informacoes";
import {StorageService} from "../../Service/storage/storage.service";
import {WebServiceService} from "../../Service/api/web-service.service";

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CadastrarComponent implements OnInit {
  public formGroup: FormGroup;
  public loading : boolean = false;
  public cadastro : boolean = false;
  public isChecked: boolean = false;
  public isButton: boolean = true;
  public aluno: AlunosModel;
  public endereco: EnderecoModel;
  public informacao: InformacoesModel;
  public pass: string;
  public cep: string = '';
  public logradouro: string = '';
  public numero: string = '';
  public cidade: string = '';
  public bairro: string = '';


  constructor(
    private armazem: Service,
    public formBuilder: FormBuilder,
    public storage: StorageService,
    private web: WebServiceService,
  ) {
  }

  ngOnInit(): void {
    this.form();
    this.pass = this.storage.getData('aluno');
    console.log(this.pass);

  }

  public form(): void{
    this.formGroup = this.formBuilder.group({
      nome:['',[Validators.required]],
      CPF:['',[Validators.required]],
      nascAluno:['',[Validators.required]],
      nomeResponsavel:['',[Validators.required]],
      telefoneResponsavel:['',[Validators.required]],
      emailResponsavel:['',[Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      cidade: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.maxLength(8)]],
    })
  }

  public consultarCEP(){
    this.cep = this.formGroup.get('cep')?.value;
    this.web.buscarCep(this.cep).then((res) =>{
      this.bairro = res.data.bairro;
      this.logradouro = res.data.logradouro;
      this.cidade = res.data.localidade;
    })
  }

  public cadastroAluno(): any  {
    if(this.pass === undefined){
      this.cadastrar();
      console.log("Nulo")
    } else{
      console.log("Não nulo")
      this.editarAluno(this.aluno.id);
    }
  }

  public valueFormAluno(): any{
    const aluno = this.formGroup.value as AlunosModel;
    aluno.CPF = this.formGroup.get('CPF')?.value;
    aluno.nome = this.formGroup.get('nome')?.value;
    aluno.nascAluno = this.formGroup.get('nascAluno')?.value;
    return aluno;
  }

  public valueFormInformacoes():any{
    const informacoes = this.formGroup.value as InformacoesModel;
    informacoes.nomeResponsavel = this.formGroup.get('nomeResponsavel')?.value;
    informacoes.telefoneResponsavel = this.formGroup.get('telefoneResponsavel')?.value;
    informacoes.emailResponsavel = this.formGroup.get('emailResponsavel')?.value;
    return informacoes
  }

  public valueFormEndereco():any{
    const endereco = this.formGroup.value as EnderecoModel;
    endereco.cep = this.formGroup.get('cep')?.value;
    endereco.logradouro = this.formGroup.get('logradouro')?.value;
    endereco.numero = this.formGroup.get('numero')?.value;
    endereco.bairro = this.formGroup.get('bairro')?.value;
    endereco.cidade = this.formGroup.get('cidade')?.value;
    return endereco;
  }

  public addSegResponsavel(): void{
    this.isChecked = true;
    this.isButton = false;
    this.formGroup.addControl(
      "nomeSegResponsavel",new FormControl('',[Validators.required]),
    )
    this.formGroup.addControl(
      "telefoneSegResponsavel",new FormControl('',[Validators.required]),
    )
    this.formGroup.addControl(
      "emailSegResponsavel", new FormControl('',[Validators.required]),)
  }

  public removeSegResponsavel(): void{
    this.isChecked = false;
    this.isButton = true;
    this.formGroup.removeControl("nomeSegResponsavel");
    this.formGroup.removeControl("telefoneSegResponsavel");
    this.formGroup.removeControl("emailSegResponsavel");
  }


  public cadastrar(): void  {
    this.aluno = this.valueFormAluno();
    console.log(this.aluno)
    this.loading = true;
    this.armazem.createCadastro(this.aluno).then(()=>{
      this.loading = false;
      this.formGroup?.reset();
    },error =>{
      this.loading = false;
    })
    this.informacao.idAluno = this.aluno.id;
    this.armazem.createInformacoes(this.informacao).then(()=>{
      this.loading = false;
      this.formGroup?.reset();
    },error =>{
      this.loading = false;
    })
    this.endereco.idAluno = this.aluno.id;
    this.armazem.createEndereço(this.endereco).then(()=>{
      this.loading = false;
      this.formGroup?.reset();
    },error =>{
      this.loading = false;
    })
  }


  public editarAluno(id: string): void{
    const aluno = this.formGroup.value as AlunosModel;
    aluno.CPF = this.formGroup.get('CPF')?.value;
    aluno.nome = this.formGroup.get('nome')?.value;
    aluno.nascAluno = this.formGroup.get('nascAluno')?.value;
  }



}
