import {EnderecoModel} from "./endereco";
import {InformacoesModel} from "./informacoes";

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

}


