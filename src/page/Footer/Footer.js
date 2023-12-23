import React from "react";
import './Footer.css'
import { Logo } from '../../Asset/Fb.png'
function Footer() {
    return (
        <div className="Footer">
            <div className="slogan">
                TOEIC® is a registered trademark of Educational Testing Service (ETS).<br/>
                <span>
                This web is not affiliated with or endorsed by Educational Testing Service.
                </span>
            </div>
            {/* <div className="social-main-panel">
                <div className="social-label">
                    Connect with us
                </div>
                <span>
                    
                </span>
                <div className="logo">
                    <img src={Logo}></img>
                </div>
            </div> */}
        </div>
    )
}
export default Footer