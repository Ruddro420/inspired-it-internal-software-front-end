import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { ThemeProvider } from "@/components/theme/theme-provider.jsx"
import Home from './routes/Home.jsx';
import Dashboard from './routes/Dashboard.jsx';
import Orders from './routes/Orders.jsx';
import Customers from './routes/Customers.jsx';
import Analytics from './routes/Analytics.jsx';
import Admin from './routes/Authentication/Admin.jsx';
import Staff from './routes/Authentication/Staff.jsx';
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/orders',
        element: <Orders/>
      },
      {
        path: '/customers',
        element: <Customers/>
      },
      {
        path: '/analytics',
        element: <Analytics/>
      },
      {
        path: '/admin_login',
        element: <Admin/>
      },
      {
        path: '/staff_login',
        element: <Staff/>
      }

    ]
  },
  
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
     <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>,
)
