// pages/index.js

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import logoImage from './pages/logo.png'; // Update the path accordingly
import backgroundImage from './pages/logo.png'; // Update the path accordingly

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={logoImage} alt="Logo" width={1165} height={351} />
      </div>
      <main className={styles.main} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>Welcome to UNIVIBES Admin Dashboard</h1>
          <p className={styles.description}>
            Your platform for organizing events and managing auditoriums in the VIT.
          </p>
          <div className={styles.buttonContainer}>
            <Link href="/pages/auth/signin">
              <div className={styles.ctaButton}>Login</div>
            </Link>
            <Link href="/pages/auth/signup">
              <div className={styles.ctaButton}>Signup</div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
