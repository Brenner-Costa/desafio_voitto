import React, { useEffect, useState } from 'react';
import { ModalOverlay, ModalContainer, Input, Button } from './styles'
import { toast } from 'react-toastify';


interface StudentData {
  nome: string;
  cep: string;
  email: string;
  estado: string;
  cidade: string;
}

interface ModalCreateProps {
  onClose: () => void;
  onStudentCreated: () => void; 
}

const ModalCreate: React.FC<ModalCreateProps> = ({ onClose, onStudentCreated }) => {
  const [student, setStudent] = useState<StudentData>({
    nome: '',
    cep: '',
    email: '',
    estado: '',
    cidade: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Aluno cadastrado:', data);
        onStudentCreated();
        onClose(); 
      } else {
        const errorData = await response.json();
        console.error('Erro ao cadastrar aluno:', errorData.message);
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro na requisição');
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>Cadastro de Aluno</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="nome"
            placeholder="Nome"
            value={student.nome}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="cep"
            placeholder="CEP"
            value={student.cep}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={student.email}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="estado"
            placeholder="Estado"
            value={student.estado}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={student.cidade}
            onChange={handleChange}
            required
          />
          <Button type="submit">Cadastrar</Button>
          <Button type="button" onClick={onClose} style={{ backgroundColor: '#ff0000' }}>
            Cancelar
          </Button>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ModalCreate;