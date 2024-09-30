import { IAluno } from "../entities";
import prisma from "../../../lib/prisma";

const saveRequestAluno = async (aluno: IAluno): Promise<IAluno> => {

  const alunoCriado = await prisma.aluno.create({
    data: aluno
  });

  return alunoCriado;
};

export const alunoRepository = {
    saveRequestAluno,
};
