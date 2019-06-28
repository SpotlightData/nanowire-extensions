export function transition(timing: number = 0.3) {
  const css = `all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1)`;
  return {
    '-webkit-transition': css,
    '-moz-transition': css,
    '-ms-transition': css,
    '-o-transition': css,
    transition: css,
  };
}
