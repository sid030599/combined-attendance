import React, { useRef, useState } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [image, setImage] = useState(null); // Holds the captured image as a File object
  const [shiftId, setShiftId] = useState('');
  const [cameraStarted, setCameraStarted] = useState(false); // Tracks whether the camera is active
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = () => {
    console.log("Starting camera...");
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraStarted(true);
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });
  };

  const captureSelfie = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!video || !video.srcObject) {
      alert("Camera not started. Please start the camera first.");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const file = new File([blob], `selfie_${timestamp}.jpg`, { type: 'image/jpeg' });
          setImage(file);

          // Stop the camera and clear video feed
          const stream = video.srcObject;
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
          video.srcObject = null;
          setCameraStarted(false);

          console.log("Captured file:", file);
          alert("Selfie captured successfully, and camera closed.");
        } else {
          console.error("Failed to capture image.");
          alert("Failed to capture selfie. Please try again.");
        }
      },
      'image/jpeg',
      1.0
    );
  };

  const submitAttendance = async () => {
    if (!image || !shiftId) {
      alert("Please capture a selfie and select a shift.");
      return;
    }

    const formData = new FormData();
    formData.append('shift', shiftId);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/attendance/records/',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert("Attendance submitted successfully!");
    } catch (err) {
      console.error("Error submitting attendance: ", err);
      alert("Failed to submit attendance.");
    }
  };

  return (
    <div>
      <h2>Attendance</h2>
      <div>
        {/* Display either video feed or captured image */}
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Captured Selfie"
            style={{ width: '300px', height: '300px', border: '2px solid green' }}
          />
        ) : (
          <video
            ref={videoRef}
            style={{ width: '300px', height: '300px', border: '2px solid red' }}
          ></video>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>
      <button
        style={{ margin: '10px' }}
        onClick={startCamera}
        disabled={cameraStarted || image} // Disable if camera is active or an image is captured
      >
        Start Camera
      </button>
      <button
        style={{ margin: '10px' }}
        onClick={captureSelfie}
        disabled={!cameraStarted} // Disable if camera is inactive
      >
        Capture Selfie
      </button>
      <div>
        <label htmlFor="shift">Shift ID:</label>
        <input
          type="text"
          id="shift"
          value={shiftId}
          onChange={(e) => setShiftId(e.target.value)}
        />
      </div>
      <button style={{ margin: '10px' }} onClick={submitAttendance}>
        Submit Attendance
      </button>
    </div>
  );
};

export default Attendance;
