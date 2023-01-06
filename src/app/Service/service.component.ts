import {inject, Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  CollectionReference
} from "@angular/fire/compat/firestore";
import {AlunosModel} from "../Pagina/interface/alunos";
import {EnderecoModel} from "../Pagina/interface/endereco";
import {InformacoesModel} from "../Pagina/interface/informacoes";
import {MateriasModel, NotasModel} from "../Pagina/interface/materias";

@Injectable({
  providedIn: 'root'
})

export class Service{
  private alunos = new Subject<any>();

  constructor(
    private firestore: AngularFirestore
  ) {}

  createId(): string{
    return this.firestore.collection('Alunos').doc().ref.id;
  }

  createCadastro(alunos: AlunosModel): Promise<void>{
    alunos.id = this.createId();
    const batch = this.firestore.firestore.batch();
    const ref = this.firestore.collection('Alunos').doc(alunos.id).ref;
    return this.firestore.collection('Alunos').ref.where('CPF','==', alunos.CPF).get().then((Doc)=>{
      if(!Doc.empty){
        throw new Error('Você já possui um cadastro!')
      }
      batch.set(ref,alunos);
      return batch.commit();
    })
  }

  getAllAlunos(): AngularFirestoreCollection<AlunosModel>{
    return this.firestore.collection('Alunos',(ref: CollectionReference) => ref.orderBy('nome',"asc"));
  }

  getAluno(id: string): AngularFirestoreDocument<AlunosModel>{
    return this.firestore.collection('Alunos').doc(id);
  }

  updateAluno(id: string, aluno: any): Promise<void>{
    return this.firestore.collection('Alunos').doc(id).update(aluno)
  }


  deletar(id: string): Promise<any>{
    return this.firestore.collection('Alunos').doc(id).delete();
  }


  adicionar(alunos: AlunosModel){
    this.alunos.next(alunos)
  }

  getEditar(): Observable<AlunosModel>{
    return this.alunos.asObservable();
  }


  createIdInformacoes(): string{
    return this.firestore.collection('Informações').doc().ref.id;
  }

  createInformacoes(informacoes: InformacoesModel): Promise<void>{
    informacoes.id = this.createIdInformacoes();
    const batch = this.firestore.firestore.batch();
    const ref = this.getInformacoes(informacoes.idAluno).doc(informacoes.id).ref
    return this.getInformacoes(informacoes.idAluno).ref.where('nomeResponsavel','==',informacoes.nomeResponsavel).get().then((Doc)=>{
      if(!Doc.empty){
        throw new Error();
      }
      batch.set(ref,informacoes)
      return batch.commit();
    })
  }

  getInformacoes(idAluno: string ): AngularFirestoreCollection<InformacoesModel>{
    return this.getAluno(idAluno).collection('Informações');
  }

  createIdEndereço(): string{
    return this.firestore.collection('Endereço').doc().ref.id;
  }

  createEndereço(endereço: EnderecoModel): Promise<void>{
    endereço.id = this.createIdEndereço();
    const batch = this.firestore.firestore.batch();
    const ref = this.getEndereco(endereço.idAluno).doc(endereço.id).ref
    return this.getEndereco(endereço.idAluno).ref.where('cep','==',endereço.cep).get().then((Doc)=>{
      if(!Doc.empty){
        throw new Error();
      }
      batch.set(ref,endereço)
      return batch.commit();
    })
  }

  getEndereco(idAluno: string): AngularFirestoreCollection<EnderecoModel>{
    return this.getAluno(idAluno).collection('Endereço');
  }

  createIdNota(): string{
    return this.firestore.collection('Nota').doc().ref.id;
  }

  createNota(nota: NotasModel): Promise<void>{
    nota.id = this.createIdNota();
    const batch = this.firestore.firestore.batch();
    const ref = this.getNota(nota.idAluno).doc(nota.id).ref
    return this.getNota(nota.idAluno).ref.where('idAluno','==',nota.idAluno).get().then((Doc)=>{
      if(!Doc.empty){
        throw new Error();
      }
      batch.set(ref,nota)
      return batch.commit();
    })
  }

  getNota(idAluno: string): AngularFirestoreCollection<NotasModel>{
    return this.getAluno(idAluno).collection('Nota');
  }
  getAllNotas(): AngularFirestoreCollection<NotasModel>{
    return this.firestore.collection('Notas');
  }






}

export class ServiceComponent {
}
