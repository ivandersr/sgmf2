import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import api from '../../services/apiClient';
import { formatDate } from '../../utils/formatDate';
import { PaymentsTable, PaymentRow, Container } from './styles';

interface Payment {
  id: string;
  value: string;
  paymentDate: Date;
  nextDueDate: Date;
  athlete_id: string;
}

const AthletePayments: React.FC = () => {
  const { pathname } = useLocation();
  const [payments, setPayments] = useState<Payment[]>([]);
  const history = useHistory();

  const regex = /^(\/[a-z-]*\/)([a-z|A-Z|0-9-]*)(\/[a-z-]*)$/;
  const splitUri = regex.exec(pathname);

  if (!splitUri) {
    history.push('/alunos');
  }

  useEffect(() => {
    if (splitUri) {
      api.get(`/payments/byathlete`,
        {
          params:
          {
            athlete_id: `${splitUri[2]}`
          }
        }).then(response => {
          setPayments(response.data)
        });
    }
  }, [splitUri]);

  return (
    <Container>
      <PageHeader
        title="Pagamentos anteriores"
      />
      <PaymentsTable>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Data de pagamento</th>
            <th>Vencimento</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <PaymentRow key={payment.id}>
              <td>{payment.value}</td>
              <td>{formatDate(payment.paymentDate)}</td>
              <td>{formatDate(payment.nextDueDate)}</td>
            </PaymentRow>
          ))}
        </tbody>
      </PaymentsTable>
    </Container>
  );
};

export default AthletePayments;
