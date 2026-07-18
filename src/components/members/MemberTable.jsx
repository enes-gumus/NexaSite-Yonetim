import { Link } from "react-router-dom";


function MemberTable({
  members,
  deleteMember,
  editMember,
}) {

  return (

    <section className="table-container">

      <table>

        <thead>

          <tr>

            <th>Üye Adı</th>

            <th>Daire</th>

            <th>Telefon</th>

            <th>İşlemler</th>

          </tr>

        </thead>



        <tbody>


          {members.length === 0 ? (

            <tr>

              <td
                colSpan="4"
                style={{
                  textAlign: "center"
                }}
              >

                Kayıtlı üye bulunamadı.

              </td>

            </tr>


          ) : (


            members.map((member) => (

              <tr key={member.id}>


                <td>
                  {member.name}
                </td>


                <td>
                  {member.apartment}
                </td>


                <td>
                  {member.phone}
                </td>



                <td>


                  <Link
                    to={`/members/${member.id}`}
                  >

                    <button>
                      Detay
                    </button>

                  </Link>



                  <button
                    onClick={() =>
                      editMember(member)
                    }
                  >

                    Düzenle

                  </button>



                  <button
                    onClick={() =>
                      deleteMember(member.id)
                    }
                  >

                    Sil

                  </button>


                </td>


              </tr>

            ))

          )}


        </tbody>


      </table>


    </section>

  );

}


export default MemberTable;
