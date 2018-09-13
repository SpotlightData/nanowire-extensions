import { pathOr } from 'ramda';

export const extractErrorText = (error, response) => {
  if (response) {
    return (
      pathOr(false, ['data', 'message'], response) ||
      pathOr(false, ['data', 'description'], response) ||
      pathOr(false, ['data', 'error'], response)
    );
  }
  return error.message || JSON.stringify(data);
};

export const extractBackendError = message => error => {
  const { response } = error;
  return {
    message,
    description: extractErrorText(error, response),
    type: pathOr(false, ['data', 'type'], response),
    raw: error.response,
  };
};
// export const extractErrorText = ({ response, statusText, data }) => {
//   if (response) {
//     return (
//       pathOr(false, ['message'], response) ||
//       pathOr(false, ['description'], response) ||
//       pathOr(false, ['error'], response)
//     );
//   }
//   return statusText || JSON.stringify(data);
// };

// export const extractBackendError = message => error => {
//   return {
//     message,
//     description: extractErrorText(error),
//     type: pathOr(false, ['response', 'type'], error),
//     raw: error,
//   };
// };
