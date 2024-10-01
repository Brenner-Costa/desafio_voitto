import { cursoRepository } from 'server/repositories/curso';
import { Curso } from '@prisma/client';

const getAllCursos = async (): Promise<Curso[]> => {
  return await cursoRepository.getAllCursos();
};

const getCursoById = async (cursoId: string): Promise<Curso | null> => {
  return await cursoRepository.getCursoById(cursoId);
};

const createCurso = async (data: Omit<Curso, 'id'>): Promise<Curso> => {
  return await cursoRepository.createCurso(data);
};

const updateCurso = async (cursoId: string, data: Partial<Omit<Curso, 'id'>>): Promise<Curso> => {
  return await cursoRepository.updateCurso(cursoId, data);
};

const deleteCurso = async (cursoId: string): Promise<void> => {
  await cursoRepository.deleteCurso(cursoId);
};

export const cursoController = {
  getAllCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
};
