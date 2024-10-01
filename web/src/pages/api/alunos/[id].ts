import { NextApiRequest, NextApiResponse } from 'next';
import { alunoController } from '../../../server/controller/aluno';
import { cursoPessoaController } from 'server/controller/cursoAluno';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const aluno = await alunoController.getAlunoById(id as string);
      res.status(200).json(aluno);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
