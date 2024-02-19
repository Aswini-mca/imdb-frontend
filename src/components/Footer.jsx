import React from 'react'
import '../css/Footer.css'
import { useNavigate } from 'react-router-dom';

function Footer() {
    let date = new Date();
    const navigate = useNavigate()
    return (
        <div className='container-fluid text-light text-center'>
            <button className='btn btn-warning' onClick={()=>navigate('/login')}>Sign in for more access</button>
            <div className='social p-5'>
                <i className="fa-brands fa-tiktok social-hover"></i>
                <i className="fa-brands fa-instagram social-hover"></i>
                <i className="fa-brands fa-twitter social-hover"></i>
                <i className="fa-brands fa-youtube social-hover"></i>
                <i className="fa-brands fa-facebook social-hover"></i>
            </div>
            <div>
                <ul>
                    <li>Get the IMDB App</li>
                    <li>Help</li>
                    <li>Site Index</li>
                    <li>IMDBPro</li>
                    <li>Box Office Mojo</li>
                    <li>IMDB Developer</li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>Press Room</li>
                    <li>Advertising</li>
                    <li>Jobs</li>
                    <li>Conditions Of Use</li>
                    <li>Privacy Policy</li>
                    <li>Your Ads Privacy Choice</li>
                </ul>

            </div>
            <p className='p-2 m-2'>an <img src='https://m.media-amazon.com/images/G/31/social_share/amazon_logo._CB633266945_.png' height={20} alt='' /> company</p>
            <p className='p-2 m-2'>© 1990-{date.getFullYear()} by IMDb.com, Inc.</p>
        </div>
    )
}

export default Footer