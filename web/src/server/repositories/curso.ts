import prisma from "../../../lib/prisma";
import { ICurso } from "server/entities";

const getCursoById = async (cursoId: string): Promise<ICurso | null> => {
  const curso = await prisma.curso.findFirst({
    where: {
      id: cursoId,
    },
  });
  return curso;
};

const getAllCursos = async (): Promise<ICurso[]> => {
  const cursos = await prisma.curso.findMany();
  return cursos;
};

const createCurso = async (data: Omit<ICurso, 'id'>): Promise<ICurso> => {
  const curso = await prisma.curso.create({
    data,
  });
  return curso;
};

const updateCurso = async (cursoId: string, data: Partial<Omit<ICurso, 'id'>>): Promise<ICurso> => {
  const curso = await prisma.curso.update({
    where: {
      id: cursoId,
    },
    data,
  });
  return curso;
};

const deleteCurso = async (cursoId: string): Promise<void> => {
  await prisma.curso.delete({
    where: {
      id: cursoId,
    },
  });
};

export const cursoRepository = {
  getCursoById,
  getAllCursos,
  createCurso,
  updateCurso,
  deleteCurso,
};
