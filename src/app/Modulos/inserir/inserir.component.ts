import {Component, OnInit} from '@angular/core';
import {Materias, NotasModel} from "../../Pagina/interface/materias";
import {Service} from "../../Service/service.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlunosModel} from "../../Pagina/interface/alunos";

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html',
  styleUrls: ['./inserir.component.css']
})
export class InserirComponent implements OnInit {
  public aluno: AlunosModel;
  public alunos: AlunosModel[] = [];
  public notas: NotasModel;
  public nota : NotasModel [] = []
  public loading : boolean = false;
  public formGroup: FormGroup;


  constructor(
    private armazem: Service,
    public formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      nota1:['',[Validators.required]],
      nota2:['',[Validators.required]],
      nota3:['',[Validators.required]],
    })

  }

  ngOnInit(): void {

  }


  public materia: Array<Materias> = [
    {
      title: "Português"
    },
    {
      title: "Matamática"
    },
    {
      title: "História"
    },
    {
      title: "Geografia"
    },
    {
      title: "Ciências"
    },
    {
      title: "Educação Física"
    },
    {
      title: "Educação Artistíca"
    },
    {
      title: "Inglês"
    }
  ]


  public cadastrarNota1(): void{
    const notas = this.formGroup.value as NotasModel;
    notas.nota1 = this.formGroup.get('nota1')?.value;
    console.log(notas.nota1)
    console.log(this.aluno.id)
  }
//
  public cadastrarNota2(): void{
    const notas = this.formGroup.value as NotasModel;
    notas.nota2 = this.formGroup.get('nota2')?.value;
    console.log(notas.nota2)
  }
  public cadastrarNota3(): void{
    const notas = this.formGroup.value as NotasModel;
    notas.nota3 = this.formGroup.get('nota3')?.value;
    this.loading = true;
    this.armazem.createNota(this.notas).then(()=>{
      this.loading = false;
      this.formGroup?.reset();
    },error =>{
      this.loading = false;
    })
  }

}
