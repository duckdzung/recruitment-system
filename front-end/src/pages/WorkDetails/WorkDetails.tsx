import { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import styles from './WorkDetails.module.scss';
import JobDetails from '../../components/JobDetails/JobDetails';

const jobDetail = {
    title: 'Rent Google Play Console Account',
    salary: '120,000',
    location: 'TP. Ho Chi Minh',
    experience: 'No Experience',
    requires: 'Job Requires',
};

const WorkDetails = () => {
    useEffect(() => {
        document.body.style.overflowX = 'hidden';
        document.body.style.margin = '0';

        // Scroll to top when component render
        scroll.scrollToTop({
            duration: 1000,
            smooth: true,
        });
    }, []);

    return (
        <div className={styles.contactUs}>
            <div className={styles.group}>
                <Header />
                <div className={styles.firstBanner}>
                    <span>Find a Work</span>
                    <p>Exploring your inner potential with ABS company !</p>
                </div>
                <i className="fa-regular fa-face-kiss-wink-heart"></i>
            </div>
            <JobDetails {...jobDetail} />
            <Footer />
        </div>
    );
};

export default WorkDetails;
