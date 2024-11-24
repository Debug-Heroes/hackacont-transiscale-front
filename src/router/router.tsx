import { AppLayout } from '@/_layout/app/AppLayout';
import { AuthLayout } from '@/_layout/app/AuthLayout';
import { Home } from '@/page/home';
import { Login } from '@/page/login'
import { SignUp } from '@/page/signup';
import { Simulation } from '@/page/simulation';
import { createBrowserRouter } from 'react-router-dom';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/', element: <Home />
      },
      {
        path: '/simulation', element: <Simulation />
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/signin', element: <Login />
      },
      {
        path: '/signup', element: <SignUp />
      }
    ]
  },
])
