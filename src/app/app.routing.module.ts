import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CadastrarComponent} from "./Modulos/cadastrar/cadastrar.component";
import {DesempenhoComponent} from "./Modulos/desempenho/desempenho.component";
import {ConsultarComponent} from "./Modulos/consultar/consultar.component";
import {InserirComponent} from "./Modulos/inserir/inserir.component";

const routes: Routes = [
  {
    path: '',
    title:'Pagina Inicial',
    children:[

      {
        path: 'Cadastrar',
        title: 'Cadastrar',
        component: CadastrarComponent,
      },
      {
        path: 'Consultar',
        children:[
          {
            path:'',
            title: 'Consultar',
            component: ConsultarComponent,
          },
          {
            path: 'Inserir',
            title: 'Inserir',
            component: InserirComponent,
          }
        ]
      },
      {
        path: 'Desempenho',
        title: 'Desempenho',
        component: DesempenhoComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
