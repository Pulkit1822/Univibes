"use client"
import React from 'react'
import Select from 'react-select'
import '../Popup.css'
import axios from 'axios'
import { toast } from 'react-toastify'
const LocationPopup = (
    {
        setShowLocationPopup
    }: {
        setShowLocationPopup: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {

    const [cities, setCities] = React.useState<any[]>([])


    const [selectedCampus, setSelectedCampus] = React.useState<any>(null)

    const getcities = async () => {
        const indianCities = [
            "VIT AP",
            "VIT Bhopal",
            "VIT Chennai",
            "VIT Vellore",

        ];

        const cities = indianCities.map((campus) => {
            return {
                label: campus,
                value: campus
            }

        })

        setCities(cities)
    }

    React.useEffect(() => {
        getcities()
    }, [])

    const handleSave = () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/changeCampus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                campus: selectedCampus
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    setShowLocationPopup(false)
                    window.location.reload()
                }
            })
            .catch((err) => {
                toast(err.message, {
                    type: 'error'
                })
                console.log(err)
            })
    }

    return (
        <div className='popup-bg'>
            <div className='popup-cont'>
                <select
                    className='select'
                    onChange={(e) => {
                        setSelectedCampus(e.target.value)
                    }}
                >
                    <option value="" disabled selected>Select your campus</option>
                    {
                        cities.map((campus: any) => {
                            return <option key={campus.value} value={campus.value}>{campus.label}</option>
                        })
                    }
                </select>

                <button className='btn'
                    onClick={handleSave}
                >Save</button>
            </div>
        </div>
    )
}

export default LocationPopup