import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiDollarSign, FiFileText } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../hooks/toast';
import api from '../../services/apiClient';

import { Container, Content } from './styles';

interface SubscriptionCreateData {
  title: string;
  value: number;
}

const AthleteEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SubscriptionCreateData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          title: Yup.string().required('Título obrigatório'),
          value: Yup.string().required('Valor obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          title,
          value
        } = data;

        const formData = {
          title,
          value: Number(value),
        };

        await api.post('/subscriptions', formData);

        history.push('/planos');
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
      <PageHeader title="Cadastrar novo plano" />
      <Content>

        <h3>Dados do plano</h3>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Input name="title" icon={FiFileText} placeholder="Título do plano" />
          <Input name="value" icon={FiDollarSign} placeholder="Valor (R$)" />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default AthleteEdit;
