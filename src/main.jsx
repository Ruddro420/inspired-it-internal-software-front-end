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
import Teachers from './routes/Page/Teachers/Teachers.jsx';
import { Login } from './components/app_components/Login.jsx';
import DashboardContent from './routes/Page/Dashboard/DashboardContent.jsx';
import AddTeacher from './routes/Page/Teachers/AddTeacher.jsx';


const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: '/dashboard/',
        element: <DashboardContent />
      },
      {
        path: '/dashboard/teachers',
        element: <Teachers />
      },
      {
        path: '/dashboard/add-teachers',
        element: <AddTeacher />
      },
      /*       {
              path: '/dashboard',
              element: <Dashboard/>
            },
            {
              path: '/teachers',
              element: <Teachers/>
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
            } */

    ],

  },
  {
    path: "/",
    element: <Login />,
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
