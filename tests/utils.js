import sid from 'shortid';

export const tryToExpect = (done, cb) => {
  try {
    cb();
    done();
  } catch (e) {}
};

export const makeMockFile = (type = 'pdf') => ({
  source: 'Local',
  name: sid.generate() + '.' + type,
  type,
  data: {},
  size: 20000,
});
