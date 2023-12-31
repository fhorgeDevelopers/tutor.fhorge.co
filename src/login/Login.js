import React, { useState } from 'react'
import { useAuth } from '../contexts/Auth';
import style from './login.module.css';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png'
import { NotificationContainer } from 'react-notifications';
import Footer from '../footer/Footer';
import './login.module.css';
import HomeNav from '../navigations/HomeNav';



const Login = () => {
    const auth = useAuth();

    const [email, setEmail] = useState('instructorone');
    const [password, setPassword] = useState('QI200901');

    const handleLogin = (e) => {
        e.preventDefault();
        auth.logUserIn(email, password);
    }
    return (
        <>
            <NotificationContainer />
            <table style={{ width: '100%', height: '100vh', background: 'rgba(0, 135, 61, 0.51)' }}>
                <tbody>
                    <tr>
                        <td>
                            <HomeNav />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <div className='row justify-content-center align-items-center m-1' style={{ minHeight: 'calc(100vh - 56px)' }}>
                                    <div className='col-md-5'>
                                        <div className="card">
                                            <div className='card-body pt-4'>
                                                <Link to={'/'} >
                                                    <i className="fa fa-close text-danger" style={{ float: 'right' }}></i>
                                                </Link>
                                                <div className='m-2' style={{ textAlign: 'center' }}>
                                                    <img src={Logo} alt="Questence" width="200" />
                                                    <br />
                                                    <h3 className='m-3'>
                                                        LOG IN
                                                    </h3>
                                                </div>
                                                <form className={`${style.modalBody} modal-body m-5`} onSubmit={e => handleLogin(e)}>
                                                    <div className="form-group mb-3">
                                                        <label className="label w-100" htmlFor="email" style={{ textAlign: 'center' }}>
                                                            Username
                                                        </label>
                                                        <input type="text" name="text" id="email" required
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="form-control" value={email} placeholder="Email Address" aria-describedby="helpId" />
                                                    </div>
                                                    <div className="form-group mb-4">
                                                        <label className="label w-100" htmlFor="password" style={{ textAlign: 'center' }}>
                                                            Password
                                                        </label>
                                                        <input type="password" name="password" required
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            id="password" value={password} className="form-control" placeholder="Password" aria-describedby="helpId" />
                                                    </div>

                                                    <div className="form-group mb-3">
                                                        <button type="submit" className="btn bgPreview w-100" data-dismiss="modal">
                                                            Log in
                                                        </button>
                                                        <Link className="label w-100 nav-link mt-4" to={'/forgot-password'} style={{ fontSize: '12px', textAlign: 'center' }}>
                                                            Forgot Password
                                                        </Link>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Footer />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Login
