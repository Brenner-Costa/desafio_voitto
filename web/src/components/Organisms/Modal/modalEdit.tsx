import React, { useEffect, useState } from 'react';
import { ModalOverlay, ModalContainer, Input, Button } from './styles';
import { toast } from 'react-toastify';

interface StudentData {
  id: string;
  nome: string;
  cep: string;
  email: string;
  estado: string;
  cidade: string;
}

const ModalEdit: React.FC<{ onClose: () => void; student: StudentData; onEdit: (student: StudentData) => void; }> = ({ onClose, student, onEdit }) => {
  const [editedStudent, setEditedStudent] = useState<StudentData>(student);

  useEffect(() => {
    setEditedStudent(student);
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

        const response = await fetch(`/api/alunos?id=${editedStudent.id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedStudent), 
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Aluno editado:', data);
            onEdit(editedStudent);
            onClose(); 
        } else {
            const errorData = await response.json();
            console.error('Erro ao editar aluno:', errorData.message);
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
        <h2>Edição de Aluno</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="nome"
            placeholder="Nome"
            value={editedStudent.nome}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="cep"
            placeholder="CEP"
            value={editedStudent.cep}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={editedStudent.email}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="estado"
            placeholder="Estado"
            value={editedStudent.estado}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={editedStudent.cidade}
            onChange={handleChange}
            required
          />
          <Button type="submit">Salvar</Button>
          <Button type="button" onClick={onClose} style={{ backgroundColor: '#ff0000' }}>
            Cancelar
          </Button>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ModalEdit;
