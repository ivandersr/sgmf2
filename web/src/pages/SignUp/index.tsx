import React, { useCallback, useRef } from 'react';
import {
  FiChevronLeft,
  FiLock,
  FiPhone,
  FiSmile,
  FiUser,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/apiClient';

interface SignUpFormData {
  name: string;
  phoneNumber: string;
  login: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          phoneNumber: Yup.string()
            .required('Telefone Obrigatório')
            .min(8, 'Número de telefone muito curto')
            .test(
              'valid-phone',
              'Informe um número de telefone válido',
              (value) => {
                if (value) {
                  return /(\(?\d{2}\)?\s?)?(\d{4,5}\-?\d{4})/.test(value);
                }
                return false;
              }
            ),
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
              }
            )
            .min(6, 'No mínimo 6 caracteres'),
          password: Yup.string().min(6, 'No mínimo 6 caracteres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Usuário cadastrado com sucesso',
          description: 'Realize seu login e acesse seu dashboard',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao cadastrar usuário',
          description:
            'Ocorreu um erro ao realizar o cadastro. Tente novamente.',
        });
      }
    },
    [addToast, history]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Academia Mulher e Forma" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastre seu Usuário</h1>
            <Input name="name" icon={FiSmile} placeholder="Nome" />
            <Input name="phoneNumber" icon={FiPhone} placeholder="Telefone" />
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
