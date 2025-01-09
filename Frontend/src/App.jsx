import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from "./context/SearchContext";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import CarDetails from "./pages/CarDetails";
import Login from "./pages/Login";
import CarDetailsForm from "./pages/CarDetailsForm";
import DeleteCarDetails from "./pages/DeleteCarDetails";
import Dashboard from "./pages/Dashboard";
import AddNoticeImage from "./pages/AddNoticeImage";
import CustomerEnquiry from "./pages/CustomerEnquiry";
import CostReport from "./pages/CostReport";
import EditVehicleDetailsForm from "./pages/EditVehicleDetailsForm";
import SellCarDetails from "./pages/SellCarDetails";
import DriverDashboard from "./pages/DriverDashboard";
import DriverOnsiteImagesAdd from "./components/DriverOnsiteImagesAdd";
import ProtectedRoute from "./Auth/ProtectedRoute";
import ProtectedUserRoute from "./Auth/ProtectedUserRoute";
import { Maintainance } from "./components/Maintainance";
import AddDriver from "./pages/AddDriver";
import AddEmployee from "./pages/AddEmployee";
import DocumentUpload from "./components/DocumentUpload";
import MiscellaneousCosts from "./pages/MiscellaneousCosts";
import AccountDetails from "./pages/AccountDetails";
import DocumentView from "./components/DocumentView";
import ContactUs from "./pages/ContactUs";
import MonthlyAccountDetails from "./pages/MonthlyAccountDetails";
import ActiveAccounts from "./pages/ActiveAccounts";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Landing />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <ContactUs />
      </Layout>
    ),
  },
  {
    path: "/car/:id",
    element: (
      <Layout>
        <CarDetails />
      </Layout>
    ),
  },
  {
    path: "/admin",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>


    ),
  },
  {
    path: "/AddEmployee",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin"]}>
          <Layout>
            <AddEmployee />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>


    ),
  },
  {
    path: "/AddDriver",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>
          <Layout>
            <AddDriver />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>


    ),
  },

  {
    path: "/driverdashboard",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["driver", "admin", "employee"]}>
          <Layout>
            <DriverDashboard />
          </Layout>
        </ProtectedUserRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/driverdashboard/onsiteVehicleImages",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["driver", "admin", "employee"]}>

          <Layout>
            <DriverOnsiteImagesAdd />
          </Layout>
        </ProtectedUserRoute >

      </ProtectedRoute>
    ),
  },
  ,
  {
    path: "/driverdashboard/drivermaintainance",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["driver", "admin", "employee"]}>

          <Layout>
            <Maintainance isDriver={true} />
          </Layout>
        </ProtectedUserRoute >

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/carDetailsForm",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>

          <Layout>
            <CarDetailsForm />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/DeleteCarDetails",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>

          <Layout>
            <DeleteCarDetails />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>

    ),
  },
  {
    path: "/dashboard/customerEnquiry",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>

          <Layout>
            <CustomerEnquiry />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/addNoticeImage",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>

          <Layout>
            <AddNoticeImage />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/sellCarDetails",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>

          <Layout>
            <SellCarDetails />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/addOfficeDocuments",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>

          <Layout>
            <DocumentUpload isOffice={true} />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/viewOfficeDocuments",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>

          <Layout>
            <DocumentView isOffice={true} />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/addOfficeDocuments",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>

          <Layout>
            <DocumentUpload />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/viewOfficeDocuments",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>

          <Layout>
            <DocumentView />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/ActiveAccounts",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin"]}>
          <Layout>
            <ActiveAccounts/>
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/costReport/:id",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>

          <Layout>
            <CostReport />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/costReport/:id/addAdminDoc",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin"]}>

          <Layout>
            <DocumentUpload />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/costReport/:id/viewAdminDoc",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin"]}>

          <Layout>
            <DocumentView />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/costReport/:id/addAdminDoc",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin"]}>

          <Layout>
            <DocumentUpload />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/costReport/:id/viewAdminDoc",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin"]}>

          <Layout>
            <DocumentView />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/edit/:id",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>

          <Layout>
            <EditVehicleDetailsForm />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard/miscellaneous-costs",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>

          <Layout>
            <MiscellaneousCosts />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>

    ),
  },
  {
    path: "dashboard/monthly-details",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>
          <Layout>
            <MonthlyAccountDetails/>
          </Layout>
        </ProtectedUserRoute>
      </ProtectedRoute>

    ),
  },
  {
    path: "dashboard/accountDetails",
    element: (
      <ProtectedRoute>
        <ProtectedUserRoute requiredRoles={["admin", "employee"]}>

          <Layout>
            <AccountDetails />
          </Layout>
        </ProtectedUserRoute>

      </ProtectedRoute>

    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <h1>Page Not Found</h1>
      </Layout>
    ),
  },

]);

function App() {
  return (
    <SearchProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </SearchProvider>
  );
}

export default App;
