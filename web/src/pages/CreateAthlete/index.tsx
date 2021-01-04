import React, { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiPhone, FiStar, FiUser } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../hooks/toast';
import api from '../../services/apiClient';
import Select from '../../components/Select';

import { Container, Content } from './styles';

interface Subscription {
  id: string;
  title: string;
  value: number;
}

interface AthleteGroup {
  id: string;
  title: string;
  description: string;
}

interface AthleteCreateData {
  name: string;
  birthDate: Date;
  phoneNumber: string;
  subscriptionId: string;
  athleteGroupId: string;
}

const CreateAthlete: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [athleteGroups, setAthleteGroups] = useState<AthleteGroup[]>([]);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const subscriptionOptions = useMemo(() => (
    subscriptions.map(subscription => ({
      value: subscription.id,
      label: subscription.title,
    }))
  ), [subscriptions]);

  const athleteGroupOptions = useMemo(() => (
    athleteGroups.map(athleteGroup => ({
      value: athleteGroup.id,
      label: athleteGroup.title,
    }))
  ), [athleteGroups]);

  useEffect(() => {
    api.get('/subscriptions?page=0&pageSize=100').then((response) => {
      setSubscriptions(response.data.subscriptions);
    });
    api.get('/athletegroups').then((response) => {
      setAthleteGroups(response.data);
    });
  }, []);

  const handleSubmit = useCallback(
    async (data: AthleteCreateData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          phoneNumber: Yup.string().required('Telefone obrigatório'),
          birthDate: Yup.string()
            .required('Data de nascimeto obrigatória')
            .test(
              'valid-date',
              'Data deve ser no formato DD/MM/AAAA',
              value => {
                if (value) {
                  return /^\d{2}\/\d{2}\/\d{4}$/.test(value);
                }
                return false;
              },
            ),
          subscriptionId: Yup.string().required('Plano obrigratório'),
          athleteGroupId: Yup.string().required('Categoria obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          birthDate,
          phoneNumber,
          subscriptionId,
          athleteGroupId
        } = data;

        const formData = {
          name,
          birthDate,
          phoneNumber,
          subscription_id: subscriptionId,
          athlete_group_id: athleteGroupId,
        };

        await api.post('/athletes', formData);

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
    [addToast, history],
  );

  return (
    <Container>
      <PageHeader title="Cadastrar novo aluno" />
      <Content>

        <h3>Dados do aluno</h3>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="phoneNumber" icon={FiPhone} placeholder="Telefone" />
          <Input
            name="birthDate"
            icon={FiStar}
            placeholder="Data de Nascimento"
          />
          <Select
            name="subscriptionId"
            options={subscriptionOptions}
            defaultValue={{ value: '', label: 'Selecione o plano' }}

          />
          <Select
            name="athleteGroupId"
            options={athleteGroupOptions}
            defaultValue={{ value: '', label: 'Selecione a categoria' }}
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateAthlete;
