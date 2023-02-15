import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
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
export class CadastrarComponent implements OnInit , OnDestroy {
  public formGroupAluno: FormGroup;
  public formGroupResponsavel: FormGroup;
  public formGroupEndereco: FormGroup;
  public aluno: AlunosModel;
  public endereco: EnderecoModel;
  public informacao: InformacoesModel;
  public loading : boolean = false;
  public cadastro : boolean = false;
  public isChecked: boolean = false;
  public isButton: boolean = true;
  public pass: AlunosModel;
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
    if(this.pass !== null){
      console.log(this.pass.id)
      this.listAluno(this.pass.id)
    }
  }

  ngOnDestroy(): void {
    this.storage.setData('aluno',null)
  }

  public form(): void{
    this.formGroupAluno = this.formBuilder.group({
      nome:['',[Validators.required]],
      CPF:['',[Validators.required]],
      nascAluno:['',[Validators.required]]});
    this.formGroupResponsavel = this.formBuilder.group({
      nomeResponsavel:['',[Validators.required]],
      telefoneResponsavel:['',[Validators.required]],
      emailResponsavel:['',[Validators.required]]});
    this.formGroupEndereco = this.formBuilder.group({
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      cidade: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.maxLength(8)]],
    })
  }

  public consultarCEP(){
    this.cep = this.formGroupEndereco.get('cep')?.value;
    this.web.buscarCep(this.cep).then((res) =>{
      this.bairro = res.data.bairro;
      this.logradouro = res.data.logradouro;
      this.cidade = res.data.localidade;
    })
  }

  public cadastroAluno(): any  {
    if(this.pass === null ){
      // this.cadastrar();
      console.log("Cadastrar")
    } else{
      console.log("Editar")
      this.editarAluno(this.aluno.id);
    }
  }

  public valueFormAluno(): any{
    const aluno = this.formGroupAluno.value as AlunosModel;
    aluno.CPF = this.formGroupAluno.get('CPF')?.value;
    aluno.nome = this.formGroupAluno.get('nome')?.value;
    aluno.nascAluno = this.formGroupAluno.get('nascAluno')?.value;
    return aluno;
  }

  public valueFormInformacoes():any{
    const informacoes = this.formGroupResponsavel.value as InformacoesModel;
    informacoes.nomeResponsavel = this.formGroupResponsavel.get('nomeResponsavel')?.value;
    informacoes.telefoneResponsavel = this.formGroupResponsavel.get('telefoneResponsavel')?.value;
    informacoes.emailResponsavel = this.formGroupResponsavel.get('emailResponsavel')?.value;
    return informacoes;
  }

  public valueFormEndereco():any{
    const endereco = this.formGroupEndereco.value as EnderecoModel;
    endereco.cep = this.formGroupEndereco.get('cep')?.value;
    endereco.logradouro = this.formGroupEndereco.get('logradouro')?.value;
    endereco.numero = this.formGroupEndereco.get('numero')?.value;
    endereco.bairro = this.formGroupEndereco.get('bairro')?.value;
    endereco.cidade = this.formGroupEndereco.get('cidade')?.value;
    return endereco;
  }

  public addSegResponsavel(): void{
    this.isChecked = true;
    this.isButton = false;
    this.formGroupResponsavel.addControl(
      "nomeSegResponsavel",new FormControl('',[Validators.required]),
    )
    this.formGroupResponsavel.addControl(
      "telefoneSegResponsavel",new FormControl('',[Validators.required]),
    )
    this.formGroupResponsavel.addControl(
      "emailSegResponsavel", new FormControl('',[Validators.required]),)
  }

  public removeSegResponsavel(): void{
    this.isChecked = false;
    this.isButton = true;
    this.formGroupResponsavel.removeControl("nomeSegResponsavel");
    this.formGroupResponsavel.removeControl("telefoneSegResponsavel");
    this.formGroupResponsavel.removeControl("emailSegResponsavel");
  }


  public cadastrar(): void  {
    this.aluno = this.valueFormAluno();
    this.loading = true;
    this.armazem.createCadastro(this.aluno).then(()=>{
      this.loading = false;
      this.formGroupAluno?.reset();
    },error =>{
      this.loading = false;
    })
    this. informacao = this.valueFormInformacoes();
    this.informacao.idAluno = this.aluno.id;
    this.armazem.createInformacoes(this.informacao).then(()=>{
      this.loading = false;
      this.formGroupResponsavel?.reset();
    },error =>{
      this.loading = false;
    })
    this.endereco = this.valueFormEndereco();
    this.endereco.idAluno = this.aluno.id;
    this.armazem.createEndereço(this.endereco).then(()=>{
      this.loading = false;
      this.formGroupEndereco?.reset();
    },error =>{
      this.loading = false;
    })
  }


  public editarAluno(id: string): void{
    //   this.aluno = this.valueFormAluno();
    //   this.loading = true;
    //   this.armazem.createCadastro(this.aluno).then(()=>{
    //     this.loading = false;
    //     this.formGroupAluno?.reset();
    //   },error =>{
    //     this.loading = false;
    //   })
    //   this. informacao = this.valueFormInformacoes();
    //   this.informacao.idAluno = this.aluno.id;
    //   this.armazem.createInformacoes(this.informacao).then(()=>{
    //     this.loading = false;
    //     this.formGroupResponsavel?.reset();
    //   },error =>{
    //     this.loading = false;
    //   })
    //   this.endereco = this.valueFormEndereco();
    //   this.endereco.idAluno = this.aluno.id;
    //   this.armazem.createEndereço(this.endereco).then(()=>{
    //     this.loading = false;
    //     this.formGroupEndereco?.reset();
    //   },error =>{
    //     this.loading = false;
    //   })
  }

  public listAluno(id: string): void{
    this.armazem.getAluno(id).valueChanges().subscribe(res =>{
      this.aluno = res;
    })
  }


}
