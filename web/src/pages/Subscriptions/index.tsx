import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Pagination from '../../components/Pagination';
import api from '../../services/apiClient';
import { formatValue } from '../../utils/formatValue';
import { SubscriptionsTable, SubscriptionRow, Container } from './styles';

interface Subscription {
  id: string;
  title: string;
  value: number;
}

const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [activePage, setActivePage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    api.get(`/subscriptions?page=${activePage}&pageSize=4`).then(response => {
      setSubscriptions(response.data.subscriptions);
      setTotalPages(response.data.pages);
    });
  }, [activePage]);

  return (
    <Container>
      <PageHeader
        title="Planos"
      />
      <SubscriptionsTable>
        <thead>
          <tr>
            <th>Plano</th>
            <th>Valor</th>
            <th style={{ visibility: 'hidden' }}>Botões</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map(subscription => (
            <SubscriptionRow key={subscription.id}>
              <td>{subscription.title}</td>
              <td>{formatValue(subscription.value)}</td>
              <td>
                <Link to={{
                  pathname: 'plano-detalhes',
                  search: subscription.id
                }}
                >
                  Detalhes
                </Link>
              </td>
            </SubscriptionRow>
          ))}
        </tbody>
      </SubscriptionsTable>
      <Pagination
        goToPage={setActivePage}
        totalPages={totalPages}
        activePage={activePage}
      />
    </Container>
  );
};

export default Subscriptions;
