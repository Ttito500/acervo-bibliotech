import { format, parse } from "date-fns";
import { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
registerLocale('ptBR', ptBR);

type Props = {
  dateString: string;
};

export const formatarData = (dateString: string, formatoEntrada = 'yyyy-MM-dd', formatoSaida = 'dd/MM/yyyy' ) => {
  if(!dateString) return null
  const data = parse(dateString, formatoEntrada, new Date());
  return format(data, formatoSaida);
}

const FormatDate: React.FC<Props> = ({ dateString }) => {

  if(!dateString) {
    return <span></span>;
  }

  const dataFormatada = formatarData(dateString);

  return <span>{dataFormatada}</span>;
};

export default FormatDate;
