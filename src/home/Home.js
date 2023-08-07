import React from 'react'
import HomeNav from '../navigations/HomeNav'
import Footer from '../footer/Footer'

const Home = () => {
    return (
        <>
            <HomeNav />
            <div style={{ width: '100%', height: '95vh', background: '#f3f6f7' }}></div>
            <Footer />
        </>
    )
}

export default Home