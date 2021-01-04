import React, { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../hooks/toast';
import api from '../../services/apiClient';
import Select from '../../components/Select';

import { Container, Content } from './styles';

interface Athlete {
  id: string;
  subscription_id: string;
}

interface Subscription {
  id: string;
  title: string;
}

interface AthleteSubUpdateData {
  subscription_id: string;
}

const AthleteSubscriptionEdit: React.FC = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [athlete, setAthlete] = useState<Athlete>({} as Athlete);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const regex = /^(\/[a-z-]*\/)([a-z|A-Z|0-9-]*)(\/[a-z-]*)$/;
  const splitUri = regex.exec(pathname);

  if (!splitUri) {
    history.push('/alunos');
  }

  useEffect(() => {
    if (splitUri) {
      api.get(`/athletes/${splitUri[2]}`).then((response) => {
        setAthlete(response.data);
      });
      api.get('/subscriptions?page=0&pageSize=100').then((response) => {
        setSubscriptions(response.data.subscriptions);
      });
    }
  }, [splitUri]);

  const subscriptionOptions = useMemo(() => (
    subscriptions.map(subscription => ({
      value: subscription.id,
      label: subscription.title,
    }))
  ), [subscriptions]);


  const handleSubmit = useCallback(
    async (data: AthleteSubUpdateData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          subscription_id: Yup.string().required('Plano obrigratório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`/athletes/subscriptions/${athlete.id}`, data);

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
    [addToast, athlete.id, history],
  );

  return (
    <Container>
      <PageHeader title="Atualizar plano" />
      <Content>

        <h3>Escolha novo plano</h3>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Select
            name="subscription_id"
            options={subscriptionOptions}
            defaultValue={{ value: '', label: 'Selecione o plano' }}
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default AthleteSubscriptionEdit;
