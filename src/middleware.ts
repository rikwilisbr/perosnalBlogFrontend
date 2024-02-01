import { createMiddleware } from 'next-easy-middlewares';
import DashboardMiddleware from './middlewares/dashboard.middleware';
import LoginMiddleware from './middlewares/login.middleware';
import AdminMiddleware from './middlewares/admin.middleware';



const middlewares = {
    '/admin/dashboard': DashboardMiddleware,
    '/admin/login': LoginMiddleware,
    '/admin': AdminMiddleware
}
export const middleware = createMiddleware(middlewares);

export const config = {
  matcher: ['/admin/dashboard', '/admin/login', '/admin'],
}