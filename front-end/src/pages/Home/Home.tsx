import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import '../../assets/fonts/fontawesome-free-6.5.2/css/all.min.css';
import clsx from 'clsx';
import { animateScroll as scroll } from 'react-scroll';

import epm from '../../assets/images/expert-management.png';
import banner0201 from '../../assets/images/banner0201.png';
import banner0202 from '../../assets/images/banner0202.png';
import banner0203 from '../../assets/images/banner0203.png';
import banner03 from '../../assets/images/banner03.png';
import banner0401 from '../../assets/images/banner0401.png';
import banner0402 from '../../assets/images/banner0402.png';
import banner0403 from '../../assets/images/banner0403.png';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import JobList from '../../components/JobList/JobList';

const Home = () => {
    useEffect(() => {
        document.body.style.overflowX = 'hidden';
        document.body.style.margin = '0';

        // Scroll to top when component render
        scroll.scrollToTop({
            duration: 1000,
            smooth: true,
        });

        return () => {
            document.body.style.overflowX = '';
            document.body.style.margin = '';
        };
    }, []);

    return (
        <>
            <div className={styles.home}>
                <div className={styles.group}>
                    <Header />

                    <div className={styles.firstBanner}>
                        <div className={styles.firstBannerCol01}>
                            <div className={styles.firstBannerCol01Block}>
                                <p className={clsx(styles.nonePaddingMargin, styles.headText)}>Hr is about People</p>
                                <h1 className={clsx(styles.nonePaddingMargin, styles.bodyText)}>
                                    Human
                                    <span style={{ color: '#0AADEB' }}> Resource</span> <br />
                                    Solution Partner
                                </h1>

                                <div className={clsx(styles.firstBannerCol01Row02, styles.displayFlex)}>
                                    <Link to="/contact" className={styles.contactBtnAnimation}>
                                        <div className={clsx(styles.contactButton, styles.displayFlex)}>
                                            <p className={styles.nonePaddingMargin}>Contact Us</p>
                                        </div>
                                    </Link>
                                    <div className={clsx(styles.playBtnAnimation, styles.displayFlex, styles.centered)}>
                                        <Link
                                            to="/how-we-work"
                                            className={clsx(styles.displayFlex, styles.centered, styles.playButton)}
                                        >
                                            <i className="fa-solid fa-circle-play play-button"></i>
                                        </Link>
                                        <div
                                            className={clsx(
                                                styles.displayFlex,
                                                styles.centered,
                                                styles.playButtonTitle,
                                            )}
                                        >
                                            <p>How We Work</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={clsx(styles.displayFlex, styles.firstBannerCol02)}>
                            <img src={epm} alt="expert management" />
                        </div>
                    </div>
                </div>

                <div className={styles.secondBanner}>
                    <div className={styles.secondBannerBlock}>
                        <div draggable="true" className={styles.secondBannerItem}>
                            <div className={clsx(styles.bannerNumber, styles.displayFlex, styles.centered)}>
                                <img src={banner0201} alt="Second banner item 01." />
                                <p>01</p>
                            </div>
                            <div style={{ margin: '0px 10px', marginBottom: '10px' }}>
                                <p className={styles.headContent}>Compensation Consulting</p>
                                <p className={styles.bodyContent}>
                                    We provide broad menu employment services for a companies.
                                </p>
                            </div>
                            <Link to="/services/compensation-consulting">
                                <div className={clsx(styles.rectangle, styles.displayFlex, styles.centered)}>
                                    <i className="fa-solid fa-arrow-right-long"></i>
                                </div>
                            </Link>
                        </div>

                        <div draggable="true" className={styles.secondBannerItem}>
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
                            <Link to="/services/leadership-training">
                                <div className={clsx(styles.rectangle, styles.displayFlex, styles.centered)}>
                                    <i className="fa-solid fa-arrow-right-long"></i>
                                </div>
                            </Link>
                        </div>

                        <div draggable="true" className={styles.secondBannerItem}>
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
                            <Link to="/services/talent-acquisition">
                                <div className={clsx(styles.rectangle, styles.displayFlex, styles.centered)}>
                                    <i className="fa-solid fa-arrow-right-long"></i>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.secondBannerBackground}>
                        <img src={banner03} alt="third-banner" />
                        <div className={clsx(styles.backgroundText, styles.displayFlex, styles.centered)}>
                            <div className={clsx(styles.leftText, styles.displayFlex, styles.centered)}>
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

                    <div className={clsx(styles.thirdBannerBottom, styles.displayFlex, styles.centered)}>
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
                                Get intrigued about our service pricing? <Link to="/how-we-work">Learn More</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.jobBanner}>
                    <div className={styles.jobBannerHead}>
                        <div className={styles.jobBannerHeadFirstText}>
                            <span>Our services</span>
                        </div>
                        <div className={styles.jobBannerHeadSecondText}>
                            <p>Deliver Outsourced</p>
                            <span>HR service's</span>
                        </div>
                        <div className={styles.jobBannerHeadLink}>
                            <Link to="/services/talent-acquisition">View All Services</Link>
                            <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                    </div>
                    <div className={styles.jobBannerCenter}>
                        <JobList />
                    </div>
                    <div className={styles.jobBannerBottom}>
                        <p>Find a job that matches your expertise in our job list.</p>
                        <Link to="/job-list">Get All Jobs</Link>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Home;
