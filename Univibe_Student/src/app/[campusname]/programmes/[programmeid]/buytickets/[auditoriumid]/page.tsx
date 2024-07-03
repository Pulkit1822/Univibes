"use client"
import React from 'react'
import './SelectSeat.css'
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const SelectSeatPage  = () => {

    const pathname = usePathname()
    const params = useParams()
    const searchParams = useSearchParams()

    const date = searchParams.get('date')
    const { programmeid, campusname, auditoriumid } = params
    console.log(programmeid, campusname, auditoriumid)




    const [auditorium, setAuditorium] = React.useState<any>(null)
    const [selectedTime, setSelectedTime] = React.useState<any>(null)

    const getschedules = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/programme/schedulebyprogramme/${auditoriumid}/${date}/${programmeid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(response => {
                if (response.ok) {
                    console.log(response.data)
                    setAuditorium(response.data)
                    setSelectedTime(response.data.programmeSchedulesforDate[0])
                }
                else {
                    console.log(response)
                }
            })
            .catch(err => console.log(err))

    }

    const [programme, setProgramme] = React.useState<any>(null)


    const getProgramme = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/programme/programmes/${programmeid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log('programme', data.data)
                    setProgramme(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getschedules()
        getProgramme()
    }, [])


    const [selectedSeats, setSelectedSeats] = React.useState<any[]>([])




    const selectdeselectseat = (seat: any) => {
        console.log(seat)
        const isselected = selectedSeats.find((s: any) => (
            s.row === seat.row &&
            s.col === seat.col &&
            s.seat_id === seat.seat_id
        ))

        if (isselected) {
            setSelectedSeats(selectedSeats.filter((s: any) => (
                s.row !== seat.row ||
                s.col !== seat.col ||
                s.seat_id !== seat.seat_id
            )))
        }

        else {
            setSelectedSeats([...selectedSeats, seat])
        }
    }


    const generateSeatLayout = () => {
        const x = auditorium.programmeSchedulesforDate.findIndex((t: any) => t.showTime === selectedTime.showTime)
     
        let notavailableseats = auditorium.programmeSchedulesforDate[x].notAvailableSeats


        return (
            <div>
                {auditorium.auditorium.seats.map((seatType, index) => (
                    <div className="seat-type" key={index}>
                        <h2>{seatType.type} - Rs. {seatType.price}</h2>
                        <div className='seat-rows'>
                            {seatType.rows.map((row, rowIndex) => (
                                <div className="seat-row" key={rowIndex}>
                                    <p className="rowname">{row.rowname}</p>
                                    <div className="seat-cols">
                                        {row.cols.map((col, colIndex) => (


                                            <div className="seat-col" key={colIndex}>
                                                {col.seats.map((seat, seatIndex) => (
                                                    // console.log(seat),

                                                    <div key={seatIndex}>
                                                        {
                                                            notavailableseats.find((s: any) => (
                                                                s.row === row.rowname &&
                                                                s.seat_id === seat.seat_id &&
                                                                s.col === colIndex
                                                            )) ?
                                                                <span className='seat-unavailable'>
                                                                    {seatIndex + 1}
                                                                </span>
                                                                :
                                                                <span className={
                                                                    selectedSeats.find((s: any) => (
                                                                        s.row === row.rowname &&
                                                                        s.seat_id === seat.seat_id &&
                                                                        s.col === colIndex
                                                                    )) ? "seat-selected" : "seat-available"
                                                                }
                                                                    onClick={() => selectdeselectseat({
                                                                        row: row.rowname,
                                                                        col: colIndex,
                                                                        seat_id: seat.seat_id,
                                                                        price: seatType.price
                                                                    })}
                                                                >
                                                                    {seatIndex + 1}
                                                                </span>

                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <br /> <br /> <br />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };


    const handleBooking = () => {


        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/programme/bookticket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                showTime: selectedTime.showTime,
                showDate: date,
                programmeId: programmeid,
                auditoriumId: auditoriumid,
                seats: selectedSeats,
                totalPrice: selectedSeats.reduce((acc, seat) => acc + seat.price, 0),
                paymentId: '123456789',
                paymentType: 'online'
            })

        })
            .then(res => res.json())
            .then(response => {
                if (response.ok) {
                    toast.success('Booking Successful')
                    console.log(response)
                }
                else {
                    console.log(response)
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='selectseatpage'>
            {
                programme && auditorium &&
                <div className='s1'>
                    <div className='head'>
                        <h1>{programme.title}</h1>
                    </div>
                </div>
            }

            {
                auditorium &&
                <div className="selectseat">
                    <div className='timecont'>
                        {
                            auditorium.programmeSchedulesforDate.map((time: any, index: number) => (
                                <h3 className={selectedTime?._id === time._id ? 'time selected' : 'time'} 
                                onClick={() => {
                                    setSelectedTime(time)
                                    setSelectedSeats([])
                                }} key={index}>
                                    {time.showTime}
                                </h3>
                            ))
                        }
                    </div>
                    <div className='indicators'>
                        <div>
                            <span className='seat-unavailable'></span>
                            <p>Not available</p>
                        </div>
                        <div>
                            <span className='seat-available'></span>
                            <p>Available</p>
                        </div>
                        <div>
                            <span className='seat-selected'></span>
                            <p>Selected</p>
                        </div>
                    </div>

                    {generateSeatLayout()}


                    <div className='totalcont'>
                        <div className='total'>
                            <h2>Total</h2>
                            <h3>Rs. {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)}</h3>
                        </div>

                        {}
                        <button
                            className='theme_btn1 linkstylenone'
                            onClick={handleBooking}
                        >Book Now</button>
                    </div>
                </div>
            }
            {}
        </div>
    )
}

export default SelectSeatPage 