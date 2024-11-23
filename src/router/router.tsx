import { Home } from '@/page/home';
import { createBrowserRouter } from 'react-router-dom';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
])
