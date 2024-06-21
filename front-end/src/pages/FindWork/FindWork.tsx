import { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import styles from './FindWork.module.scss';
import JobList from '../../components/JobList/JobList';

const FindWork = () => {
    useEffect(() => {
        document.body.style.overflowX = 'hidden';
        document.body.style.margin = '0';

        // Scroll to top when component render
        scroll.scrollToTop({
            duration: 1000,
            smooth: true,
        });
    });

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
            <JobList />
            <Footer />
        </div>
    );
};
export default FindWork;
