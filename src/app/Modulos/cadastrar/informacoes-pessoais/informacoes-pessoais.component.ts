import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlunosModel} from "../../../Pagina/interface/alunos";
import {Service} from "../../../Service/service.component";
import {InformacoesModel} from "../../../Pagina/interface/informacoes";
import {StorageService} from "../../../Service/storage/storage.service";


@Component({
  selector: 'informacoes-pessoais',
  templateUrl: './informacoes-pessoais.component.html',
  styleUrls: ['./informacoes-pessoais.component.css'],
})
export class InformacoesPessoaisComponent implements OnInit {
  @Output() onChangeValues: EventEmitter<InformacoesModel> = new EventEmitter<InformacoesModel>();
  public formGroup: FormGroup;
  public informacoes: InformacoesModel;
  public isChecked: boolean = false;
  public isButton: boolean = true;

  constructor(
    public formBuilder: FormBuilder,
    public armazem: Service,
  ) {
    this.formGroup = this.formBuilder.group({
      nomeResponsavel:['',[Validators.required]],
      telefoneResponsavel:['',[Validators.required]],
      emailResponsavel:['',[Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  public publicvalueForm():any{
    const informacoes = this.formGroup.value as InformacoesModel;
    informacoes.nomeResponsavel = this.formGroup.get('nomeResponsavel')?.value;
    informacoes.telefoneResponsavel = this.formGroup.get('telefoneResponsavel')?.value;
    informacoes.emailResponsavel = this.formGroup.get('emailResponsavel')?.value;
    return informacoes
  }

  public addSegResponsavel(): void{
    this.isChecked = true;
    this.isButton = false;
    this.formGroup.addControl(
      "nomeSegResponsavel",new FormControl('',[Validators.required]),
    )
    this.formGroup.addControl(
      "telefoneSegResponsavel",new FormControl('',[Validators.required]),
    )
    this.formGroup.addControl(
      "emailSegResponsavel", new FormControl('',[Validators.required]),)
  }

  public removeSegResponsavel(): void{
    this.isChecked = false;
    this.isButton = true;
    this.formGroup.removeControl("nomeSegResponsavel");
    this.formGroup.removeControl("telefoneSegResponsavel");
    this.formGroup.removeControl("emailSegResponsavel");
  }

  public onChangesFormGroup(): void{
    this.informacoes = this.publicvalueForm();
    this.onChangeValues.emit(this.informacoes)
  }

}
