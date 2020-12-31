import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiFileText, FiDollarSign } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../hooks/toast';
import api from '../../services/apiClient';

import { Container, Content } from './styles';

interface Subscription {
  id: string;
  title: string;
  value: number;
}

interface SubscriptionEditData {
  title: string;
  value: number;
}

const SubscriptionEdit: React.FC = () => {
  const { search } = useLocation();
  const subscriptionId = search.substring(1);
  const [subscription, setSubscription] = useState<Subscription>();

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SubscriptionEditData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          title: Yup.string().required('Título obrigatório'),
          value: Yup.string().required('Valor obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { title, value } = data;

        const formData = {
          title,
          value: Number(value),
        };

        await api.put(`/subscriptions/${subscriptionId}`, formData);

        history.push('/alunos');
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
    [addToast, subscriptionId, history],
  );

  useEffect(() => {
    api.get(`/subscriptions/${subscriptionId}`).then(response => {
      setSubscription(response.data);
    });
  }, [subscriptionId]);

  return (
    <Container>
      <PageHeader title="Detalhes do plano" />
      {subscription && (
        <Content>

          <h3>{subscription.title}</h3>
          <Form
            ref={formRef}
            initialData={{
              title: subscription.title,
              value: subscription.value,
            }}
            onSubmit={handleSubmit}
          >
            <Input name="title" icon={FiFileText} placeholder="Título do plano" />
            <Input name="value" icon={FiDollarSign} placeholder="Valor (R$)" />
            <Button type="submit">Atualizar</Button>
          </Form>

        </Content>
      )}
    </Container>
  );
};

export default SubscriptionEdit;
