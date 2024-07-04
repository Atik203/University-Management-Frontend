import { ReactNode } from "react";

export interface TRouteItem {
  path: string;
  element: ReactNode;
}

export interface TUserPath {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
}

export const routeGenerator = (items: TUserPath[]) => {
  const routes = items.reduce((acc: TRouteItem[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path as string,
          element: child.element,
        });
      });
    }
    return acc;
  }, []);

  return routes;
};
