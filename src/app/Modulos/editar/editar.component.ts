import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlunosModel} from "../../Pagina/interface/alunos";
import {StorageService} from "../../Service/storage/storage.service";
import {Service} from "../../Service/service.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EnderecoModel} from "../../Pagina/interface/endereco";
import {InformacoesModel} from "../../Pagina/interface/informacoes";

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit, OnDestroy {
  public pass: AlunosModel;
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
  public cep: string = '';
  public logradouro: string = '';
  public numero: string = '';
  public cidade: string = '';
  public bairro: string = '';


  constructor(
    public storage: StorageService,
    public armazem: Service,
    public formBuilder: FormBuilder){

  }

  ngOnInit(): void {
    this.pass = this.storage.getData('aluno');
    this.listAluno(this.pass.id);
    this.form();
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

  public cadastroAluno(): void {

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
    this.armazem.getAluno(id).valueChanges().subscribe((res) =>{
      this.aluno = res;
    })
    this.armazem.getInformacoes(id).valueChanges().subscribe((res) =>{
      if(res.length > 0){
        res.forEach(doc =>{
          this.informacao = doc;
        })
      }
    })
    this.armazem.getEndereco(id).valueChanges().subscribe((res) =>{
      if(res.length > 0){
        res.forEach(doc =>{
          this.endereco = doc;
        })
      }
    })
  }

}
