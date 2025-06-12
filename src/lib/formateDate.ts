import { format, parseISO } from 'date-fns';

const FormateDate = (date: string) => {
  const formattedDate = format(parseISO(date), 'dd MMM yyyy, hh:mm a');
  return formattedDate;
};

export default FormateDate;
