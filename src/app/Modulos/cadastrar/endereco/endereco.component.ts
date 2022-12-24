import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WebServiceService} from "../../../Service/api/web-service.service";

@Component({
  selector: 'endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {
  @Output() onChangesValues: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  public formGroup: FormGroup;
  public cep: string = '';
  public endereco: string = '';
  public numero: string = '';
  public cidade: string = '';
  public bairro: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private web: WebServiceService,
  ) {
    this.formGroup = this.formBuilder.group({
      endereco: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      cidade: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.maxLength(8)]],

    })
  }

  ngOnInit(): void {
  }

  public consultarCEP(){
    this.cep = this.formGroup.get('cep')?.value;
    this.web.buscarCep(this.cep).then((res) =>{
      this.bairro = res.data.bairro;
      this.endereco = res.data.endereco;
      this.cidade = res.data.cidade;
    })
  }
}
