import React, { useState, useEffect } from "react";
import API from "../../../services/api";
import { useToast } from "../../../context/useToast";
import { useNavigate } from "react-router-dom";
import styles from "./AdminTable.module.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async (page = 1) => {
      try {
        const response = await API.get("/user_admin/listuser", {
          params: {
            page,
            search: debounceSearch,
          },
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
  }, [showToast, currentPage, debounceSearch]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const handleNavigate = (userId) => {
    navigate(`/admin/dashboard/recipelist/${userId}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h5 className={styles.title}>Users List</h5>
          <span className={styles.badge}>{totalUsers} Users</span>
        </div>

        <div className={styles.searchWrap}>
          <input
            type="text"
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email or name"
          />
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Profile</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className={styles.empty}>
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
                        className={styles.avatar}
                      />
                    </td>
                    <td>{user.name || "No Name"}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          user.is_active ? styles.active : styles.blocked
                        }`}
                      >
                        {user.is_active ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={`${styles.btn} ${styles.btnPrimary}`}
                          onClick={() => handleNavigate(user.id)}
                        >
                          View
                        </button>
                        <button
                          className={`${styles.btn} ${
                            user.is_active ? styles.btnDanger : styles.btnSuccess
                          }`}
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

        <div className={styles.footer}>
          <small className={styles.pageText}>
            Page {currentPage} of {totalPages}
          </small>
          <div className={styles.pagination}>
            <button
              className={`${styles.btn} ${styles.btnOutline}`}
              disabled={!previousPageUrl}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <button
              className={`${styles.btn} ${styles.btnOutline}`}
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
