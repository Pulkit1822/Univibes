"use client"
import React from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import HomeSlider from '@/components/HomeSlider/HomeSlider'
import ProgrammeCarousel from '@/components/programmecarousel/ProgrammeCarousel'

export default function Home() {

  const checkLogin = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
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
        if (response.ok) {
        } else {
          window.location.href = "/auth/signin"
        }
      })
      .catch((error) => {
        window.location.href = "/auth/signin"

      })
  };

  React.useEffect(() => {
    checkLogin()
  }, [])
  return (
    <main className={styles.main}>
      <HomeSlider />
      <ProgrammeCarousel />
    </main>
  )
}
