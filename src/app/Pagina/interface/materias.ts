export interface Materias{
  title: string;
}

export let materia: Array<Materias> = [
  {title: "Português"},
  {title: "Matemática"},
  {title: "História"},
  {title: "Geografia"},
  {title: "Ciências"},
  {title: "Educação Física"},
  {title: "Educação Artistíca"},
  {title: "Inglês"}
]

export interface NotasModel{
  id?: string;
  idAluno: any;
  num_materia: number;
  materia: string;
  nota1: number;
  nota2: number;
  nota3: number;


}

