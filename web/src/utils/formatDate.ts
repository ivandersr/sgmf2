import moment from 'moment';

export const formatDate = (date: Date): string => {
  return moment.utc(date).format('DD/MM/yyyy');
};
