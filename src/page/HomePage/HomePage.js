import Logo from '../../Asset/bg-hero-section-getpro.webp';
import './Homepage.css';
function HomePage() {
    return (
        <div>
            <img alt='' src={Logo} className="background-section" />
            <div className='cart-intro'>
                <div className='mui-box'>
                    <div className='Slogan-getpro'>
                        Defeat Your
                        <span className='style-name'>
                            TOEIC
                            <sup className='sup'>®</sup>
                        </span>
                        Test Anxiety Right Now With
                    </div>
                    <div className='name-pro'>
                        <div className='style-name'>
                            TOEIC<sup className='sup'>®</sup>
                        </div>
                        TEST PRO
                    </div>
                </div>
            </div>
            <div class="home-statistical" style={{position:'fixed',}}>
                
            </div>
        </div>
    )
}
export default HomePage;