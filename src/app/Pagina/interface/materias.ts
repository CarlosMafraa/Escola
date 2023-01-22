export interface Materias{
  title: string;
}
//
export interface MateriasModel {
  portugues: "Português";
  matematica: "Matamática";
  história: "História";
  geografia: "Geografia";
  ciencias: "Ciências";
  edFisica: "Educação Física"
  edArtistica: "Educação Artistíca";
  ingles: "Inglês";
}

// id?: string;
// idAluno: string;
// portugues: BimestreModel;
// matematica: BimestreModel;
// historia: BimestreModel;
// geografia: BimestreModel;
// ciencias: BimestreModel;
// edFisica: BimestreModel;
// edArtistica: BimestreModel;
// ingles: BimestreModel

//

export interface NotasModel{
  id?: string;
  idAluno: any;
  materia: string;
  nota1: number;
  nota2: number;
  nota3: number;
}

// port1: number;
// port2: number;
// port3: number;
// mat1: number;
// mat2: number;
// mat3: number;
// hist1: number;
// hist2: number;
// hist3: number;
// geo1: number;
// geo2: number;
// geo3: number;
// cien1: number;
// cien2: number;
// cien3: number;
// EdFis1: number;
// EdFis2: number;
// EdFis3: number;
// EdArt1: number;
// EdArt2: number;
// EdArt3: number;
// Ing1: number;
// Ing2: number;
// Ing3: number;
