//CONTROLLER

import { NextApiRequest, NextApiResponse } from "next";
import { alunoController } from "server/controller/aluno";

export default async function handler(req: NextApiRequest, res: NextApiResponse ) {
    const { method, query, headers, body } = req;
    const userId = query.id;

    try {
        if(method === "POST") {
            const response = await alunoController.createAluno(body);
            return res.status(201).json({ data: response });
        }

        if(method === "GET") {
            const response = await alunoController.getAlunos();
            return res.status(200).json({ data: response})
        }

        if(method === "DELETE") {

            if (Array.isArray(userId)) {
                throw new Error('Múltiplos IDs não são suportados.');
            }

            if (!userId || typeof userId !== 'string') {
                return res.status(400).json({ message: 'ID inválido.' });
            }

            await alunoController.deleteById(userId);
            return res.status(204).end();
        }

        if( method === "PUT") {
            if (Array.isArray(userId)) {
                throw new Error('Múltiplos IDs não são suportados.');
            }

            if (!userId || typeof userId !== 'string') {
                return res.status(400).json({ message: 'ID inválido.' });
            }

            const response = await alunoController.updateAluno(userId, body);
            return res.status(200).json({ data: response });
        }

        return res.status(503).json({ message: "Método incompatível" });

    } catch (error) {
        console.error("Error occurred:", error);
        
        if (error instanceof Error && error.message === "O email já existe") {
            return res.status(409).json({ message: error.message });
        }

        return res.status(500).json({ message: "Server Error" });
    }
}