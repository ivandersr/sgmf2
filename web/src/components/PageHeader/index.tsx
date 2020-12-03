import React from 'react';
import { Container } from './styles';
import logo from '../../assets/logo.svg';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => (
  <Container>
    <img src={logo} alt="Academia Mulher e Forma" />
    <h1>{title}</h1>
  </Container>
);

export default PageHeader;
