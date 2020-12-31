import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Athletes from '../pages/Athletes';
import AthleteEdit from '../pages/AthleteEdit';
import AthletePayment from '../pages/AthletePayment';
import AthleteReferralGroup from '../pages/AthleteReferralGroup';
import AthletePhysicalExam from '../pages/AthletePhysicalExam';
import CreateAthlete from '../pages/CreateAthlete';
import Subscriptions from '../pages/Subscriptions';
import SubscriptionEdit from '../pages/SubscriptionEdit';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/cadastrar" component={SignUp} />
    <Route path="/alunos" component={Athletes} isPrivate exact />
    <Route path="/aluno-detalhes" component={AthleteEdit} isPrivate />
    <Route path="/novoaluno" component={CreateAthlete} isPrivate />
    <Route path="/planos" component={Subscriptions} isPrivate />
    <Route path="/plano-detalhes" component={SubscriptionEdit} isPrivate />
    <Route
      path="/alunos/:id/mensalidades"
      component={AthletePayment}
      isPrivate
    />
    <Route
      path="/aluno/:id/avaliacao"
      component={AthletePhysicalExam}
      isPrivate
    />
    <Route
      path="/aluno-indicacoes"
      component={AthleteReferralGroup}
      isPrivate
    />
  </Switch>
);

export default Routes;
