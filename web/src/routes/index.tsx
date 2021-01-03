import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Athletes from '../pages/Athletes';
import AthleteEdit from '../pages/AthleteEdit';
import AthleteReferralGroup from '../pages/AthleteReferralGroup';
import AthletePhysicalExam from '../pages/AthletePhysicalExam';
import CreateAthlete from '../pages/CreateAthlete';
import Subscriptions from '../pages/Subscriptions';
import SubscriptionEdit from '../pages/SubscriptionEdit';
import CreateSubscription from '../pages/CreateSubscription';
import AthleteGroups from '../pages/AthleteGroups';
import AthleteGroupEdit from '../pages/AthleteGroupEdit';
import CreateAthleteGroup from '../pages/CreateAthleteGroup';
import CreateAthletePayment from '../pages/CreateAthletePayment';
import AthletePayments from '../pages/AthletePayments';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/cadastrar" component={SignUp} />
    <Route path="/alunos" component={Athletes} isPrivate exact />
    <Route path="/aluno-detalhes" component={AthleteEdit} isPrivate />
    <Route path="/novoaluno" component={CreateAthlete} isPrivate />
    <Route path="/planos" component={Subscriptions} isPrivate />
    <Route path="/novoplano" component={CreateSubscription} isPrivate />
    <Route path="/plano-detalhes" component={SubscriptionEdit} isPrivate />
    <Route path="/categorias" component={AthleteGroups} isPrivate />
    <Route path="/novacategoria" component={CreateAthleteGroup} isPrivate />
    <Route path="/categoria-detalhes" component={AthleteGroupEdit} isPrivate />
    <Route
      path="/alunos/:id/pagar-mensalidade"
      component={CreateAthletePayment}
      isPrivate
      exact
    />
    <Route
      path="/alunos/:id/mensalidades-pagas"
      component={AthletePayments}
      isPrivate
      exact
    />
    <Route
      path="/aluno/:id/avaliacao"
      component={AthletePhysicalExam}
      isPrivate
      exact
    />
    <Route
      path="/aluno-indicacoes"
      component={AthleteReferralGroup}
      isPrivate
    />
  </Switch>
);

export default Routes;
