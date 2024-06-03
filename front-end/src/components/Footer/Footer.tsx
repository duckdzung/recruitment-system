import clsx from 'clsx';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <>
            <footer className={styles.footer}>
                <div className={clsx(styles.footerTop, styles.displayFlex)}>
                    <div className={clsx(styles.footerTopLeft, styles.displayFlex, styles.centered)}>
                        <a className={clsx(styles.displayFlex, styles.centered)} href="">
                            <i className="fa-regular fa-calendar-check"></i>
                        </a>
                        <p>Call adviser for Emphires HR outsourcing service business</p>
                    </div>

                    <a href="">
                        <div className={clsx(styles.footerTopRight, styles.displayFlex, styles.centered)}>
                            <p>Book a consultants</p>
                        </div>
                    </a>
                </div>

                <div className={clsx(styles.footerBottom, styles.displayFlex, styles.centered)}>
                    <p>Copyright © 2021 Emphires All Rights Reserved</p>
                    <a href="">Privacy & Policy</a>
                    <a href="">Conditions</a>
                    <a href="">Refund Policy</a>
                </div>
            </footer>

            <div id="backtop" className={styles.backtop}>
                <i className="fa-solid fa-circle-chevron-up"></i>
            </div>
        </>
    );
};
export default Footer;
