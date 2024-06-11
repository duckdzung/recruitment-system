import { useEffect } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import OrganizationalStructures from '../../components/Legals/OrganizationalStructures';

import styles from './OrganizationalStructures.module.scss';

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
        <div className={styles.contactUs}>
            <div className={styles.group}>
                <Header />
                <div className={styles.firstBanner}>
                    <span>How We Work</span>
                    <p>Functionalities of ABC Company's Recruitment Platform !</p>
                </div>
                <i className="fa-regular fa-face-kiss-wink-heart"></i>
            </div>
            <OrganizationalStructures />
            <Footer />
        </div>
    );
};
export default ContactUs;
