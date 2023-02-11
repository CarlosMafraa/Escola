import {EventEmitter, Injectable} from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference } from "@angular/fire/compat/firestore";
import {AlunosModel} from "../Pagina/interface/alunos";
import {EnderecoModel} from "../Pagina/interface/endereco";
import {InformacoesModel} from "../Pagina/interface/informacoes";
import {NotasModel} from "../Pagina/interface/materias";
import {snapshotEqual} from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})

export class Service{

  constructor(
    private firestore: AngularFirestore
  ) {}


  createId(): string{
    return this.firestore.collection<AlunosModel>('Alunos').doc().ref.id;
  }

  createCadastro(alunos: AlunosModel): Promise<any>{
    alunos.id = this.createId();
    const batch = this.firestore.firestore.batch();
    const ref = this.firestore.collection<AlunosModel>('Alunos').doc(alunos.id).ref;
    return this.firestore.collection('Alunos').ref.where('nome','==', alunos.nome).get().then((Doc)=>{
      if(!Doc.empty){
        throw new Error('Você já possui um cadastro!')
      }
      batch.set(ref,alunos);
      return batch.commit();
    })
  }

  getAllAlunos(): AngularFirestoreCollection<AlunosModel>{
    return this.firestore.collection<AlunosModel>('Alunos',(ref: CollectionReference) => ref.orderBy('nome',"asc"));
  }

  getAluno(id: string): AngularFirestoreDocument<AlunosModel>{
    return this.firestore.collection<AlunosModel>('Alunos').doc(id);
  }

  updateAluno(aluno: AlunosModel): Promise<void>{
    return this.firestore.doc<AlunosModel>(aluno.id).update(aluno)
  }

  async deleteAluno(aluno: AlunosModel) {


  }

  getEditAluno(aluno: AlunosModel): Promise<void>{
    return this.firestore.collection<AlunosModel>('Alunos').doc(aluno.id).set(aluno).then();

  }

  createIdInformacoes(): string{
    return this.firestore.collection<InformacoesModel>('Informações').doc().ref.id;
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
    return this.getAluno(idAluno).collection<InformacoesModel>('Informações');
  }

  getEditInformacoes(informacoes: InformacoesModel): Promise<void>{
    return this.firestore.collection<InformacoesModel>('Alunos').doc(informacoes.idAluno).collection('Informações').doc(informacoes.idAluno).set(informacoes).then();
  }


  createIdEndereço(): string{
    return this.firestore.collection<EnderecoModel>('Endereço').doc().ref.id;
  }

  createEndereço(endereco: EnderecoModel): Promise<void>{
    endereco.id = this.createIdEndereço();
    const batch = this.firestore.firestore.batch();
    const ref = this.getEndereco(endereco.idAluno).doc(endereco.id).ref
    return this.getEndereco(endereco.idAluno).ref.where('cep','==',endereco.cep).get().then((Doc)=>{
      if(!Doc.empty){
        throw new Error();
      }
      batch.set(ref,endereco)
      return batch.commit();
    })
  }

  getEndereco(idAluno: string): AngularFirestoreCollection<EnderecoModel>{
    return this.getAluno(idAluno).collection<EnderecoModel>('Endereço');
  }

  getEditEndereco(endereco: EnderecoModel): Promise<void>{
    return this.firestore.collection('Alunos').doc(endereco.idAluno).collection<EnderecoModel>('Endereço').doc(endereco.idAluno).set(endereco).then();
  }

  deleteEndereço(endereco: EnderecoModel): Promise<void>{
    return  this.firestore.collection('Endereço').doc(endereco.id).delete()



    // ref.get().subscribe(docs =>{
    //   docs.forEach( async doc =>{
    //     await ref.doc(doc.data().id).delete()
    //   })
    // })
  }


  createIdNota(): string{
    return this.firestore.collection('Nota').doc().ref.id;
  }

  createNota(nota: NotasModel): Promise<void>{
    nota.id = this.createIdNota();
    const batch = this.firestore.firestore.batch();
    const ref = this.getNota(nota.idAluno).doc(nota.id).ref
    return this.getNota(nota.idAluno).ref.where('numero','==',nota.num_materia).get().then((Doc)=>{
      if(!Doc.empty){
        throw new Error();
      }
      batch.set(ref,nota)
      return batch.commit();
    })
  }

  getNota(idAluno: string): AngularFirestoreCollection<NotasModel>{
    return this.getAluno(idAluno).collection('Nota',ref => ref.orderBy('num_materia',"asc"));
  }

  getEditarNota(nota: NotasModel): Promise<void>{
    return this.firestore.collection('Alunos').doc(nota.idAluno).collection('Nota').doc(nota.materia).set(nota).then();
  }
  getAllNotas(): AngularFirestoreCollection<NotasModel>{
    return this.firestore.collection('Notas');
  }

}
