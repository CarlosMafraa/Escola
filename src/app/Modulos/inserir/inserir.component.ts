import {Component, OnInit} from '@angular/core';
import {NotasModel} from "../../Pagina/interface/materias";
import {Service} from "../../Service/service.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlunosModel} from "../../Pagina/interface/alunos";
import {StorageService} from "../../Service/storage/storage.service";
import {materia} from "../../Pagina/interface/materias";

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html',
  styleUrls: ['./inserir.component.css']
})
export class InserirComponent implements OnInit {
  public aluno: AlunosModel;
  public notas: NotasModel;
  public materia = materia;
  public nota : NotasModel [];
  public loading : boolean = false;
  public formGroup: FormGroup;

  constructor(
    private armazem: Service,
    private storage : StorageService,
    public formBuilder: FormBuilder,

  ) {
    this.formGroup = this.formBuilder.group({
      nota1:['',[Validators.required]],
      nota2:['',[Validators.required]],
      nota3:['',[Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getAluno();
    this.consultar();

  }

  public decidir(materia: string,index: number): void{
    if(this.nota === null){
      console.log(this.nota)
      this.inserir(materia,index)
    } else {
      this.editar(materia,index)
    }
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

  public inserir(materia: string,index: number): void{
    this.notas = this.publicvalueForm();
    this.notas.num_materia = index;
    this.notas.materia = materia ;
    this.notas.idAluno = this.aluno.id;
    this.loading = true;
    console.log(this.notas)
    this.armazem.createNota(this.notas).then(()=>{
      this.loading = false;
      // this.formGroup?.reset();
    },error =>{
      this.loading = false;
    })
    console.log(this.notas)
  }

  public consultar(): void{
    this.armazem.getNota(this.aluno.id).valueChanges().subscribe((res)=>{
      if(Array.isArray(res) && res.length > 0){
        this.loading = false;
        this.nota = res
      }
    });
  }

  public editar(materia: string,index: number): void{
    this.notas = this.publicvalueForm();
    this.notas.num_materia = index;
    this.notas.materia = materia ;
    this.notas.idAluno = this.aluno.id;
    this.loading = true;
    this.armazem.getEditarNota(this.notas).then(()=>{
      this.loading = false;
    })
  }


}
