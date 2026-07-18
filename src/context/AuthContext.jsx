import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";


import {
  login
} from "../services/authService";




export const AuthContext = createContext();





export function AuthProvider({
  children
}) {


  const [token, setToken] = useState(
    localStorage.getItem("token")
  );


  const [user, setUser] = useState(null);







  async function signIn(
    username,
    password
  ) {


    const data = await login(
      username,
      password
    );


    console.log(
      "LOGIN DATA:",
      data
    );



    localStorage.setItem(
      "token",
      data.access_token
    );


    setToken(
      data.access_token
    );


  }







  function logout(){


    localStorage.removeItem(
      "token"
    );


    setToken(null);


    setUser(null);


  }







  useEffect(() => {


    if(token){


      setUser({

        authenticated:true

      });


    } else {


      setUser(null);


    }


  }, [token]);









  return (

    <AuthContext.Provider

      value={{


        token,


        user,


        signIn,


        logout,


        isAuthenticated: !!token


      }}

    >

      {children}

    </AuthContext.Provider>

  );

}







export function useAuth(){


  return useContext(
    AuthContext
  );


}
