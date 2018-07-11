import { pathOr } from 'ramda';

export const extractErrorText = ({ response, statusText, data }) => {
  if (response) {
    return (
      pathOr(false, ['message'], response) ||
      pathOr(false, ['description'], response) ||
      pathOr(false, ['error'], response)
    );
  }
  return statusText || JSON.stringify(data);
};

export const extractBackendError = message => error => {
  return {
    message,
    description: extractErrorText(error),
    type: pathOr(false, ['response', 'type'], error),
    raw: error,
  };
};
