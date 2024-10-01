import prisma from "../../../lib/prisma";

const getAlunoById = async (alunoId: string) => {
  const aluno = await prisma.aluno.findFirst({
    where: {
      id: alunoId,
    },
  });

  return aluno;
};

 
const getCursoById = async (cursoId: string) => {
  const curso = await prisma.curso.findFirst({
    where: {
      id: cursoId,
    },
  });

  return curso;
};


const getCursosByAlunoId = async (alunoId: string) => {
  const cursos = await prisma.cursoPessoa.findMany({
    where: {
      alunoId: alunoId,
    },
    include: {
      curso: true, 
    },
  });

  return cursos.map(cursoPessoa => cursoPessoa.curso);
};


const getCursoAlunoByIds = async (alunoId: string, cursoId: string) => {
  const cursoAluno = await prisma.cursoPessoa.findFirst({
    where: {
      alunoId: alunoId,
      cursoId: cursoId,
    },
  });

  return cursoAluno;
};


const addCursoParaAluno = async (alunoId: string, cursoId: string): Promise<void> => {
  await prisma.cursoPessoa.create({
    data: {
      alunoId: alunoId,
      cursoId: cursoId,
    },
  });
};


const removeCursoDeAluno = async (alunoId: string, cursoId: string): Promise<void> => {
  await prisma.cursoPessoa.deleteMany({
    where: {
      alunoId: alunoId,
      cursoId: cursoId,
    },
  });
};

export const cursoPessoaRepository = {
  getAlunoById,
  getCursoById,
  getCursosByAlunoId,
  getCursoAlunoByIds,
  addCursoParaAluno,
  removeCursoDeAluno,
};
