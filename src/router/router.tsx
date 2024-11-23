import { Home } from '@/page/home';
import { Login } from '@/page/login'
import { createBrowserRouter } from 'react-router-dom';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/signin',
    element: <Login />
  }
])
