import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Service} from "../../Service/service.component";
import {AlunosModel} from "../../Pagina/interface/alunos";
import {EnderecoModel} from "../../Pagina/interface/endereco";
import {InformacoesModel} from "../../Pagina/interface/informacoes";

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  public formGroup: FormGroup;
  public loading : boolean = false;
  public cadastro : boolean = false;
  public aluno: AlunosModel;
  public endereco: EnderecoModel;
  public informacao: InformacoesModel;

  constructor(
    private armazem: Service,
    public formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      nome:['',[Validators.required]],
      CPF:['',[Validators.required]],
      nascAluno:['',[Validators.required]],
    })
  }

  ngOnInit(): void {

  }

  public onFormGroup(formOne: InformacoesModel): void{
    this.informacao = formOne;
    this.loading = true;
    this.armazem.createInformacoes(formOne).then(()=>{
      this.loading = false;
      this.formGroup?.reset();
    },error =>{
      this.loading = false;
    })
  }

  public onFormGroups(formTwo: EnderecoModel) {
    this.endereco = formTwo;
    this.loading = true;
    this.armazem.createEndereço(formTwo).then(()=>{
      this.loading = false;
      this.formGroup?.reset();
    },error =>{
      this.loading = false;
    })
  }

  public cadastroAluno(): void {
    this.aluno = this.valueForm();
    this.loading = true;
    this.armazem.createCadastro(this.aluno).then(()=>{
      this.loading = false;
      this.formGroup?.reset();
    },error =>{
      this.loading = false;
    })
  }

  public valueForm(): any{
    const aluno = this.formGroup.value as AlunosModel;
    aluno.CPF = this.formGroup.get('CPF')?.value;
    aluno.nome = this.formGroup.get('nome')?.value;
    aluno.nascAluno = this.formGroup.get('nascAluno')?.value;
    return aluno
  }

  cadastrar() {
    this.loading = true;

  }
}
