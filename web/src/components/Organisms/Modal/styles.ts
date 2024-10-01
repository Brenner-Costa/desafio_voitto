import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 1001;

  h2 {
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background: white;
  cursor: pointer;

  &:focus {
    border-color: #0070f3; /* Altera a cor da borda ao focar */
    outline: none; /* Remove o contorno padrão */
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #005bb5;
  }
`;
