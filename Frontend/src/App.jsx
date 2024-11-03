import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout';
import Landing from './pages/Landing';
import CarDetails from './pages/CarDetails';
import Login from './pages/Login';
import CarDetailsForm  from "./pages/CarDetailsForm"
import DeleteCarDetails from './pages/DeleteCarDetails';
import Dashboard from './pages/Dashboard';
import AddNoticeImage  from './pages/AddNoticeImage'
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import CustomerEnquiry from './pages/CustomerEnquiry';
import CostReport from './pages/CostReport';
  const router = createBrowserRouter([
    {
      path:"/",
      element:(
        <Layout>
          <Landing/>
        </Layout>
      )
    },
    {
      path:"car/:id",
      element:(
        <Layout>
          <CarDetails/>
        </Layout>
      )


    },{
      path:"/admin",
      element:(
        <Layout>
          <Login/>
        </Layout>
      )
    },
    {
      path:"/dashboard",
      element:(
        <Layout>
          <Dashboard/>
        </Layout>
      )
    },
    {
      path:"/dashboard/carDetailsForm",
      element:(
        <Layout>
          <CarDetailsForm/>
        </Layout>
      )
    },
    {
      path:"/dashboard/DeleteCarDetails",
      element:(
        <Layout>
          <DeleteCarDetails/>
        </Layout>
      )
    },
    {
      path:"/dashboard/customerEnquiry",
      element:(
        <Layout>
          <CustomerEnquiry/>
        </Layout>
      )
    },
    {
      path:"/dashboard/addNoticeImage",
      element:(
        <Layout>
          <AddNoticeImage/>
        </Layout>
      )
      
    },
    {
      path:"/costReport/:id",
      element:(
        <Layout>
          <CostReport/>
        </Layout>
      )
    },
    {
      path: "*",
      element: () => <h1>Page Not Found</h1>
    }

    
  ])

  function App() {
      return (
      <>
        <>
        <ToastContainer />
          <RouterProvider router={router} />
        </>
      </>
    )
  }

  export default App
