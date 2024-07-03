"use client";
import React from 'react';
import './schedule.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Schedule {
  auditoriumId: string;
  programmeId: string;
  showTime: string;
  showDate: string;
}

interface Auditorium {
  _id: string;
  name: string;
  location: string;
  seats: number[];
  campus: string;
  auditoriumType: string;
}

interface Programme {
  _id: string;
  title: string;
  description: string;
  portraitImgUrl: string;
  portraitImg: File | null;
  landscapeImgUrl: string;
  landscapeImg: File | null;
  theme: string[];
}

const Page: React.FC = () => {
  const [schedule, setSchedule] = React.useState<Schedule>({
    auditoriumId: '',
    programmeId: '',
    showTime: '',
    showDate: '',
  });

  const [campus, setCampus] = React.useState('');
  const [auditoriums, setAuditoriums] = React.useState<Auditorium[]>([]);
  const [programmes, setProgrammes] = React.useState<Programme[]>([]);

  const getProgrammes = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/programme/programmes`);
      const data = await res.json();
      setProgrammes(data.data);
    } catch (error) {
      console.error('Error fetching programmes:', error);
    }
  };

  React.useEffect(() => {
    getProgrammes();
  }, []);

  const getAuditoriumsByCampus = async () => {
    try {
      if (campus === '') {
        toast.error('Please select a campus');
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/programme/auditoriumsbycampus/${campus.toLowerCase()}`
      );
      const data = await res.json();
      setAuditoriums(data.data);
    } catch (error) {
      console.error('Error fetching auditoriums:', error);
    }
  };

  const createSchedule = async () => {
    try {
      if (!schedule.auditoriumId || !schedule.programmeId || !schedule.showTime || !schedule.showDate) {
        toast.error('Please fill all the fields');
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/programme/addprogrammescheduletoauditorium`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(schedule),
      });

      const data = await res.json();
      if (data.ok) {
        toast.success('Schedule created successfully');
      } else {
        toast.error('Schedule creation failed');
      }
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
  };

  return (
    <div className="formpage">
      <ToastContainer />

      <h1 className="page-title">Create Schedule</h1>
      <p className="page-description">Schedule your event with ease</p>

      <div className="datetime-inputs">
        <div className="date-picker">
          <label htmlFor="showDate">Select Date:</label>
          <input
            type="date"
            name="showDate"
            id="showDate"
            onChange={(e) => setSchedule({ ...schedule, showDate: e.target.value })}
          />
        </div>

        <div className="time-picker">
          <label htmlFor="showTime">Select Time:</label>
          <input
            type="time"
            name="showTime"
            id="showTime"
            onChange={(e) => setSchedule({ ...schedule, showTime: e.target.value })}
          />
        </div>
      </div>

      <div className="campussearch">
        <input
          type="text"
          name="campus"
          id="campus"
          placeholder="Campus"
          value={campus}
          onChange={(e) => setCampus(e.target.value)}
        />
        <button onClick={getAuditoriumsByCampus}>Search</button>
      </div>

      <div className="items">
        <h1>Auditoriums:</h1>
        {auditoriums?.map((auditorium, index) => (
          <div
            className={schedule.auditoriumId === auditorium._id ? 'item selected' : 'item'}
            key={index}
            onClick={() => setSchedule({ ...schedule, auditoriumId: auditorium._id })}
          >
            <p>{auditorium.name}</p>
            <p>{auditorium.location}</p>
            <p>{auditorium.campus}</p>
            <p>{auditorium.auditoriumType}</p>
          </div>
        ))}
      </div>

      <div className="items">
        <h1>Programmes:</h1>
        {programmes?.map((programme, index) => (
          <div
            className={schedule.programmeId === programme._id ? 'item selected' : 'item'}
            key={index}
            onClick={() => setSchedule({ ...schedule, programmeId: programme._id })}
          >
            <p>{programme.title}</p>
            <p>{programme.description}</p>
            <p>{programme.theme}</p>
          </div>
        ))}
      </div>

      <button onClick={createSchedule}>Save Schedule</button>
    </div>
  );
};

export default Page;

/* Add the rest of your CSS styles here */
