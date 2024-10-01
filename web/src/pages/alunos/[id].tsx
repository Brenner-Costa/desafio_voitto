import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { IAluno } from 'server/entities';
import { ICurso } from 'server/entities';

interface AlunoWithCurse extends IAluno {
  cursos: ICurso[];
}

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: auto;
  margin-top: 2.5rem;
  padding: 1rem;
  border: 1px solid #aaa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 2rem;
  color: #555;
`;

const InfoText = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
  color: #666;
`;

const CoursesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const CourseItem = styled.li`
  font-size: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
  color: #333;

  &:last-child {
    border-bottom: none;
  }
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #0070f3;
`;

const NotFoundMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #ff0000;
`;

const AlunoDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [aluno, setAluno] = useState<AlunoWithCurse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAluno = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/alunos/${id}`);
          if (!response.ok) {
            throw new Error('Erro ao buscar aluno');
          }
          const data = await response.json();
          setAluno(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAluno();
  }, [id]);

  if (loading) return <LoadingMessage>Carregando...</LoadingMessage>;

  if (!aluno) return <NotFoundMessage>Aluno não encontrado</NotFoundMessage>;

  return (
    <Container>
      <Title>{aluno.nome}</Title>
      <InfoText>Email: {aluno.email}</InfoText>
      <InfoText>CEP: {aluno.cep}</InfoText>
      <InfoText>Cidade: {aluno.cidade}</InfoText>
      <InfoText>Estado: {aluno.estado}</InfoText>

      <SubTitle>Cursos Matriculados</SubTitle>
      {aluno.cursos.length > 0 ? (
        <CoursesList>
          {aluno.cursos.map(curso => (
            <CourseItem key={curso.id}>{curso.nome}</CourseItem>
          ))}
        </CoursesList>
      ) : (
        <InfoText>Este aluno não está matriculado em nenhum curso.</InfoText>
      )}
    </Container>
  );
};

export default AlunoDetailPage;
