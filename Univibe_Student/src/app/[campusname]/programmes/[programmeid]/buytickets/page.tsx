"use client"
import React from 'react'
import DatePicker from "react-horizontal-datepicker";
import './BuyTicketsPage.css'
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation'

const BuyTicketsPage  = () => {
    const pathname = usePathname()
    const params = useParams()
    const [selectedDate, setSelectedDate] = React.useState<any>(new Date())
    const { programmeid, campusname } = params
    const [programme, setProgramme] = React.useState<any>(null)
    const [theatres, setTheatres] = React.useState<any>(null)
    console.log(programmeid)

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
                    console.log(data)
                    setProgramme(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getTheatres = async (date: string) => {
        let programmeId = programmeid
        let campus = campusname

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/programme/auditoriumsbyprogrammeschedule/${campus}/${date}/${programmeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setTheatres(data.data)
                }
                else {
                    console.log(data)
                }
            })
    }

    React.useEffect(() => {
        getProgramme()
    }, [])

    React.useEffect(() => {
        getTheatres(selectedDate)
    }, [selectedDate])
    return (
        <>
            {
                programme &&
                <div className='buytickets'>
                    <div className='s1'>
                        <div className='head'>
                            <h1>{programme.title} - {programme.language}</h1>
                        </div>
                        <DatePicker getSelectedDay={
                            (date: any) => {
                                console.log(date)
                                setSelectedDate(date)
                            }
                        }
                            endDate={100}
                            selectDate={
                                selectedDate
                            }
                            labelFormat={"MMMM"}
                            color={"#2d3371"}
                        />
                    </div>

                    {
                        theatres && theatres.length > 0 &&
                        <div className='auditoriums'>
                            {
                                theatres.map((auditorium, index) => {
                                    let auditoriumid = auditorium._id
                                    return (
                                        <div className='auditorium' key={index}>
                                            <div>
                                                <h2>{auditorium.name}</h2>
                                                <h3>{auditorium.location}</h3>
                                            </div>

                                            <Link href={`${pathname}/${auditoriumid}?date=${selectedDate}`} className='theme_btn1 linkstylenone'>Select</Link>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default BuyTicketsPage 