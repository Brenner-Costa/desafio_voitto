import React, { useEffect, useState } from 'react';
import { ModalOverlay, ModalContainer, Input, Button, Select } from './styles';
import { toast } from 'react-toastify';
import { IAluno, ICurso } from 'server/entities';

interface StudentData extends IAluno {
  cursoId: string; 
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
    cursoId: '',
  });
  const [cursos, setCursos] = useState<ICurso[]>([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch('/api/cursos');
        if (!response.ok) {
          throw new Error('Erro ao buscar cursos');
        }
        const data = await response.json();
        setCursos(data.data); // Certifique-se de que isso é um array
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        toast.error('Erro ao carregar cursos');
      }
    };

    fetchCursos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <Input type="text" name="nome" placeholder="Nome" value={student.nome} onChange={handleChange} required />
          <Input type="text" name="cep" placeholder="CEP" value={student.cep} onChange={handleChange} required />
          <Input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
          <Input type="text" name="estado" placeholder="Estado" value={student.estado} onChange={handleChange} required />
          <Input type="text" name="cidade" placeholder="Cidade" value={student.cidade} onChange={handleChange} required />
          <Select name="cursoId" value={student.cursoId} onChange={handleChange} required>
            <option value="">Selecione um curso</option>
            {cursos.map(curso => (
              <option key={curso.id} value={curso.id}>{curso.nome}</option>
            ))}
          </Select>
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
