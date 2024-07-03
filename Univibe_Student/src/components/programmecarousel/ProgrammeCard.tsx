import React from 'react'
import { ProgrammeCardType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { BsFillStarFill } from 'react-icons/bs';
import './ProgrammeCard.css'

const ProgrammeCard = (data: any) => {
    const router = useRouter();
    const { _id, title, theme, rating, portraitImgUrl } = data.Programme;
    const { campus } = data.user;
    console.log(campus)

    return (
        <div
            className='programmecard'
            onClick={() => {
                router.push(`/${campus}/programmes/${_id}`)

            }}
        >
            <div className='programmeimg'
                style={{
                    backgroundImage: `url(${portraitImgUrl})`
                }}
            >
            </div>
            <div className='details'>
                <p className='title'>
                    {title}
                </p>
                <p className='type'>
                    {theme.join(", ")}
                </p>
            </div>
        </div>
    )
}

export default ProgrammeCard