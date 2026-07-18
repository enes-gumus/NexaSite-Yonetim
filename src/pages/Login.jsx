import { useState } from "react";
import useAuth from "../hooks/useAuth";


function Login() {


  const {
    signIn
  } = useAuth();



  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");





  async function handleLogin(e) {

    e.preventDefault();


    try {


      await signIn(
        username,
        password
      );


    }
    catch (error) {


      console.log(
        "LOGIN ERROR:",
        error
      );


      console.log(
        "RESPONSE:",
        error.response
      );


      alert(

        error.response?.data?.detail ||

        "Giriş başarısız"

      );


    }

  }






  return (

    <div className="login-page">


      <div className="login-box">


        <div className="login-header">

          <h1>
            🏢
          </h1>

          <h2>
           NexaSite Yönetim
          </h2>


          <p>
            Yönetici Paneli
          </p>


        </div>





        <form onSubmit={handleLogin}>


          <input

            type="text"

            placeholder="Kullanıcı adı"

            value={username}

            onChange={(e)=>
              setUsername(e.target.value)
            }

          />



          <input

            type="password"

            placeholder="Şifre"

            value={password}

            onChange={(e)=>
              setPassword(e.target.value)
            }

          />





          <button type="submit">

            Giriş Yap

          </button>



        </form>



      </div>



    </div>

  );

}


export default Login;
