import { format } from 'date-fns/format';

export const formatDate = (date: string) => format(new Date(date), 'LLL do');
