import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FiCalendar, FiDollarSign, FiPlus } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import { Container, Content } from './styles';
import api from '../../services/apiClient';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

interface PaymentData {
  value: number;
  paymentDate: string;
  monthsPaid: number;
}


const CreateAthletePayment: React.FC = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [athleteId, setAthleteId] = useState<string>('');

  const regex = /^(\/[a-z-]*\/)([a-z|A-Z|0-9-]*)(\/[a-z-]*)$/;
  const splitUri = regex.exec(pathname);

  if (!splitUri) {
    history.push('/alunos');
  }

  useEffect(() => {
    if (splitUri) {
      setAthleteId(splitUri[2]);
    }
  }, [splitUri]);

  const handleSubmit = useCallback(
    async (data: PaymentData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          value: Yup.string().required('Valor obrigatório'),
          paymentDate: Yup.string()
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
          monthsPaid: Yup.string().required(
            'Informe a quantidade de meses pagos'
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          value,
          paymentDate,
          monthsPaid,
        } = data;

        const formData = {
          value: Number(value),
          paymentDate,
          monthsPaid: Number(monthsPaid),
        };

        await api.post('/payments', { ...formData, athlete_id: athleteId });

        history.push(`/aluno-detalhes?${athleteId}`);
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
    [addToast, athleteId, history],
  );

  return (
    <Container>
      <PageHeader title="Novo pagamento" />
      <Content>

        <h3>Dados do pagamento</h3>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Input name="value" icon={FiDollarSign} placeholder="Valor (R$)" />
          <Input
            name="paymentDate"
            icon={FiCalendar}
            placeholder="Data de pagamento"
          />
          <Input
            name="monthsPaid"
            icon={FiPlus}
            placeholder="Número de meses pagos"
          />
          <Button type="submit">Efetuar pagamento</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateAthletePayment;
