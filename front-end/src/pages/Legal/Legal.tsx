import { useEffect, useRef } from 'react';
import { MouseEventHandler } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import styles from './Legal.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';

const Legal = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflowX = 'hidden';
        document.body.style.margin = '0';

        // Scroll to top when component render first time
        scroll.scrollToTop({
            duration: 500,
            smooth: true,
        });

        // Handle active button when component render first time
        const pathname = location.pathname;
        switch (pathname) {
            case '/legal/privacy-policy':
                goal01Ref.current?.style.setProperty('--progress-width', '100%');
                goal01Ref.current?.style.setProperty('--scaleValue', '1.1');
                break;

            case '/legal/terms-and-conditions':
                goal02Ref.current?.style.setProperty('--progress-width', '100%');
                goal02Ref.current?.style.setProperty('--scaleValue', '1.1');
                break;

            case '/legal/refund-policy':
                goal03Ref.current?.style.setProperty('--progress-width', '100%');
                goal03Ref.current?.style.setProperty('--scaleValue', '1.1');
                break;

            default:
                break;
        }
        return () => {
            document.body.style.overflowX = '';
            document.body.style.margin = '';
        };
    }, []);

    // Handle for goal click
    const goal01Ref = useRef<HTMLDivElement>(null);
    const goal02Ref = useRef<HTMLDivElement>(null);
    const goal03Ref = useRef<HTMLDivElement>(null);

    const handleGoalClick: MouseEventHandler<HTMLDivElement> = (event) => {
        const clickedGoalId = event.currentTarget.id;
        const goals = [goal01Ref.current, goal02Ref.current, goal03Ref.current];

        goals.forEach((goal) => {
            if (goal?.id === clickedGoalId) {
                goal?.style.setProperty('--progress-width', '100%');
                goal?.style.setProperty('--scaleValue', '1.1');
            } else {
                goal?.style.setProperty('--progress-width', '0%');
                goal?.style.setProperty('--scaleValue', '1');
            }
        });

        if (clickedGoalId === 'goal01') {
            navigate('/legal/privacy-policy');
        } else if (clickedGoalId === 'goal02') {
            navigate('/legal/terms-and-conditions');
        } else if (clickedGoalId === 'goal03') {
            navigate('/legal/refund-policy');
        }
    };

    return (
        <div className={styles.contactUs}>
            <div className={styles.group}>
                <Header />
                <div className={styles.firstBanner}>
                    <div ref={goal01Ref} id="goal01" className={styles.goal} onClick={handleGoalClick}>
                        <i className="fa-solid fa-building-shield"></i>
                        <span>Privacy & Policy</span>
                    </div>
                    <div ref={goal02Ref} id="goal02" className={styles.goal} onClick={handleGoalClick}>
                        <i className="fa-solid fa-file-lines"></i>
                        <span>Conditions</span>
                    </div>
                    <div ref={goal03Ref} id="goal03" className={styles.goal} onClick={handleGoalClick}>
                        <i className="fa-solid fa-money-bill-transfer"></i>
                        <span>Refund Policy</span>
                    </div>
                </div>
                <i className="fa-regular fa-face-kiss-wink-heart"></i>
            </div>
            <Outlet />
            <Footer />
        </div>
    );
};
export default Legal;
