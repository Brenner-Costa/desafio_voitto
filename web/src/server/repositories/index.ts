import { IAluno } from "../entities";
import prisma from "../../../lib/prisma";

const saveRequestAluno = async (aluno: IAluno): Promise<IAluno> => {

  const alunoCriado = await prisma.aluno.create({
    data: aluno
  });

  return alunoCriado;
};

const getAllAlunos = async (): Promise<IAluno[]> => {
  const alunos = await prisma.aluno.findMany();
  return alunos;
};

const getByEmail = async (email: string) => {
  const alunoEmail = await prisma.aluno.findFirst({
    where: {
      email: email, 
    },
  });

  return alunoEmail;

};

const getById = async (id: string) => {
  const  alunoId = await prisma.aluno.findFirst({
    where: {
      id: id,
    },
  });

  return alunoId;

};

const deleteAluno = async (id: string): Promise<void> => {
  await prisma.aluno.delete({
    where: {
      id: id,
    },
  });
};

const updateAluno = async (id: string, aluno: IAluno): Promise<IAluno> => {
  const alunoAtualizado = await prisma.aluno.update({
      where: {
          id: id,
      },
      data: aluno,
  });

  return alunoAtualizado;
};


export const alunoRepository = {
    saveRequestAluno,
    getAllAlunos,
    getByEmail,
    getById,
    deleteAluno,
    updateAluno,
};
