import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  Head,
  Item,
  BodyLine,
  Message,
  TableMobile,
} from './styles';

import { toast } from 'react-toastify';
import useWindowSize from '@/hooks/useWindowSize';
import { Button } from '@material-ui/core';
import ModalCreate from '../../Modal/modalCreate';
import ModalDelete from '../../Modal/modalDelete';
import ModalEdit from '../../Modal/modalEdit'; 

const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isCreateStudentModalOpen, setIsCreateStudentModalOpen] = useState(false);
  const [isDeleteStudentModalOpen, setIsDeleteStudentModalOpen] = useState(false);
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false); 
  const [studentToDelete, setStudentToDelete] = useState<String | null>(null);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null); 
  const [shouldFetch, setShouldFetch] = useState(true); // Controla quando buscar os estudantes
  const mobile = useWindowSize().width < 900;

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/alunos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data.data); 
        setShouldFetch(false); // Evita busca contínua
      } else {
        console.error('Erro ao buscar alunos:', response.statusText);
        toast.error('Erro ao buscar alunos');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro na requisição');
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchStudents(); // 
    }
  }, [shouldFetch]);

  const openCreateStudentModal = (): void => {
    setIsCreateStudentModalOpen(true);
  };

  const closeCreateStudentModal = (): void => {
    setIsCreateStudentModalOpen(false);
  };

  const openDeleteStudentModal = (id: String): void => {
    setStudentToDelete(id);
    setIsDeleteStudentModalOpen(true);
  };

  const closeDeleteStudentModal = (): void => {
    setStudentToDelete(null);
    setIsDeleteStudentModalOpen(false);
  };

  const openEditStudentModal = (student: Student): void => {
    setStudentToEdit(student);
    setIsEditStudentModalOpen(true);
  };

  const closeEditStudentModal = (): void => {
    setStudentToEdit(null);
    setIsEditStudentModalOpen(false);
  };

  const confirmDeleteStudent = async () => {
    if (studentToDelete) {
      try {
        const response = await fetch(`/api/alunos?id=${studentToDelete}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          toast.success('Aluno excluído com sucesso!');
          setStudents((prevStudents) => prevStudents.filter(student => student.id !== studentToDelete));
        } else {
          toast.error('Erro ao excluir aluno.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        toast.error('Erro na requisição');
      } finally {
        closeDeleteStudentModal(); 
      }
    }
  };

  const handleEditStudent = (updatedStudent: Student) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => 
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  const handleStudentCreated = () => {
    setShouldFetch(true); 
  };

  return (
    <Container>
      <header>
        <Button
          fullWidth
          onClick={openCreateStudentModal}
          color="primary"
          variant="contained"
        >
          Adicionar usuário
        </Button>
      </header>

      {students.length > 0 ? (
        !mobile ? (
          <>
            <Table>
              <Head>
                <Item> ID </Item>
                <Item> Nome </Item>
                <Item> E-Mail </Item>
                <Item> cep </Item>
                <Item> estado </Item>
                <Item> cidade </Item>
                <Item> EDITAR </Item>
                <Item> EXCLUIR </Item>
              </Head>
              {students.map((student) => (
                <BodyLine key={student.id}>
                  <Item> {student.id} </Item>
                  <Item> {student.nome} </Item>
                  <Item> {student.email} </Item>
                  <Item> {student.cep} </Item>
                  <Item> {student.estado} </Item>
                  <Item> {student.cidade} </Item>
                  <Item>
                    <button onClick={() => openEditStudentModal(student)}>Editar</button>
                  </Item>
                  <Item>
                    <button onClick={() => openDeleteStudentModal(student.id)}>
                      Excluir
                    </button>
                  </Item>
                </BodyLine>
              ))}
            </Table>
          </>
        ) : (
          <TableMobile>
            {/* Renderizar a versão mobile aqui */}
          </TableMobile>
        )
      ) : (
        <Message>
          <p>Você ainda não fez nenhuma alteração</p>
        </Message>
      )}

      {isCreateStudentModalOpen && (
        <ModalCreate onClose={closeCreateStudentModal} onStudentCreated={handleStudentCreated} />
      )}
      {isEditStudentModalOpen && studentToEdit && (
        <ModalEdit 
          onClose={closeEditStudentModal} 
          student={studentToEdit} 
          onEdit={handleEditStudent} 
        />
      )}
      {isDeleteStudentModalOpen && (
        <ModalDelete
          open={isDeleteStudentModalOpen}
          onClose={closeDeleteStudentModal}
          onConfirm={confirmDeleteStudent}
          studentName={students.find(student => student.id === studentToDelete)?.nome || ''} 
        />
      )}
    </Container>
  );
};

export default StudentTable;
