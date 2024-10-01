export interface IAluno {
    id?: string,
    nome: string;
    email: string;
    cep: string;
    cidade: string;
    estado: string;
}

export interface IcreateAlunoRequest {
    id?: string,
    nome: string;
    email: string;
    cep: string;
    cidade: string;
    estado: string;
}

export interface ICurso {
    id: string;
    nome: string;
}