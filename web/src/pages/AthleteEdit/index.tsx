import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/Button';

import { Container } from './styles';

interface Athlete {
  name: string;
  birthDate: Date;
}

const AthleteEdit: React.FC = () => {
  const { search } = useLocation();
  const athleteId = search.substring(1);
  const [athlete, setAthlete] = useState<Athlete>();

  return (
    <Container>
      <h1>Página de edição de atletas</h1>
      <Button onClick={() => console.log(athleteId)}>test</Button>
    </Container>
  );
};

export default AthleteEdit;
