import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Service} from "../../Service/service.component";
import {InformacaoPessoal} from "../../Pagina/interface/informacao-pessoal";
import {Alunos} from "../../Pagina/interface/aluno";


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  public formGroup: FormGroup | undefined ;
  public loading : boolean = false;
  public informacoes: InformacaoPessoal| undefined;
  public cadastro : boolean = false;


  constructor(
    private armazem: Service,
  ) {

  }

  ngOnInit(): void {
  }

  public onFormGroup(form: Alunos): void{
    console.log(form);
    this.loading = true;
    this.armazem.cadastrar(form).then(()=>{
      this.loading = false;
      this.formGroup?.reset();
    },error =>{
      this.loading = false;
    })
  }


}
