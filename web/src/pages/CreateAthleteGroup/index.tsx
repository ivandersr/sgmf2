import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiEdit3, FiFileText } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../hooks/toast';
import api from '../../services/apiClient';

import { Container, Content } from './styles';

interface AthleteGroupCreateData {
  title: string;
  description: string;
}

const CreateAthleteGroup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: AthleteGroupCreateData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          title: Yup.string().required('Título obrigatório'),
          description: Yup.string().required('Descrição obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/athletegroups', data);

        history.push('/categorias');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na operação',
          description:
            'Houve um erro na atualização de dados. Tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <PageHeader title="Cadastrar nova categoria" />
      <Content>

        <h3>Dados da categoria</h3>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Input
            name="title"
            icon={FiFileText}
            placeholder="Título da Categoria"
          />
          <Input name="description" icon={FiEdit3} placeholder="Descrição" />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateAthleteGroup;
