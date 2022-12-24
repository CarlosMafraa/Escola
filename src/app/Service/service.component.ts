import {inject, Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FormGroup} from "@angular/forms";
import {InformacaoPessoal} from "../Pagina/interface/informacao-pessoal";
import {Alunos} from "../Pagina/interface/aluno";

@Injectable({
  providedIn: 'root'
})

export class Service{
  private alunos = new Subject<any>();

  constructor(
    private firestore: AngularFirestore
  ) {}

  cadastrar(alunos: Alunos): Promise<any>{
    return this.firestore.collection('Alunos').add(alunos)
  }

  retornar(): Observable<any>{
    return this.firestore.collection('Alunos',ref => ref.orderBy('nome',"asc")).snapshotChanges();
  }

  deletar(id: string): Promise<any>{
    return this.firestore.collection('Alunos').doc(id).delete();
  }
  editar(id: string, alunos: any): Promise<any>{
    return this.firestore.collection('Alunos').doc(id).update(alunos)
  }

  // getEditar(): Observable<Alunos>{
  //   return this.alunos.asObservable();
  // }
}

export class ServiceComponent {
}
