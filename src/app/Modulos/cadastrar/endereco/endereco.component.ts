import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WebServiceService} from "../../../Service/api/web-service.service";
import {AlunosModel} from "../../../Pagina/interface/alunos";
import {EnderecoModel} from "../../../Pagina/interface/endereco";
import {Service} from "../../../Service/service.component";
import {InformacoesModel} from "../../../Pagina/interface/informacoes";

@Component({
  selector: 'endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EnderecoComponent implements OnInit {
  @Output() onChangeValues: EventEmitter<EnderecoModel> = new EventEmitter<EnderecoModel>();
  public formGroup: FormGroup;
  public endereco: EnderecoModel;
  public cep: string = '';
  public logradouro: string = '';
  public numero: string = '';
  public cidade: string = '';
  public bairro: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private armazem: Service,
    private web: WebServiceService,
  ) {
    this.formGroup = this.formBuilder.group({
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      cidade: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.maxLength(8)]],
    })
  }

  ngOnInit(): void {
  }

  public publicvalueForm():any{
    const endereco = this.formGroup.value as EnderecoModel;
    endereco.cep = this.formGroup.get('cep')?.value;
    endereco.logradouro = this.formGroup.get('logradouro')?.value;
    endereco.numero = this.formGroup.get('numero')?.value;
    endereco.bairro = this.formGroup.get('bairro')?.value;
    endereco.cidade = this.formGroup.get('cidade')?.value;
    return endereco
  }

  public consultarCEP(){
    this.cep = this.formGroup.get('cep')?.value;
    this.web.buscarCep(this.cep).then((res) =>{
      this.bairro = res.data.bairro;
      this.logradouro = res.data.logradouro;
      this.cidade = res.data.localidade;
    })
  }

  public onChangesFormGroup(): void{
    this.endereco = this.publicvalueForm()
    this.onChangeValues.emit(this.endereco)
  }

}
