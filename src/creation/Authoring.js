import React, { useEffect } from 'react';
import style from './authoring.module.css'
import Courses from './members/Courses';
import Footer from '../footer/Footer';
import AuthoringHome from '../navigations/AuthoringHome';
import { useLocation } from 'react-router-dom';

const Authoring = () => {
    const location = useLocation();
    useEffect(() => {
        window.localStorage.removeItem('id')
    }, [location])
    return (
        <>
        
            <AuthoringHome />
            <div className={`${style.menu} container d-flex justify-content-between`}>
                <h4 className={style.menuTitle}>
                    My Courses
                </h4>
            </div>

            <Courses />


            <div className='bottomMargin'></div>
            <Footer />
        </>
    )
}

export default Authoring