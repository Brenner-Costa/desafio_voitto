import { ICurso } from '../entities';
import prisma from '../../../lib/prisma';
import { cursoPessoaRepository } from 'server/repositories/cursoAluno';

const getCursosPorAluno = async (alunoId: string): Promise<ICurso[]> => {
    const existingAluno = await cursoPessoaRepository.getAlunoById(alunoId);

    if (!existingAluno) {
        throw new Error('Este aluno não existe!');
    }

    const cursos = await cursoPessoaRepository.getCursosByAlunoId(alunoId);
    return cursos;
};

const addCursoParaAluno = async (
    alunoId: string,
    cursoId: string
): Promise<void> => {
    const existingAluno = await cursoPessoaRepository.getAlunoById(alunoId);

    if (!existingAluno) {
        throw new Error('Este aluno não existe!');
    }

    const existingCurso = await cursoPessoaRepository.getCursoById(cursoId);

    if (!existingCurso) {
        throw new Error('Este curso não existe!');
    }

    const existingAssociation = await cursoPessoaRepository.getCursoAlunoByIds(
        alunoId,
        cursoId
    );

    if (existingAssociation) {
        throw new Error('Este aluno já está matriculado neste curso!');
    }

    await cursoPessoaRepository.addCursoParaAluno(alunoId, cursoId);
};

const removeCursoDeAluno = async (
    alunoId: string,
    cursoId: string
): Promise<void> => {
    const existingAluno = await cursoPessoaRepository.getAlunoById(alunoId);

    if (!existingAluno) {
        throw new Error('Este aluno não existe!');
    }

    const existingCurso = await cursoPessoaRepository.getCursoById(cursoId);

    if (!existingCurso) {
        throw new Error('Este curso não existe!');
    }

    const existingAssociation = await cursoPessoaRepository.getCursoAlunoByIds(
        alunoId,
        cursoId
    );

    if (!existingAssociation) {
        throw new Error('Este aluno não está matriculado neste curso!');
    }

    await cursoPessoaRepository.removeCursoDeAluno(alunoId, cursoId);
};

export const cursoPessoaController = {
    getCursosPorAluno,
    addCursoParaAluno,
    removeCursoDeAluno
};
