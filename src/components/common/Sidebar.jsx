import { Link } from "react-router-dom";


function Sidebar() {

  return (

    <aside className="sidebar">


      <h2>Menü</h2>


      <ul>


        <li>

          <Link to="/">
            📊 Dashboard
          </Link>

        </li>



        <li>

          <Link to="/members">
            👥 Üyeler
          </Link>

        </li>



        <li>

          <Link to="/payments">
            💰 Ödemeler
          </Link>

        </li>



        <li>

          <Link to="/payment-status">
            ✅ Ödeme Durumu
          </Link>

        </li>



        <li>

          <Link to="/reports">
            📄 Raporlar
          </Link>

        </li>



        <li>

          <Link to="/settings">
            ⚙️ Ayarlar
          </Link>

        </li>


      </ul>


    </aside>

  );

}


export default Sidebar;
