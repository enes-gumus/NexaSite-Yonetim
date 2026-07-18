import useAuth from "../../hooks/useAuth";


function Header() {


    const {
        logout
    } = useAuth();




    function handleLogout(){

        logout();

    }





    return (

        <header className="header">


            <div>

                <h1>
                    NexaSite Yönetim
                </h1>


                <p>
                    Yönetici Paneli
                </p>

            </div>




            <button onClick={handleLogout}>

                Çıkış

            </button>



        </header>

    );

}


export default Header;
