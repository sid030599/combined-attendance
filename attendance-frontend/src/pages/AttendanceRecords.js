import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceRecords = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8000/api/attendance/records/', {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in the header
          },
        });

        setAttendanceRecords(response.data); // Update state with fetched attendance records
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch attendance records.');
        setLoading(false);
      }
    };

    fetchAttendanceRecords();
  }, []);

  if (loading) {
    return <p>Loading attendance records...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <center>
    <div>
      <h2>All Attendance Records</h2>
      {attendanceRecords.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Shift (Day & Time)</th>
              <th>Timestamp</th>
              <th>Image</th>
              <th>Valid Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.staff.username}</td>
                <td>
                  {record.shift.day_of_week} ({record.shift.start_time} - {record.shift.end_time})
                </td>
                <td>{new Date(record.timestamp).toLocaleString()}</td>
                <td>
                  {record.image ? (
                    <img
                      src={`${record.image}`}
                      alt="Attendance"
                      width="50"
                      height="50"
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>{record.marked_within_shift_time ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance records found.</p>
      )}
    </div>
    </center>
  );
};

export default AttendanceRecords;
