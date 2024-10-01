// pages/api/cursos.ts

import { NextApiRequest, NextApiResponse } from "next";
import { cursoPessoaController } from "server/controller/cursoAluno";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req;
    const alunoId = query.alunoId; 
    const cursoId = query.cursoId;

    try {

        if (method === "GET") {
            if (!alunoId || typeof alunoId !== 'string') {
                return res.status(400).json({ message: 'ID do aluno inválido.' });
            }
            const response = await cursoPessoaController.getCursosPorAluno(alunoId);
            return res.status(200).json({ data: response });
        }

        if (method === "POST") {
            if (!alunoId || typeof alunoId !== 'string' || !cursoId || typeof cursoId !== 'string') {
                return res.status(400).json({ message: 'IDs do aluno e do curso são obrigatórios.' });
            }
            await cursoPessoaController.addCursoParaAluno(alunoId, cursoId);
            return res.status(201).json({ message: 'Curso adicionado ao aluno com sucesso.' });
        }

        if (method === "DELETE") {
            if (!alunoId || typeof alunoId !== 'string' || !cursoId || typeof cursoId !== 'string') {
                return res.status(400).json({ message: 'IDs do aluno e do curso são obrigatórios.' });
            }
            await cursoPessoaController.removeCursoDeAluno(alunoId, cursoId);
            return res.status(204).end(); 
        }

        return res.status(405).json({ message: "Método incompatível" }); 

    } catch (error) {
        console.error("Error occurred:", error);

        if (error instanceof Error) {
            if (error.message === 'Este aluno não existe!' || error.message === 'Este curso não existe!') {
                return res.status(404).json({ message: error.message });
            } else if (error.message === 'Este aluno já está matriculado neste curso!' || error.message === 'Este aluno não está matriculado neste curso!') {
                return res.status(409).json({ message: error.message });
            }
        }

        return res.status(500).json({ message: "Erro interno do servidor" }); 
    }
}
