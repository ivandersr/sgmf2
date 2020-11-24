import React from 'react';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

const Athletes: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <>
      <h1>Alunos</h1>
      <Button onClick={() => signOut()}>
        Sair
      </Button>
    </>
  );
};

export default Athletes;
