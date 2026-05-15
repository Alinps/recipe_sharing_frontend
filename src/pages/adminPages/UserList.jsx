import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { useToast } from "../../context/useToast";

function UserList() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async (page = 1) => {
      try {
        const response = await API.get("/user_admin/listuser", {
          params: { page },
        });
        if (isMounted) {
          const results = response.data.results || [];
          setUsers(results);
          setTotalUsers(response.data.count || 0);
          setNextPageUrl(response.data.next || null);
          setPreviousPageUrl(response.data.previous || null);
          if (results.length > 0 && page === 1) {
            setPageSize(results.length);
          }
        }
      } catch (error) {
        let message = "Failed to fetch users";
        if (error.response?.data) {
          const data = error.response.data;
          if (data.error) {
            message = data.error;
          } else {
            const firstKey = Object.keys(data)[0];
            const value = data[firstKey];
            message = Array.isArray(value) ? value[0] : value;
          }
        }
        showToast(message, "error");
      }
    };

    fetchUsers(currentPage);

    return () => {
      isMounted = false;
    };
  }, [showToast, currentPage]);

  const toggleBlockState = async (id) => {
    setUpdatingUserId(id);
    try {
      const response = await API.patch(`/user_admin/togglestatus/${id}`);
      const { user_id, is_active, message } = response.data;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === user_id ? { ...user, is_active } : user
        )
      );

      showToast(message || "User status updated successfully", "success");
    } catch (error) {
      let message = "Failed to update user status";
      if (error.response?.data) {
        const data = error.response.data;
        if (data.error) {
          message = data.error;
        } else {
          const firstKey = Object.keys(data)[0];
          const value = data[firstKey];
          message = Array.isArray(value) ? value[0] : value;
        }
      }
      showToast(message, "error");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const totalPages = totalUsers > 0 ? Math.ceil(totalUsers / pageSize) : 1;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-semibold">Users List</h5>
          <span className="badge bg-secondary">{totalUsers} Users</span>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">Profile</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <img
                        src={user.image ? `${user.image}` : "https://via.placeholder.com/50"}
                        alt="profile"
                        className="rounded-circle border"
                        width="50"
                        height="50"
                        style={{ objectFit: "cover" }}
                      />
                    </td>
                    <td className="fw-medium">{user.name || "No Name"}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.is_active ? "bg-success" : "bg-danger"}`}>
                        {user.is_active ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-primary btn-sm">View</button>
                        <button
                          className={`btn btn-sm ${user.is_active ? "btn-danger" : "btn-success"}`}
                          onClick={() => toggleBlockState(user.id)}
                          disabled={updatingUserId === user.id}
                        >
                          {updatingUserId === user.id
                            ? "Updating..."
                            : user.is_active
                            ? "Block"
                            : "Unblock"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="card-footer bg-white d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Page {currentPage} of {totalPages}
          </small>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={!previousPageUrl}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={!nextPageUrl}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
