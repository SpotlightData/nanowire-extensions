export function getQueries(container) {
  return {
    xs: container.innerWidth < 576,
    sm: container.innerWidth >= 576,
    md: container.innerWidth >= 768,
    lg: container.innerWidth >= 992,
    xl: container.innerWidth >= 1200,
    xll: container.innerWidth >= 1600,
    width: container.innerWidth,
    height: container.innerHeight,
  };
}
