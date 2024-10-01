import { NextApiRequest, NextApiResponse } from "next";
import { cursoController } from "server/controller/curso";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const cursoId = query.id as string;

  try {
    if (method === "GET") {
      if (cursoId) {
        const curso = await cursoController.getCursoById(cursoId);
        if (!curso) {
          return res.status(404).json({ message: "Curso não encontrado." });
        }
        return res.status(200).json({ data: curso });
      } else {
        const cursos = await cursoController.getAllCursos();
        return res.status(200).json({ data: cursos });
      }
    }

    if (method === "POST") {
      const newCurso = await cursoController.createCurso(body);
      return res.status(201).json({ data: newCurso });
    }

    if (method === "PUT") {
      if (!cursoId) {
        return res.status(400).json({ message: "ID do curso é necessário." });
      }
      const updatedCurso = await cursoController.updateCurso(cursoId, body);
      return res.status(200).json({ data: updatedCurso });
    }

    if (method === "DELETE") {
      if (!cursoId) {
        return res.status(400).json({ message: "ID do curso é necessário." });
      }
      await cursoController.deleteCurso(cursoId);
      return res.status(204).end();
    }

    return res.status(405).json({ message: "Método não permitido." });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: "Erro do servidor." });
  }
}
