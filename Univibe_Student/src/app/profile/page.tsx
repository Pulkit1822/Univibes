"use client"
import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [bookings, setBookings] = React.useState<any>(null);
  const [user, setUser] = React.useState<any>(null);

  const getBookings = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/programme/getuserbookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setBookings(data.data);
        } else {
          console.log(data);
        }
      });
  };

  const getUserData = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setUser(data.data);
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBooking = async (bookingId: string) => {
    setBookings((prevBookings: any) =>
      prevBookings.filter((booking: any) => booking._id !== bookingId)
    );
  };

  React.useEffect(() => {
    getBookings();
    getUserData();
  }, []);

  return (
    <div className='profile'>
      <h1 className='head'>Profile Section</h1>
      <div className='user'>
        <h2>My Details</h2>
        <div className='details'>
          <div className='detail'>
            <h3>Email</h3>
            <p>{user?.email}</p>
          </div>
          <div className='detail'>
            <h3>Campus</h3>
            <p>{user?.campus}</p>
          </div>
        </div>
      </div>
      <div className='bookings'>
        <h2>My Bookings</h2>
        <div className='details'>
          {bookings?.map((booking: any) => (
            <div className='booking' key={booking._id}>
              <div className='detail'>
                <h3>Programme</h3>
                <p>{booking.programmeId.title}</p>
              </div>
              <div className='detail'>
                <h3>Auditorium</h3>
                <p>{booking.auditoriumId.username}</p>
              </div>
              <div className='detail'>
                <h3>Seats</h3>
                <p>
                  {booking.seats.map((seat: any, index: any) => (
                    <span key={index}>{seat.seat_id}, </span>
                  ))}
                </p>
              </div>
              <div className='detail'>
                <h3>Price</h3>
                <p>{booking.totalPrice}</p>
              </div>
              <div className='detail'>
                <h3>Payment Type</h3>
                <p>{booking.paymentType}</p>
              </div>
              <div className='detail'>
                <h3>Payment Id</h3>
                <p>{booking.paymentId}</p>
              </div>
              <div className='detail'>
                <h3>Show Date</h3>
                <p>{booking.showDate}</p>
              </div>
              <div className='detail'>
                <h3>Show Time</h3>
                <p>{booking.showTime}</p>
              </div>
              <div className='detail'>
                <button
                  className='delete-button'
                  onClick={() => deleteBooking(booking._id)}
                >
                  Delete 🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
