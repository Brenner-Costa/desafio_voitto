import { IcreateAlunoRequest, IAluno } from "../entities";
import prisma from "../../../lib/prisma";
import { alunoRepository } from "server/repositories/aluno";
import { cursoPessoaRepository } from "server/repositories/cursoAluno"; 

const createAluno = async (request: IcreateAlunoRequest): Promise<IAluno> => {
    const existingEmail = await alunoRepository.getByEmail(request.email);

    if (existingEmail) {
        throw new Error("O email já existe");
    }

    const aluno: IAluno = {
        nome: request.nome,
        email: request.email,
        cep: request.cep,
        cidade: request.cidade,
        estado: request.estado,
    };

    const alunoCriado = await alunoRepository.saveRequestAluno(aluno);

    return alunoCriado;
}

const getAlunos = async (): Promise<IAluno[]> => {
    const alunos = await alunoRepository.getAllAlunos();
    return alunos;
};

const deleteById = async (id: string): Promise<void> => {
    const existingAluno = await alunoRepository.getById(id);

    if (!existingAluno) {
        throw new Error("Este aluno não existe!");
    }

    await alunoRepository.deleteAluno(id);
};

const updateAluno = async (id: string, request: IcreateAlunoRequest): Promise<IAluno> => {
    const existingAluno = await alunoRepository.getById(id);

    if (!existingAluno) {
        throw new Error("Este aluno não existe!");
    }

    const existingEmail = await alunoRepository.getByEmail(request.email);
    if (existingEmail && existingEmail.id !== id) {
        throw new Error("O email já existe para outro aluno");
    }

    const updatedAluno: IAluno = {
        nome: request.nome,
        email: request.email,
        cep: request.cep,
        cidade: request.cidade,
        estado: request.estado,
    };

    const alunoAtualizado = await alunoRepository.updateAluno(id, updatedAluno);

    return alunoAtualizado;
};


const getAlunoById = async (id: string): Promise<IAluno & { cursos: any[] }> => {
    const aluno = await alunoRepository.getById(id);

    if (!aluno) {
        throw new Error("Aluno não encontrado");
    }

    const cursos = await cursoPessoaRepository.getCursosByAlunoId(id);

    return { ...aluno, cursos };
};

export const alunoController = {
    createAluno,
    getAlunos,
    deleteById,
    updateAluno,
    getAlunoById 
}
