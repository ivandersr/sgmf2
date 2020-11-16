import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content } from './styles';
import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Academia Mulher e Forma" />
      <form action="">
        <h1>Faça seu login</h1>
        <Input name="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />
        <Button name="submit">Entrar</Button>
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
