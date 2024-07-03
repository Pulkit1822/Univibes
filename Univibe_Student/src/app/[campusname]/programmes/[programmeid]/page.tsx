"use client"
import React from 'react'
import { BsShare } from 'react-icons/bs'
import { BsFillStarFill } from 'react-icons/bs';
import './ProgrammePage.css'
import ProgrammeCarousel from '@/components/programmecarousel/ProgrammeCarousel';


import 'swiper/css';
import 'swiper/css/pagination';
import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link';


const ProgrammePage = () => {
    const pathname = usePathname()
    const { programmeid } = useParams()
   
    const [programme, setProgramme] = React.useState<any>(null)
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
   

    React.useEffect(() => {
        getProgramme()
    }, [])

    return (
        <>
            {
                programme &&
                <div className='programmepage'>
                    <div className='c1' style={{
                        backgroundImage: `url(${programme.landscapeImgUrl})`
                    }}>
                        <div className='c11'>
                            <div className='left'>
                                <div className='programme_poster'
                                    style={{
                                        backgroundImage: `url(${programme.portraitImgUrl})`
                                    }}
                                >
                                </div>
                                <div className='programme_details'>
                                    <p className='title'>
                                        {programme.title}
                                    </p>
                                    
                                    <Link
                                        href={`${pathname}/buytickets`}
                                        className='linkstylenone'
                                    >
                                        <button className='bookbtn'>Book Tickets</button>
                                    </Link>

                                </div>
                            </div>
                            <div className='right'>

                                <button className='sharebtn'><BsShare className='shareicon' />Share</button>
                            </div>
                        </div>
                    </div>
                    <div className='description_title'>
                        <p>Description: </p>
                    </div>
                    <p className='description'>
                        {programme.description}
                    </p>

                     <div className='other_programs'>
                        <p>Checkout other programs from this campus: </p>
                    </div>

                    <div className='c2' >
                        <ProgrammeCarousel />
                    </div>

                   

                </div>
            }
        </>
    )
}

export default ProgrammePage