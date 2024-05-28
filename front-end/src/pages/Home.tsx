import './Home.css';
import '../assets/fonts/fontawesome-free-6.5.2/css/all.min.css';

import logo from '../assets/images/logo.png';
import epm from '../assets/images/expert-management.png';
import banner0201 from '../assets/images/banner0201.png';
import banner0202 from '../assets/images/banner0202.png';
import banner0203 from '../assets/images/banner0203.png';
import banner03 from '../assets/images/banner03.png';
import banner0401 from '../assets/images/banner0401.png';
import banner0402 from '../assets/images/banner0402.png';
import banner0403 from '../assets/images/banner0403.png';

const Home = () => {
    return (
        <>
            <header>
                <div className="header-top  display-flex">
                    <div className="left-top  display-flex">
                        <div className="left-top-item  display-flex">
                            <i className="fa-solid fa-square-envelope"></i>
                            <p>Email Address: example@gmail.com</p>
                        </div>
                        <div className="left-top-item  display-flex">
                            <i className="fa-solid fa-map-location-dot"></i>
                            <p>Office Address: Ho Chi Minh City, Vietnam</p>
                        </div>
                    </div>
                    <div className="right-top display-flex">
                        <a href="">
                            <div className="account right-top  display-flex">
                                <i className="fa-solid fa-user"></i>
                                <p>Account</p>
                            </div>
                        </a>

                        <form action="" id="search-box">
                            <input type="text" id="search-text" placeholder="Search" required />
                            <button id="search-button">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="header-bottom">
                    <div className="left-bottom  display-flex">
                        <a href="">
                            <img src={logo} alt="logo" />
                        </a>
                        <div className="menu-item  display-flex">
                            <a href="">Home</a>
                            <a href="">Pages</a>
                            <a href="">Services</a>
                            <a href="">Projects</a>
                            <a href="">Blog</a>
                            <a href="">Contact Us</a>
                        </div>
                    </div>

                    <div className="right-bottom  display-flex">
                        <a href="" className="display-flex centered">
                            <i className="fa-regular fa-comments chat-button"></i>
                        </a>
                        <div>
                            <p style={{ fontWeight: 'bold' }}>Have any Question?</p>
                            <p>+0 123 456 789</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="first-banner">
                <div className="display-flex centered">
                    <div style={{ marginLeft: '225px' }}>
                        <p id="head-text" className="none-padding-margin">
                            Hr is about People
                        </p>
                        <h1 id="body-text" className="none-padding-margin">
                            Human
                            <span style={{ color: '#0AADEB' }}>Resource</span> <br />
                            Solution Partner
                        </h1>

                        <div className="first-banner-col01-row02  display-flex">
                            <a href="">
                                <div className="contact-button display-flex">
                                    <p className="none-padding-margin">Contact Us</p>
                                </div>
                            </a>
                            <div className="display-flex">
                                <a href="" className="display-flex centered">
                                    <i className="fa-solid fa-circle-play play-button"></i>
                                </a>
                                <div className="display-flex centered contact-button-title">
                                    <p>How We Work</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="display-flex" id="first-banner-picture">
                    <img src={epm} alt="expert management" />
                </div>
            </div>

            <div className="second-banner">
                <div className="second-banner-item">
                    <div className="display-flex banner-number centered">
                        <img src={banner0201} alt="Second banner item 01." />
                        <p>01</p>
                    </div>
                    <div style={{ margin: '0px 10px', marginBottom: '10px' }}>
                        <p id="head-content">Compensation Consulting</p>
                        <p id="body-content">We provide broad menu employment services for a companies.</p>
                    </div>
                    <a href="">
                        <div className="rectangle display-flex centered">
                            <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                    </a>
                </div>

                <div className="second-banner-item">
                    <div className="display-flex banner-number centered">
                        <img src={banner0202} alt="Second banner item 02." />
                        <p>02</p>
                    </div>
                    <div style={{ margin: '0px 10px', marginBottom: '10px' }}>
                        <p id="head-content">Leadership Training</p>
                        <p id="body-content">We provide broad menu employment services for a companies.</p>
                    </div>
                    <a href="">
                        <div className="rectangle display-flex centered">
                            <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                    </a>
                </div>

                <div className="second-banner-item">
                    <div className="display-flex banner-number centered">
                        <img src={banner0203} alt="Second banner item 03." />
                        <p>03</p>
                    </div>
                    <div style={{ margin: '0px 10px', marginBottom: '10px' }}>
                        <p id="head-content">Talent Acquisition</p>
                        <p id="body-content">We provide broad menu employment services for a companies.</p>
                    </div>
                    <a href="">
                        <div className="rectangle display-flex centered">
                            <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                    </a>
                </div>

                <div className="second-banner-background">
                    <img src={banner03} alt="third-banner" />
                    <div className="display-flex centered background-text">
                        <div id="left-text" className="display-flex centered">
                            <i className="fa-solid fa-quote-right"></i>
                            <div>
                                <p>
                                    Train people quickly well with e-business. So they highly efficient manufactured
                                    products.
                                </p>
                                <p>--- Richard Branson</p>
                            </div>
                        </div>

                        <div id="vertical-line"></div>

                        <div id="right-text">
                            <p>
                                Our consultants believe in the value that you manage your regulatory compliance,
                                policies, and procedures. We have specialist for managed employee performance,comparable
                                to internal HR function.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="third-banner">
                <div className="third-banner-top">
                    <p id="third-banner-top-first-text">Who are you</p>
                    <p id="third-banner-top-second-text" className="none-padding-margin">
                        Why choose HR consulting <br />
                        <span style={{ color: '#0AADEB' }}>Services Company</span>
                    </p>
                </div>

                <div className="display-flex centered third-banner-bottom">
                    <div className="third-banner-bottom-left">
                        <img src={banner0401} alt="The 4st Banner." />
                    </div>

                    <div className="third-banner-bottom-right">
                        <p>
                            Our advisers provides a broad menu service that identifies the task requirements in the
                            organization job and designs the task description with skill requirements for the task.
                        </p>

                        <div className="display-flex centered">
                            <img src={banner0402} alt="The 4st Banner item 01." />
                            <p>
                                {' '}
                                <span>Strategic</span> <br /> <br />
                                Partners We believe in the value that our functions added to a business. Our strategic
                                partners that specialist role for HR is success of a business.
                            </p>
                        </div>

                        <div className="display-flex centered">
                            <img src={banner0403} alt="The 4st Banner item 02." />
                            <p>
                                {' '}
                                <span> Corporate Programs</span> <br /> <br />
                                Corporate Programs are that added our functions to a business. Our Strategic Partners
                                that specialist role for HR is success of a business.
                            </p>
                        </div>

                        <p>
                            Get intrigued about our service pricing? <a href="">Learn More</a>
                        </p>
                    </div>
                </div>
            </div>

            <footer>
                <div className="footer-top display-flex">
                    <div className="display-flex centered footer-top-left">
                        <a className="display-flex centered" href="">
                            <i className="fa-regular fa-calendar-check"></i>
                        </a>
                        <p>Call adviser for Emphires HR outsourcing service business</p>
                    </div>

                    <a href="">
                        <div className="display-flex centered footer-top-right">
                            <p>Book a consultants</p>
                        </div>
                    </a>
                </div>

                <div className="display-flex centered footer-bottom">
                    <p>Copyright © 2021 Emphires All Rights Reserved</p>
                    <a href="">Privacy & Policy</a>
                    <a href="">Conditions</a>
                    <a href="">Refund Policy</a>
                </div>
            </footer>

            <div id="backtop">
                <i className="fa-solid fa-circle-chevron-up"></i>
            </div>
        </>
    );
};

export default Home;
