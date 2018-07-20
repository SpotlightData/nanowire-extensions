export const tryToExpect = (done, cb) => {
  try {
    cb();
    done();
  } catch (e) {}
};