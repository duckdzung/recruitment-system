import { useEffect } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import styles from './ContactUs.module.scss';

const ContactUs = () => {
    useEffect(() => {
        document.body.style.overflowX = 'hidden';
        document.body.style.margin = '0';
        return () => {
            document.body.style.overflowX = '';
            document.body.style.margin = '';
        };
    }, []);

    return (
        <>
            <div className={styles.contactUs}>
                <div className={styles.group}>
                    <Header />
                    <div className={styles.firstBanner}>
                        <span>Contact Us</span>
                        <p>You can do it, We can help. Think different !</p>
                    </div>
                    <i className="fa-regular fa-face-kiss-wink-heart"></i>
                </div>
                <div className={styles.secondBanner}>
                    <div className={styles.secondBannerItem}>
                        <i className="fa-regular fa-envelope"></i>
                        <div className={styles.secondBannerItemText}>
                            <span>Email Address</span>
                            <p>ABC_Company01@gmail.com</p>
                            <p>ABC_Company02@gmail.com</p>
                        </div>
                    </div>
                    <div className={styles.secondBannerItem}>
                        <i className="fa-regular fa-map"></i>
                        <div className={styles.secondBannerItemText}>
                            <span>Our Address</span>
                            <p>Main street 10, Linh Trung ward,</p>
                            <p>Thu Duc city, Ho Chi Minh city</p>
                        </div>
                    </div>
                    <div className={styles.secondBannerItem}>
                        <i className="fa-regular fa-calendar-plus"></i>
                        <div className={styles.secondBannerItemText}>
                            <span>Hours</span>
                            <p>Mon - Fri: 9am - 5pm</p>
                            <p>Sat - Sun: closed</p>
                        </div>
                    </div>
                </div>
                <div className={styles.thirdBanner}>
                    <form action="" className={styles.feedbackForm}>
                        <div className={styles.leftForm}>
                            <span>Message Us</span>
                            <p>Have be any Question? feel free to contact with us.</p>
                            <span>
                                Any feedback, no matter how small, is invaluable to us. Together, we can make a
                                difference !
                            </span>
                            <div className={styles.leftFormIcon}>
                                <i className="fa-brands fa-square-facebook"></i>
                                <i className="fa-brands fa-square-x-twitter"></i>
                                <i className="fa-brands fa-linkedin"></i>
                                <i className="fa-brands fa-square-instagram"></i>
                            </div>
                        </div>
                        <div className={styles.rightForm}>
                            <div className={styles.rightFormInput}>
                                <input type="text" placeholder="Your Name" />
                                <input type="email" placeholder="Email Address" />
                                <input type="tel" placeholder="Phone Number" />
                                <input type="text" placeholder="Training Tips" />
                            </div>
                            <textarea name="WriteMessage" id="" placeholder="Write Message"></textarea>
                            <button>Send Message</button>
                        </div>
                    </form>
                </div>
                <div className={styles.address}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.15712478057!2d106.79659497457605!3d10.875651357356576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a1768e1d03%3A0x38d3ea53e0581ae0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puLCDEkEhRRy1IQ00sIEPGoSBz4bufIExpbmggVHJ1bmcu!5e0!3m2!1svi!2s!4v1717912208208!5m2!1svi!2s"></iframe>
                </div>

                <Footer />
            </div>
        </>
    );
};
export default ContactUs;
