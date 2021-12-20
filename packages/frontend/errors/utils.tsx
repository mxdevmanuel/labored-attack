import { AxiosError } from 'axios';
import HttpClient from '@data/httpclient';
import isEmpty from 'lodash/isEmpty';
import capitalize from 'lodash/capitalize';

const queryErrorRegex = /\(([A-z0-9]+)\)=\(([A-z0-9]+)\)(.*)/;

export const httpErrorExtractor = ({
  response,
}: AxiosError): JSX.Element | string => {
  const status = response?.status;
  const data = response?.data;

  let mtch: RegExpMatchArray | null;
  switch (status) {
    case HttpClient.HttpErrors.CONFLICT:
      mtch = (data.detail as string)?.match(queryErrorRegex) ?? [];
      if (isEmpty(mtch)) return data.detail;
      return (
        <p>
          {capitalize(mtch[1])} <span className="font-semibold">{mtch[2]}</span>{' '}
          {mtch[3]}
        </p>
      );
    default:
      return 'Unexpected Error';
  }
};
