import { Injectable } from '@angular/core';
import * as axios from "axios";
import {AxiosResponse} from "axios";

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {

  constructor() { }

  public buscarCep(cep: string): Promise<AxiosResponse<any>> {
    const axiosStatic = axios.default;
    return axiosStatic.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
