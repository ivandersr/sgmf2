import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, HeaderTitle, NavMenu, UserMenu } from './styles';
import logo from '../../assets/logo.svg';
import Button from '../Button';
import { useAuth } from '../../hooks/auth';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title
}) => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderTitle>
          <img src={logo} alt="Academia Mulher e Forma" />
          <h1>{title}</h1>
        </HeaderTitle>
        {user && (
          <UserMenu>
            <h2>
              Bem vindo(a),
            <br />
              {user.name}
            </h2>
            <Button onClick={signOut}>Sair</Button>
          </UserMenu>
        )}
      </Header>
      <NavMenu>
        <Link to="/alunos">Listar Alunos</Link>
        <Link to="/novoaluno">Cadastrar aluno</Link>
        <Link to="/planos">Listar Planos</Link>
        <Link to="/novoplano">Cadastrar Plano</Link>
        <Link to="/categorias">Listar Categorias</Link>
        <Link to="/novacategoria">Nova Categoria</Link>
      </NavMenu>
    </Container>
  );
}

export default PageHeader;
