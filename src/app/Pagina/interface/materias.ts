export interface Materias{
  title: string;
}

export interface MateriasModel {
  id?: string;
  idAluno: string;
  portugues: BimestreModel;
  matematica: BimestreModel;
  historia: BimestreModel;
  geografia: BimestreModel;
  ciencias: BimestreModel;
  edFisica: BimestreModel;
  edArtistica: BimestreModel;
  ingles: BimestreModel
}

export interface BimestreModel{
  bimestre1: NotasModel;
  bimestre2: NotasModel;
  bimestre3: NotasModel;
  bimestre4: NotasModel;
}
export interface NotasModel{
  id?: string;
  idAluno: any;
  nota1: number;
  nota2: number;
  nota3: number;
}
