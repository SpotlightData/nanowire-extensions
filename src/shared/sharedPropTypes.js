import PropTypes from 'prop-types';

const history = PropTypes.shape({
  push: PropTypes.func,
});

const location = PropTypes.shape({
  search: PropTypes.string,
  pathname: PropTypes.string,
});

const matchWith = key =>
  PropTypes.shape({
    params: PropTypes.shape({
      [key]: PropTypes.string,
    }),
  });

const classes = list => {
  const spec = list.reduce(
    (dict, entry) => Object.assign(dict, { [entry]: PropTypes.string.isRequired }),
    {}
  );
  return PropTypes.shape(spec);
};

const actions = list => {
  const spec = list.reduce(
    (dict, entry) => Object.assign(dict, { [entry]: PropTypes.func.isRequired }),
    {}
  );
  return PropTypes.shape(spec);
};

const numOrString = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export const sharedPropTypes = {
  // Common prop-types
  history,
  matchWith,
  location,
  // Common
  classes,
  actions,
  numOrString,
};
