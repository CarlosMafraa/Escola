import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Service} from "../../Service/service.component";
import {AlunosModel} from "../../Pagina/interface/alunos";
import {EnderecoModel} from "../../Pagina/interface/endereco";
import {InformacoesModel} from "../../Pagina/interface/informacoes";
import {ActivatedRoute} from "@angular/router";

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
    public aRouter: ActivatedRoute,
  ) {
    this.formGroup = this.formBuilder.group({
      nome:['',[Validators.required]],
      CPF:['',[Validators.required]],
      nascAluno:['',[Validators.required]],
    })

  }

  ngOnInit(): void {
  }

  public cadastroAluno(): any  {
  //   if(this.formGroup.invalid){
  //     return;
  //   }
    if(this.aluno === null){
      this.aluno = this.valueForm();
      return this.aluno;
      this.cadastrar();
    }
  //   this.editarAluno(this.id);
  //
  // }
  //
  // public cadastrar(): void{
  //   this.setAluno();
  }

  public valueForm(): any{
    const aluno = this.formGroup.value as AlunosModel;
    aluno.CPF = this.formGroup.get('CPF')?.value;
    aluno.nome = this.formGroup.get('nome')?.value;
    aluno.nascAluno = this.formGroup.get('nascAluno')?.value;
    return aluno
  }

  public onFormGroup(formOne: InformacoesModel): void{
    this.informacao = formOne;
  }

  public onFormGroups(formTwo: EnderecoModel) {
    this.endereco = formTwo;
  }

  public cadastrar(): void  {
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

    // this.armazem.getEditar()

  }

}
