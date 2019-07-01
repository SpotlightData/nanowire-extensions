import * as yup from 'yup';
import { validateSchema } from './schema';

type RouteSpec = {
  path: string;
  component: string;
  children: Array<RouteSpec>;
  isDefault: boolean;
};

export type FlatRouteSpec = {
  path: string | boolean;
  component: string;
  key: string;
};

const routeScheme = yup
  .array()
  .of(
    yup.object({
      path: yup
        .string()
        .required()
        .test('path', '${path} is invalid', (path: string) => {
          const size = path.length;
          return size === 0 || size === 1 || (path[0] === '/' && path[size - 1] !== '/');
        }),
      component: yup.string().required(),
      children: yup.array().of(yup.lazy(() => routeScheme)),
      isDefault: yup.boolean().required(),
    })
  )
  .nullable(true);

export function route(
  path: string,
  component: string,
  children: Array<RouteSpec> = [],
  withSlash: boolean = false,
  isDefault: boolean = false
): RouteSpec {
  let p = path;
  if (typeof p === 'string') {
    p = withSlash ? path : '/' + path;
  }
  return {
    path: p,
    component,
    children,
    isDefault,
  };
}

// Should only do this in development
export function validateRouteSpec(spec: Array<RouteSpec>) {
  const error = validateSchema(routeScheme, spec);
  if (error) {
    console.log(spec);
    throw new Error(JSON.stringify(error));
  }
}

function flattenRoute(prefix: string, route: RouteSpec, list: Array<FlatRouteSpec>) {
  if (route.isDefault) {
    list.push({
      path: false,
      component: route.component,
      key: 'default',
    });
    return list;
  }
  const fullPath = prefix + route.path;
  list.push({ path: fullPath, component: route.component, key: fullPath });

  route.children.reduce((list, item) => flattenRoute(fullPath, item, list), list);
  return list;
}

export function flattenRoutes(spec: Array<RouteSpec>): Array<FlatRouteSpec> {
  return spec.reduce((list, item) => flattenRoute('', item, list), []);
}
