import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';

const WeeklyOffs = () => {
  const [weeklyOffs, setWeeklyOffs] = useState([]);
  const [newWeeklyOff, setNewWeeklyOff] = useState({ staff: '', day_of_week: '' });
  const [userData, setUserData] = useState(null); // Logged-in user data
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch logged-in user details
        const userResponse = await axiosInstance.get('/api/users/');
        setUserData(userResponse.data.user_data);

        // Fetch weekly-offs data
        const response = await axiosInstance.get('/api/roster/weekly-offs/');
        setWeeklyOffs(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleAddWeeklyOff = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/roster/weekly-offs/', newWeeklyOff);
      setWeeklyOffs([...weeklyOffs, response.data]);
      setNewWeeklyOff({ staff: '', day_of_week: '' });
      setSuccess('Weekly off added successfully!');
    } catch (err) {
      setError('Failed to add weekly off.');
    }
  };

  return (
    <center>
    <div>
      <h2>Weekly Offs</h2>

      {/* Success and Error Messages */}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Weekly Offs List */}
      <h3>Existing Weekly Offs</h3>
        {/* Show Post Form Only If Logged-in User is a Manager */}
        {userData?.role === 'manager' && (
          <form onSubmit={handleAddWeeklyOff} style={{ marginTop: '20px' }}>
            <input
              type="number"
              placeholder="Staff ID"
              value={newWeeklyOff.staff}
              onChange={(e) => setNewWeeklyOff({ ...newWeeklyOff, staff: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Shift ID"
              value={newWeeklyOff.shift}
              onChange={(e) => setNewWeeklyOff({ ...newWeeklyOff, shift: e.target.value })}
              required
            />
            <select
              value={newWeeklyOff.day_of_week}
              onChange={(e) => setNewWeeklyOff({ ...newWeeklyOff, day_of_week: e.target.value })}
              required
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <button type="submit">Add Weekly Off</button>
          </form>
        )}
      <ul style={{ width: '35%', textAlign: 'left' }}>
        {weeklyOffs.length > 0 ? (
          weeklyOffs.map((off) => (
            <li key={off.id}>
               <strong>Username:</strong> {off.staff.username} - <strong>Day:</strong> {off.day_of_week} - <strong>Shift start:</strong> {off.shift.id}
            </li>
          ))
        ) : (
          <p>No weekly offs available.</p>
        )}
      </ul>

    </div>
    </center>
  );
};

export default WeeklyOffs;
