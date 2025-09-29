import React from 'react'
import AdminSideBar from './AdminSideBar'
import styles from './customStyle/AdminHome.module.css';
import Footer from '../components/Footer';

function Dashboard() {
  return (
    <>
    <div className={styles.adminHomeContainer}>
    <AdminSideBar/>
     
       <div className={styles.mainContent}>
          <header className={styles.header}>
            <h1>Welcome to the Admin Dashboard</h1>
          </header>
           <h2>Dashboard Overview</h2>
                    <p>This is where you can manage your application.</p>
  </div>
    </div>
  
    </>
  )
}

export default Dashboard
