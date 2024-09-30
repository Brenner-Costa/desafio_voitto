//CONTROLLER

import { NextApiRequest, NextApiResponse } from "next";
import { alunoController } from "server/controller";

export default async function handler(req: NextApiRequest, res: NextApiResponse ) {
    const { method, query, headers, body } = req;

    try {
        if(method === "POST") {
            const response = await alunoController.createAluno(body);
            return res.status(201).json({ data: response });
        }
        return res.status(503).json({ message: "Method not allowed" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}