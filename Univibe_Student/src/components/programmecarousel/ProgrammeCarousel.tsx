import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { ProgrammeCardType } from '@/types/types';
import ProgrammeCard from './ProgrammeCard';

const ProgrammeCarousel = () => {

    const [user, setUser] = React.useState<any>(null)
    const getuser = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                console.log(response)
                if(response.ok){
                    setUser(response.data)
                }
                else{
                    window.location.href = "/auth/signin"
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }

    
    const [programmes, setProgrammes] = React.useState<ProgrammeCardType[]>([])

    const getProgrammes = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/programme/programmes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.ok){
                    console.log(data)
                    setProgrammes(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getProgrammes()
        getuser()
    }, [])
    return (
        <div className='sliderout'>
            {
                programmes && user && 
                <Swiper
                slidesPerView={1}
                spaceBetween={1}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 2,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 2,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                        spaceBetween: 2,
                    },
                    '@1.50': {
                        slidesPerView: 6,
                        spaceBetween: 2,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    programmes.map((Programme) => {
                        return (
                            <SwiperSlide key={Programme._id}>
                                <ProgrammeCard 
                                    Programme={Programme}
                                    user={user}
                                />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            }
        </div>
    )
}

export default ProgrammeCarousel