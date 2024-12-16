import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const Dashboard = () => {
  const [userData, setUserData] = useState(null); // Logged-in user data
  const [staffData, setStaffData] = useState([]); // Staff user details
  const [newStaff, setNewStaff] = useState({
    username: "",
    email: "",
    role: "staff",
  }); // New staff data
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch logged-in user data and staff details
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch logged-in user data
        const userResponse = await axiosInstance.get("/api/users/");
        setUserData(userResponse.data.user_data);

        // Fetch staff data if user is a manager
        if (userResponse.data.user_data.role === "manager") {
          const staffResponse = await axiosInstance.get("/api/users/staff/");
          setStaffData(staffResponse.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Handle New Staff Submission
  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/users/staff/", newStaff);
      setStaffData([...staffData, response.data]);
      setNewStaff({ username: "", email: "", role: "staff" });
      setSuccess("Staff added successfully!");
    } catch (err) {
      setError("Failed to add staff. Please check the inputs.");
    }
  };

  // Handle Staff Deletion
  const handleDeleteStaff = async (staffId) => {
    try {
      await axiosInstance.delete(`/api/users/staff/${staffId}/`);
      setStaffData(staffData.filter((staff) => staff.id !== staffId));
      setSuccess("Staff deleted successfully!");
    } catch (err) {
      setError("Failed to delete staff.");
    }
  };
  console.log(staffData);
  return (
    <center>
      <div>
        <h2>Dashboard</h2>

        {/* Display logged-in user information */}
        {userData ? (
          <div>
            <h3>Welcome, {userData.username}!</h3>
            <p>Email: {userData.email || "Not provided"}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        {/* Show staff details and CRUD options if the user is a manager */}
        {userData?.role === "manager" && (
          <div>
            <h3>Staff Management</h3>
            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Staff Table */}
            <table
              border="1"
              cellPadding="10"
              cellSpacing="0"
              style={{ margin: "20px 0" }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffData.map((staff) => (
                  <tr key={staff.id}>
                    <td>{staff.id}</td>
                    <td>{staff.username}</td>
                    <td>{staff.email || "Not provided"}</td>
                    <td>{staff.role}</td>
                    <td>
                      <button onClick={() => handleDeleteStaff(staff.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add New Staff Form */}
            <form onSubmit={handleAddStaff} style={{ marginTop: "20px" }}>
              <input
                type="text"
                placeholder="Username"
                value={newStaff.username}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, username: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newStaff.email}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={newStaff.password}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, password: e.target.value })
                }
                required
              />
              <select
                value={newStaff.role}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, role: e.target.value })
                }
              >
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
              </select>
              <button type="submit">Add Staff</button>
            </form>
          </div>
        )}
      </div>
    </center>
  );
};

export default Dashboard;
