import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Container, Content } from './styles';
import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Academia Mulher e Forma" />
      <form action="">
        <h1>Faça seu login</h1>
        <input type="text" placeholder="Usuário" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
        <a href="forgot">Esqueci minha senha</a>
      </form>
      <a href="conta">
        <FiLogIn />
        Criar Conta
      </a>
    </Content>
  </Container>
);

export default SignIn;
