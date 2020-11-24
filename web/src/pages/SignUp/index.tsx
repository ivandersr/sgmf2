import React, { useCallback, useRef } from 'react';
import {
  FiChevronLeft, FiLock, FiSmile, FiUser,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: Record<string, unknown>) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatório'),
        login: Yup.string()
          .required('Login Obrigatório')
          .test(
            'valid-login',
            'Utilize apenas letras minúsculas e números',
            (value) => {
              if (value) {
                return /^[a-z0-9]*$/.test(value);
              }
              return false;
            },
          )
          .min(6, 'No mínimo 6 caracteres'),
        password: Yup.string().min(6, 'No mínimo 6 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      const errors = getValidationErrors(error);
      formRef.current?.setErrors(errors);
    }
  }, []);
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Academia Mulher e Forma" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastre seu Usuário</h1>
            <Input name="name" icon={FiSmile} placeholder="Nome" />
            <Input name="login" icon={FiUser} placeholder="Login" />
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiChevronLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
