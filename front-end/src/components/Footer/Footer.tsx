import clsx from 'clsx';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { useState, useEffect } from 'react';

const Footer = () => {
    // Hanlde for backtop
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });
    }, []);

    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 1000,
            smooth: true,
        });
    };

    return (
        <>
            <footer className={styles.footer}>
                <div className={clsx(styles.footerTop, styles.displayFlex)}>
                    <div className={clsx(styles.footerTopLeft, styles.displayFlex, styles.centered)}>
                        <div className={styles.icon}>
                            <i className="fa-solid fa-briefcase"></i>
                        </div>
                        <p>Let's go, show us your talent and unleash your potential with ABC Company !</p>
                    </div>

                    <Link to="/job-list">
                        <div className={clsx(styles.footerTopRight, styles.displayFlex, styles.centered)}>
                            <p>Secure a job position</p>
                        </div>
                    </Link>
                </div>

                <div className={clsx(styles.footerBottom, styles.displayFlex, styles.centered)}>
                    <p>Copyright © 2021 Emphires All Rights Reserved</p>
                    <Link to="/legal/privacy-policy">Privacy & Policy</Link>
                    <Link to="/legal/terms-and-conditions">Conditions</Link>
                    <Link to="/legal/refund-policy">Refund Policy</Link>
                </div>
            </footer>

            {isVisible && (
                <div onClick={scrollToTop} className={styles.backtop}>
                    <i className="fa-solid fa-circle-chevron-up"></i>
                </div>
            )}
        </>
    );
};
export default Footer;
