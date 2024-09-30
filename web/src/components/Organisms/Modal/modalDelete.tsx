import React from 'react';
import { ModalOverlay, ModalContainer, Button } from './styles';

interface ModalDeleteProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  studentName: string;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ open, onClose, onConfirm, studentName }) => {
  if (!open) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>Excluir Aluno</h2>
        <p>
          Tem certeza que deseja excluir o aluno <strong>{studentName}</strong>?
        </p>
        <Button
          type="button"
          onClick={onConfirm}
          style={{ backgroundColor: '#ff0000' }}
        >
          Confirmar
        </Button>
        <Button type="button" onClick={onClose}>
          Cancelar
        </Button>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ModalDelete;
