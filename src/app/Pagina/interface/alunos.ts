import {EnderecoModel} from "./endereco";
import {InformacoesModel} from "./informacoes";
import {NotasModel} from "./materias";

export interface AlunosModel{
  id?: string;
  nome: string;
  CPF: string;
  nascAluno: string;
  nomeResponsavel?: string;
  telefoneResponsavel?: string;
  emailResponsavel?: string;
  endereco?:EnderecoModel;
  informacoes?: InformacoesModel;
  nota?: NotasModel;

}


