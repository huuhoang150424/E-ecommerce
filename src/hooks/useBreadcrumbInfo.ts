import { useLocation, useRoutes } from 'react-router-dom';
import { Route, routes } from '@/router/MainRouter';


const findRouteByPath = (routes: any[], path: string) => {
  for (const route of routes) {
    const routePath = route.path.replace(/\/\*$/, '');
    const fullPath = `${routePath}${path}`;
    const routeRegex = new RegExp(`^${routePath.replace(/:\w+/g, '[^/]+')}`);
    
    if (routeRegex.test(fullPath)) {
      return route;
    }
    if (route.children) {
      for (const child of route.children) {
        const childPath = `${route.path.replace(/\/\*$/, '')}${child.path}`;
        const childRegex = new RegExp(`^${childPath.replace(/:\w+/g, '[^/]+')}`);
        
        if (childRegex.test(path)) {
          return child;
        }
      }
    }
  }
  return null;
};




export const useBreadcrumbInfo = () => {
  const location = useLocation();
  const matchedRoutes = useRoutes(routes);
  const getBreadcrumbName = (path: string) => {
    const route = findRouteByPath(routes, path);
    if (route) {
      return route.breadcrumbName;
    }
    return '';
  };

  return {
    breadcrumbName: getBreadcrumbName(location.pathname),
    path: location.pathname,
  };
};
