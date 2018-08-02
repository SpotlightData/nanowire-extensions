const FUTURE_MAJOR_VERSION = '2.0.0';

export function injectStrings(message, strings) {
  return strings.reduce((acc, string) => acc.replace('%s', string), message);
}

export function deprecationWarning(format, strings, logger = console.warning) {
  if (!Array.isArray(strings)) {
    throw new Error('Expected strings to be an array');
  }
  logger(`${FUTURE_MAJOR_VERSION} WARNING: ` + injectStrings(format, strings));

  try {
    // This error was thrown as a convenience so that you can use this stack
    // to find the callsite that caused this warning to fire.
    throw new Error(message);
  } catch (x) {}
}
