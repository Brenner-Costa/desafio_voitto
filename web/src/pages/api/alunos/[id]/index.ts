//CONTROLLER
import { NextApiRequest, NextApiResponse } from "next";
import { alunoController } from "server/controller";

export default async function handler(req: NextApiRequest, res: NextApiResponse ) {
    const { method, query, headers, body } = req;

    try {

        if(method === "GET") {
            const response = await alunoController.getAlunos();
            return res.status(200).json({ data: response})
        }

        return res.status(503).json({ message: "Method not allowed" });

    } catch (error) {
        console.error("Error occurred:", error);
        
        if (error instanceof Error && error.message === "O email já existe") {
            return res.status(409).json({ message: error.message });
        }

        return res.status(500).json({ message: "Server Error" });
    }
}