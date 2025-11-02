import React from 'react'
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from 'react-icons/bi'

const Footer = () => {
  return (
    <>
    
    <footer className='footer'>
        <div className="f-info">
            <div className="f-info-socials">
                <a className='text-dark' href="#"><BiLogoFacebook /></a>
                <a className='text-dark' href="#"><BiLogoInstagram /></a>
                <a className='text-dark' href="#"><BiLogoTwitter /></a>
            </div>
            <div>&copy; Reesair Private Limited</div>
            <div className="f-info-links">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
            </div>
        </div>
    </footer>

    </>
  )
}

export default Footer