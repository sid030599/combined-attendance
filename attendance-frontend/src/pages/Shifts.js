import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';

const Shifts = () => {
  const [shifts, setShifts] = useState([]); // Stores the list of shifts
  const [staffId, setStaffId] = useState(''); // Staff ID for the new shift
  const [shiftId, setShifId] = useState(''); // Day of the week for the new shift
  const [startTime, setStartTime] = useState(''); // Staff ID for the new shift
  const [endTime, setEndTime] = useState(''); // Day of the week for the new shift
  const [usershifts, setUserShifts] = useState('');
  const [error, setError] = useState(''); // Error message
  const [success, setSuccess] = useState(''); // Success message
  const [userData, setUserData] = useState(null); // Logged-in user data

  // Fetch shifts and logged-in user data
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        // Fetch logged-in user data
        const userResponse = await axiosInstance.get('/api/users/');
        setUserData(userResponse.data.user_data);

        // Fetch shifts
        const shiftsResponse = await axiosInstance.get('/api/roster/shifts/');
        setShifts(shiftsResponse.data);
      } catch (err) {   
        console.error('Error fetching shifts:', err);
        setError('Failed to fetch data. Please try again.');
      }
    };

    fetchShifts();
  }, []);
 
  // Fetch shifts and logged-in user data
  useEffect(() => {
    const fetchUserShifts = async () => {
      try {
        // Fetch shifts
        const usershiftsResponse = await axiosInstance.get('/api/roster/usershifts/');
        setUserShifts(usershiftsResponse.data);
      } catch (err) {   
        console.error('Error fetching shifts:', err);
        setError('Failed to fetch data. Please try again.');
      }
    };

    fetchUserShifts();
  }, []);

  console.log(usershifts)
//   Handle creating a new shift
  const handleCreateShift = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axiosInstance.post('/api/roster/shifts/', {
        staff: staffId,
        start_time: startTime,
        end_time: endTime,
      });

      // Update the shifts list and reset the form
      setUserShifts([...usershifts, response.data]);
      setStaffId('');
      setStartTime('');
      setEndTime('');
      setSuccess('Shift created successfully!');
    } catch (err) {
      console.error('Error creating shift:', err);
      setError('Failed to create shift. Please check the details and try again.');
    }
  };

  // Handle creating a new shift
  const handleCreateUserShift = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axiosInstance.post('/api/roster/usershifts/', {
        staff: staffId,
        shift: shiftId,
      });

      // Update the shifts list and reset the form
      setShifts([...shifts, response.data]);
      setStaffId('');
      setShifId('');
      setSuccess('User Shift created successfully!');
    } catch (err) {
      console.error('Error creating shift:', err);
      setError('Failed to create shift. Please check the details and try again.');
    }
  };

  return (
    <center>
      <div>
        <h2>Shifts</h2>

        {/* Success and Error Messages */}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Form to Add Shift (Visible only to managers) */}
        {userData?.role === 'manager' && (
          <form onSubmit={handleCreateUserShift} style={{ marginBottom: '20px' }}>
            <input
              type="int"
              placeholder="staff"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              required
            />
            <input
              type="int"
              placeholder="shift"
              value={shiftId}
              onChange={(e) => setShifId(e.target.value)}
              required
            />
            <button type="submit">Add User Shift</button>
          </form>
        )}

        {/* Form to Add Shift (Visible only to managers) */}
        {userData?.role === 'manager' && (
          <form onSubmit={handleCreateShift} style={{ marginBottom: '20px' }}>
            <input
              type="time"
              placeholder="start time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <input
              type="time"
              placeholder="end time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
            <button type="submit">Add Shift</button>
          </form>
        )}

        {/* Users Shifts List */}
        <h3>Existing User Shifts</h3>
        {usershifts.length > 0 ? (
          <ul style={{ width: '40%', textAlign: 'left' }}>
            {usershifts.map((usershift) => (
              <li key={usershift.id}>
                <strong>User Shift Id:</strong> {usershift.id} <strong> - Username:</strong> {usershift.staff?.username || 'N/A'} <strong> - Start Time:</strong> {usershift.shift.start_time} <strong> - End Time:</strong> {usershift.shift.end_time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No user shifts available.</p>
        )}

        {/* Shifts List */}
        <h3>Existing Shifts</h3>
        {shifts.length > 0 ? (
          <ul style={{ width: '40%', textAlign: 'left' }}>
            {shifts.map((shift) => (
              <li key={shift.id}>
                <strong>Shift Id:</strong> {shift.id} <strong> - Start Time:</strong> {shift.start_time} <strong> - End Time:</strong> {shift.end_time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No shifts available.</p>
        )}
      </div>
    </center>
  );
};

export default Shifts;
