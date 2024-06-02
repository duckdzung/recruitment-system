import { useEffect } from 'react';
import styles from './Home.module.scss';
import '../../assets/fonts/fontawesome-free-6.5.2/css/all.min.css';
import clsx from 'clsx';

import backgroundImage from '../../assets/images/background.png';
import logo from '../../assets/images/logo.png';
import epm from '../../assets/images/expert-management.png';
import banner0201 from '../../assets/images/banner0201.png';
import banner0202 from '../../assets/images/banner0202.png';
import banner0203 from '../../assets/images/banner0203.png';
import banner03 from '../../assets/images/banner03.png';
import banner0401 from '../../assets/images/banner0401.png';
import banner0402 from '../../assets/images/banner0402.png';
import banner0403 from '../../assets/images/banner0403.png';

const Home = () => {
    useEffect(() => {
        document.body.style.backgroundImage = `url(${backgroundImage})`;
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.overflowX = 'hidden';
        return () => {
            document.body.style.backgroundImage = '';
        };
    }, []);

    return (
        <>
            <div className={styles.home}>
                <header className={styles.header}>
                    <div className={clsx(styles.headerTop, styles.displayFlex)}>
                        <div className={clsx(styles.leftTop, styles.displayFlex)}>
                            <div className={clsx(styles.leftTopItem, styles.displayFlex)}>
                                <i className="fa-solid fa-square-envelope"></i>
                                <p>Email Address: example@gmail.com</p>
                            </div>
                            <div className={clsx(styles.leftTopItem, styles.displayFlex)}>
                                <i className="fa-solid fa-map-location-dot"></i>
                                <p>Office Address: Ho Chi Minh City, Vietnam</p>
                            </div>
                        </div>
                        <div className={clsx(styles.rightTop, styles.displayFlex)}>
                            <div className={clsx(styles.account, styles.rightTop, styles.displayFlex)}>
                                <i className="fa-solid fa-user"></i>
                                <span>Account</span>
                                <div className={styles.dropdownList}>
                                    <div>
                                        <i className="fa-solid fa-user"></i>
                                        <span>Username</span>
                                    </div>
                                    <hr />
                                    <ul>
                                        <li>
                                            <a href="#" className={styles.dropdownItem}>
                                                <i className="fa-regular fa-address-card"></i>
                                                <span>Profile</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#" className={styles.dropdownItem}>
                                                <i className="fa-regular fa-folder-closed"></i>
                                                <span>System Management</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#" className={styles.dropdownItem}>
                                                <i className="fa-solid fa-gears"></i>
                                                <span>Settings</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#" className={styles.dropdownItem}>
                                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                                <span>Logout</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <form action="" className={styles.searchBox}>
                                <input
                                    type="text"
                                    className={clsx(styles.searchText, styles.searchPlaceholder)}
                                    placeholder="Search"
                                    required
                                />
                                <button className={styles.searchButton}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className={styles.headerBottom}>
                        <div className={clsx(styles.leftBottom, styles.displayFlex)}>
                            <a href="">
                                <img src={logo} alt="logo" />
                            </a>
                            <div className={clsx(styles.menuItem, styles.displayFlex)}>
                                <a href="">Home</a>
                                <a href="">Pages</a>
                                <a href="">Services</a>
                                <a href="">Projects</a>
                                <a href="">Blog</a>
                                <a href="">Contact Us</a>
                            </div>
                        </div>

                        <div className={clsx(styles.rightBottom, styles.displayFlex)}>
                            <a href="" className={clsx(styles.displayFlex, styles.centered, styles.chatButton)}>
                                <i className="fa-regular fa-comments chat-button"></i>
                            </a>
                            <div>
                                <p style={{ fontWeight: 'bold' }}>Have any Question?</p>
                                <p>+0 123 456 789</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className={styles.firstBanner}>
                    <div className={clsx(styles.displayFlex, styles.centered)}>
                        <div style={{ marginLeft: '225px' }}>
                            <p className={clsx(styles.nonePaddingMargin, styles.headText)}>Hr is about People</p>
                            <h1 className={clsx(styles.nonePaddingMargin, styles.bodyText)}>
                                Human
                                <span style={{ color: '#0AADEB' }}>Resource</span> <br />
                                Solution Partner
                            </h1>

                            <div className={clsx(styles.firstBannerCol01Row02, styles.displayFlex)}>
                                <a href="">
                                    <div className={clsx(styles.contactButton, styles.displayFlex)}>
                                        <p className={styles.nonePaddingMargin}>Contact Us</p>
                                    </div>
                                </a>
                                <div className={clsx(styles.displayFlex, styles.centered)}>
                                    <a href="" className={clsx(styles.displayFlex, styles.centered, styles.playButton)}>
                                        <i className="fa-solid fa-circle-play play-button"></i>
                                    </a>
                                    <div
                                        className={clsx(styles.displayFlex, styles.centered, styles.contactButtonTitle)}
                                    >
                                        <p>How We Work</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={clsx(styles.displayFlex, styles.firstBannerPicture)}>
                        <img src={epm} alt="expert management" />
                    </div>
                </div>

                <div className={styles.secondBanner}>
                    <div className={styles.secondBannerItem}>
                        <div className={clsx(styles.displayFlex, styles.bannerNumber, styles.centered)}>
                            <img src={banner0201} alt="Second banner item 01." />
                            <p>01</p>
                        </div>
                        <div style={{ margin: '0px 10px', marginBottom: '10px' }}>
                            <p className={styles.headContent}>Compensation Consulting</p>
                            <p className={styles.bodyContent}>
                                We provide broad menu employment services for a companies.
                            </p>
                        </div>
                        <a href="">
                            <div className={clsx(styles.rectangle, styles.displayFlex, styles.centered)}>
                                <i className="fa-solid fa-arrow-right-long"></i>
                            </div>
                        </a>
                    </div>

                    <div className={styles.secondBannerItem}>
                        <div className={clsx(styles.displayFlex, styles.bannerNumber, styles.centered)}>
                            <img src={banner0202} alt="Second banner item 02." />
                            <p>02</p>
                        </div>
                        <div style={{ margin: '0px 10px', marginBottom: '10px' }}>
                            <p className={styles.headContent}>Leadership Training</p>
                            <p className={styles.bodyContent}>
                                We provide broad menu employment services for a companies.
                            </p>
                        </div>
                        <a href="">
                            <div className={clsx(styles.rectangle, styles.displayFlex, styles.centered)}>
                                <i className="fa-solid fa-arrow-right-long"></i>
                            </div>
                        </a>
                    </div>

                    <div className={styles.secondBannerItem}>
                        <div className={clsx(styles.displayFlex, styles.bannerNumber, styles.centered)}>
                            <img src={banner0203} alt="Second banner item 03." />
                            <p>03</p>
                        </div>
                        <div style={{ margin: '0px 10px', marginBottom: '10px' }}>
                            <p className={styles.headContent}>Talent Acquisition</p>
                            <p className={styles.bodyContent}>
                                We provide broad menu employment services for a companies.
                            </p>
                        </div>
                        <a href="">
                            <div className={clsx(styles.rectangle, styles.displayFlex, styles.centered)}>
                                <i className="fa-solid fa-arrow-right-long"></i>
                            </div>
                        </a>
                    </div>

                    <div className={styles.secondBannerBackground}>
                        <img src={banner03} alt="third-banner" />
                        <div className={clsx(styles.displayFlex, styles.centered, styles.backgroundText)}>
                            <div className={clsx(styles.displayFlex, styles.centered, styles.leftText)}>
                                <i className="fa-solid fa-quote-right"></i>
                                <div>
                                    <p>
                                        Train people quickly well with e-business. So they highly efficient manufactured
                                        products.
                                    </p>
                                    <p>--- Richard Branson</p>
                                </div>
                            </div>

                            <div className={styles.verticalLine}></div>

                            <div className={styles.rightText}>
                                <p>
                                    Our consultants believe in the value that you manage your regulatory compliance,
                                    policies, and procedures. We have specialist for managed employee
                                    performance,comparable to internal HR function.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.thirdBanner}>
                    <div className={styles.thirdBannerTop}>
                        <p className={styles.thirdBannerTopFirstText}>Who are you</p>
                        <p className={clsx(styles.thirdBannerTopSecondText, styles.nonePaddingMargin)}>
                            Why choose HR consulting <br />
                            <span style={{ color: '#0AADEB' }}>Services Company</span>
                        </p>
                    </div>

                    <div className={clsx(styles.displayFlex, styles.centered, styles.thirdBannerBottom)}>
                        <div className={styles.thirdBannerBottomLeft}>
                            <img src={banner0401} alt="The 4st Banner." />
                        </div>

                        <div className={styles.thirdBannerBottomRight}>
                            <p>
                                Our advisers provides a broad menu service that identifies the task requirements in the
                                organization job and designs the task description with skill requirements for the task.
                            </p>

                            <div className={clsx(styles.displayFlex, styles.centered)}>
                                <img src={banner0402} alt="The 4st Banner item 01." />
                                <p>
                                    {' '}
                                    <span>Strategic</span> <br /> <br />
                                    Partners We believe in the value that our functions added to a business. Our
                                    strategic partners that specialist role for HR is success of a business.
                                </p>
                            </div>

                            <div className={clsx(styles.displayFlex, styles.centered)}>
                                <img src={banner0403} alt="The 4st Banner item 02." />
                                <p>
                                    {' '}
                                    <span> Corporate Programs</span> <br /> <br />
                                    Corporate Programs are that added our functions to a business. Our Strategic
                                    Partners that specialist role for HR is success of a business.
                                </p>
                            </div>

                            <p>
                                Get intrigued about our service pricing? <a href="">Learn More</a>
                            </p>
                        </div>
                    </div>
                </div>

                <footer className={styles.footer}>
                    <div className={clsx(styles.footerTop, styles.displayFlex)}>
                        <div className={clsx(styles.displayFlex, styles.centered, styles.footerTopLeft)}>
                            <a className={clsx(styles.displayFlex, styles.centered)} href="">
                                <i className="fa-regular fa-calendar-check"></i>
                            </a>
                            <p>Call adviser for Emphires HR outsourcing service business</p>
                        </div>

                        <a href="">
                            <div className={clsx(styles.displayFlex, styles.centered, styles.footerTopRight)}>
                                <p>Book a consultants</p>
                            </div>
                        </a>
                    </div>

                    <div className={clsx(styles.displayFlex, styles.centered, styles.footerBottom)}>
                        <p>Copyright © 2021 Emphires All Rights Reserved</p>
                        <a href="">Privacy & Policy</a>
                        <a href="">Conditions</a>
                        <a href="">Refund Policy</a>
                    </div>
                </footer>

                <div id="backtop" className={styles.backtop}>
                    <i className="fa-solid fa-circle-chevron-up"></i>
                </div>
            </div>
        </>
    );
};

export default Home;
