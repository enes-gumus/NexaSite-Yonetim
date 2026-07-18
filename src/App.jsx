import "./App.css";


import {
  AuthProvider
} from "./context/AuthContext";


import useAuth from "./hooks/useAuth";


import {
  Routes,
  Route
} from "react-router-dom";


import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";


import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Payments from "./pages/Payments";
import PaymentStatus from "./pages/PaymentStatus";
import Reports from "./pages/Reports";
import MemberDetail from "./pages/MemberDetail";
import Login from "./pages/Login";
import Settings from "./pages/Settings";




function ProtectedLayout(){


  const {
    isAuthenticated
  } = useAuth();




  if(!isAuthenticated){

    return <Login />;

  }





  return (

    <div className="app">


      <Header />


      <div className="layout">


        <Sidebar />


        <main className="content">


          <Routes>


            <Route
              path="/"
              element={<Dashboard />}
            />


            <Route
              path="/members"
              element={<Members />}
            />


            <Route
              path="/members/:id"
              element={<MemberDetail />}
            />


            <Route
              path="/payments"
              element={<Payments />}
            />


            <Route
              path="/settings"
              element={<Settings />}
            />


            <Route
              path="/payment-status"
              element={<PaymentStatus />}
            />


            <Route
              path="/reports"
              element={<Reports />}
            />


          </Routes>


        </main>


      </div>


    </div>

  );

}





function App(){


  return (

    <AuthProvider>

      <Routes>

        <Route
          path="*"
          element={<ProtectedLayout />}
        />

      </Routes>


    </AuthProvider>

  );

}


export default App;
