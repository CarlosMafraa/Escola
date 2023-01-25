import {Component, OnInit} from '@angular/core';
import {Materias, NotasModel} from "../../Pagina/interface/materias";
import {Service} from "../../Service/service.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlunosModel} from "../../Pagina/interface/alunos";
import {StorageService} from "../../Service/storage/storage.service";
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html',
  styleUrls: ['./inserir.component.css']
})
export class InserirComponent implements OnInit {
  public aluno: AlunosModel;
  public notas: NotasModel;
  public nota : NotasModel [];
  public loading : boolean = false;
  public formGroup: FormGroup;

  constructor(
    private armazem: Service,
    private storage : StorageService,
    public formBuilder: FormBuilder,

  ) {
    this.formGroup = this.formBuilder.group({
      nota1:['',[Validators.required,Validators.requiredTrue]],
      nota2:['',[Validators.required, Validators.requiredTrue]],
      nota3:['',[Validators.required,Validators.requiredTrue]],
    })
  }

  ngOnInit(): void {
    this.getAluno();
    this.consultar();
    console.log(this.consultar())
  }

  public getAluno(): any{
    const aluno = this.storage.getData('aluno')
    this.aluno = aluno;
    return aluno
  }

  public publicvalueForm():any{
    const notas = this.formGroup.value as NotasModel;
    notas.nota1 = this.formGroup.get('nota1')?.value;
    notas.nota2 = this.formGroup.get('nota2')?.value;
    notas.nota3 = this.formGroup.get('nota3')?.value;
    return notas
  }

  public inserir(materia: string ): void{
    this.notas = this.publicvalueForm();
    this.notas.materia = materia ;
    this.notas.idAluno = this.aluno.id
    this.loading = true;
    this.armazem.createNota(this.notas).then(()=>{
      this.loading = false;
      // this.formGroup?.reset();
    },error =>{
      this.loading = false;
    })
  }

  public consultar(): void{
    this.armazem.getNota(this.aluno.id).valueChanges().subscribe((res)=>{
      if(res.length > 0 && Array.isArray(res)){
      this.loading = false;
      this.nota = res;}
    });
  }

  public materia: Array<Materias> = [
    {title: "Português"},
    {title: "Matemática"},
    {title: "História"},
    {title: "Geografia"},
    {title: "Ciências"},
    {title: "Educação Física"},
    {title: "Educação Artistíca"},
    {title: "Inglês"}
  ]

}
