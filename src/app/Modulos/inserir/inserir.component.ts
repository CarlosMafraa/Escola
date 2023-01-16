import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Materias, NotasModel} from "../../Pagina/interface/materias";
import {Service} from "../../Service/service.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlunosModel} from "../../Pagina/interface/alunos";
import {ConsultarComponent} from "../consultar/consultar.component";
import * as url from "url";
import {elementAt} from "rxjs";

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html',
  styleUrls: ['./inserir.component.css']
})
export class InserirComponent implements OnInit {
  public alunos: AlunosModel[] = [];
  public notas: NotasModel;
  public nota : NotasModel [] = []
  public loading : boolean = false;
  public formGroup: FormGroup;
  public id: string;
  public idAluno: string;


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
    ConsultarComponent.idAluno.subscribe((id: string) =>{
      this.id = id;
      });
   // this.armazem.EmmitIdAluno.subscribe()
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

  // public getNotas(): void{
  //   this.armazem.getAllNotas().get().subscribe((doc)=>{
  //     this.nota = [];
  //     doc.forEach((element: any)=>{
  //       this.nota.push({
  //         id: element.id,
  //         ...element.data()
  //       });
  //     });
  //   })
  // }





  public cadastrarNota1(): void{
    const notas = this.formGroup.value as NotasModel;
    notas.nota1 = this.formGroup.get('nota1')?.value;
    console.log(notas.nota1)
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
