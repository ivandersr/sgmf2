import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiFileText, FiEdit3 } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../hooks/toast';
import api from '../../services/apiClient';

import { Container, Content } from './styles';

interface AthleteGroup {
  id: string;
  title: string;
  description: number;
}

interface AthleteGroupEditData {
  title: string;
  description: number;
}

const SubscriptionEdit: React.FC = () => {
  const { search } = useLocation();
  const athleteGroupId = search.substring(1);
  const [athleteGroup, setAthleteGroup] = useState<AthleteGroup>();

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: AthleteGroupEditData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          title: Yup.string().required('Título obrigatório'),
          description: Yup.string().required('Descrição obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`/athletegroups/${athleteGroupId}`, data);

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
    [addToast, athleteGroupId, history],
  );

  useEffect(() => {
    api.get(`/athletegroups/${athleteGroupId}`).then(response => {
      setAthleteGroup(response.data);
    });
  }, [athleteGroupId]);

  return (
    <Container>
      <PageHeader title="Detalhes da categoria" />
      {athleteGroup && (
        <Content>

          <h3>{athleteGroup.title}</h3>
          <Form
            ref={formRef}
            initialData={{
              title: athleteGroup.title,
              description: athleteGroup.description,
            }}
            onSubmit={handleSubmit}
          >
            <Input
              name="title"
              icon={FiFileText}
              placeholder="Título da categoria"
            />
            <Input name="description" icon={FiEdit3} placeholder="Descrição" />
            <Button type="submit">Atualizar</Button>
          </Form>

        </Content>
      )}
    </Container>
  );
};

export default SubscriptionEdit;
