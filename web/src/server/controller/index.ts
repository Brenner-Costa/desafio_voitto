import { IcreateAlunoRequest, IAluno } from "../entities";
import prisma from "../../../lib/prisma";
import { alunoRepository } from "server/repositories";

const createAluno = async( request:IcreateAlunoRequest ): Promise<IAluno> => {
    console.log("teste")
    const aluno: IAluno = {
        nome: request.nome,
        email: request.email,
        cep: request.cep,
        cidade: request.cidade,
        estado: request.estado,
      };

    const alunoCriado = await alunoRepository.saveRequestAluno(aluno);
    console.log(alunoCriado)
    return alunoCriado;
}

export const alunoController = {
    createAluno,
}

// const getById = async(request: ) => {},

// const updateById = async(request: ) => {},

// const deleteById = async(request: ) => {},