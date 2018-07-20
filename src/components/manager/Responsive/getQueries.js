export function getQueries(container, breakpoints) {
  return {
    xs: container.innerWidth < breakpoints.xs,
    sm: container.innerWidth >= breakpoints.sm,
    md: container.innerWidth >= breakpoints.md,
    lg: container.innerWidth >= breakpoints.lg,
    xl: container.innerWidth >= breakpoints.xl,
    xll: container.innerWidth >= breakpoints.xll,
    width: container.innerWidth,
    height: container.innerHeight,
  };
}
