import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  Head,
  Item,
  BodyLine,
  Message,
  TableMobile,
  Separator
} from './styles';

import { api } from '@/services/api';
import { toast } from 'react-toastify';
import useWindowSize from '@/hooks/useWindowSize';
import { Button } from '@material-ui/core';
import { buttonTheme } from '@/utils/Config';
import ModalCreate from '../../Modal';

const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isCreateStudentModalOpen, setIsCreateStudentModalOpen] = useState(false); // Estado para controlar o modal
  const mobile = useWindowSize().width < 900;

  useEffect(() => {
    api
      .get('alunos')
      .then(res => {
        setStudents(res.data);
      })
      .catch(() => {
        toast('Confira a API', {
          position: toast.POSITION.BOTTOM_CENTER,
          type: 'error',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      });
  }, []);

  // Função para abrir o modal de criação de aluno
  const openCreateStudentModal = (): void => {
    setIsCreateStudentModalOpen(true);
  };

  // Função para fechar o modal de criação de aluno
  const closeCreateStudentModal = (): void => {
    setIsCreateStudentModalOpen(false);
  };

  const openDeleteStudentModal = (id: number): void => {
    // Lógica para excluir o aluno
  };

  return (
    <Container>
      <header>
        <Button
          fullWidth
          onClick={openCreateStudentModal} // Abre o modal ao clicar
          color="primary"
          variant={buttonTheme}
        >
          Adicionar usuário
        </Button>
      </header>

      {students ? (
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
              {students &&
                students.map((student, key) => (
                  <BodyLine key={key}>
                    <Item> {student.id} </Item>
                    <Item> {student.nome} </Item>
                    <Item> {student.email} </Item>
                    <Item> {student.cep} </Item>
                    <Item> {student.estado} </Item>
                    <Item> {student.cidade} </Item>
                    <Item>
                      <button>editar</button>
                    </Item>
                    <Item>
                      <button
                        onClick={() => openDeleteStudentModal(student.id)}
                      >
                        excluir
                      </button>
                    </Item>
                  </BodyLine>
                ))}
            </Table>
          </>
        ) : (
          <>
            {students &&
              students.map((student, key) => (
                <TableMobile key={key}>
                  <Head>
                    <Item> ID </Item>
                  </Head>
                  <BodyLine>
                    <Item> {student.id} </Item>
                  </BodyLine>
                  <Head>
                    <Item> Nome </Item>
                  </Head>
                  <BodyLine>
                    <Item> {student.nome} </Item>
                  </BodyLine>
                  <Head>
                    <Item> Email </Item>
                  </Head>
                  <BodyLine>
                    <Item> {student.email} </Item>
                  </BodyLine>
                  <Head>
                    <Item> Cep </Item>
                  </Head>
                  <BodyLine>
                    <Item> {student.cep} </Item>
                  </BodyLine>
                  <Head>
                    <Item> Estado</Item>
                  </Head>
                  <BodyLine>
                    <Item> {student.estado} </Item>
                  </BodyLine>
                  <Head>
                    <Item>Cidade </Item>
                  </Head>
                  <BodyLine>
                    <Item> {student.cidade} </Item>
                  </BodyLine>
                </TableMobile>
              ))}
          </>
        )
      ) : (
        <Message>
          <p>Você ainda não fez nenhuma alteração</p>
        </Message>
      )}

      {isCreateStudentModalOpen && (
        <ModalCreate onClose={closeCreateStudentModal} /> // Renderiza o modal de criação se estiver aberto
      )}
    </Container>
  );
};

export default StudentTable;
