import React, {useState, useEffect} from "react";
import API from "../../services/api"

function UserList(){

    const [users, setUsers] = useState([]);

    useEffect(() => {
      let isMounted = true;

      const fetchUsers = async () => {
        try {
          const response = await API.get("/user_admin/listuser");
          console.log(response.data);

          if (isMounted) {
            setUsers(response.data.results || []);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchUsers();

      return () => {
        isMounted = false;
      };
    }, [])

    
     return (
    <div className="container mt-5">
      <div className="row">

        {users.map((user) => (
          <div className="col-md-4 mb-4" key={user.id}>
            
            <div className="card shadow-sm h-100">

              <div className="text-center p-3">
                <img
                  src={
                    user.image
                      ? `${user.image}`
                      : "https://via.placeholder.com/120"
                  }
                  alt="profile"
                  className="rounded-circle border"
                  width="120"
                  height="120"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="card-body text-center">

                <h5 className="card-title">
                  {user.name || "No Name"}
                </h5>

                <p className="text-muted">
                  {user.email}
                </p>

                <span
                  className={`badge ${
                    user.is_active
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {user.is_active
                    ? "Active"
                    : "Blocked"}
                </span>

              </div>

              <div className="card-footer bg-white border-0 d-flex justify-content-center gap-2 pb-3">

                <button className="btn btn-primary btn-sm">
                  View
                </button>

                <button
                  className={`btn btn-sm ${
                    user.is_active
                      ? "btn-danger"
                      : "btn-success"
                  }`}
                >
                  {user.is_active
                    ? "Block"
                    : "Unblock"}
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default UserList;
