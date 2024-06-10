import { useEffect, useRef, useState } from 'react';
import { MouseEventHandler } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PrivacyPolicy from '../../components/Legals/PrivacyPolicy';
import TermsAndConditions from '../../components/Legals/TermsAndConditions';
import RefundPolicy from '../../components/Legals/RefundPolicy';

import styles from './Legal.module.scss';

const Legal = () => {
    useEffect(() => {
        document.body.style.overflowX = 'hidden';
        document.body.style.margin = '0';
        return () => {
            document.body.style.overflowX = '';
            document.body.style.margin = '';
        };
    }, []);

    // State for show text
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [showTermsAndConditions, setshowTermsAndConditions] = useState(false);
    const [showRefundPolicy, setshowRefundPolicy] = useState(false);

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
            setShowPrivacyPolicy(true);
        } else {
            setShowPrivacyPolicy(false);
        }

        if (clickedGoalId === 'goal02') {
            setshowTermsAndConditions(true);
        } else {
            setshowTermsAndConditions(false);
        }

        if (clickedGoalId === 'goal03') {
            setshowRefundPolicy(true);
        } else {
            setshowRefundPolicy(false);
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
            {showPrivacyPolicy && <PrivacyPolicy />}
            {showTermsAndConditions && <TermsAndConditions />}
            {showRefundPolicy && <RefundPolicy />}
            <Footer />
        </div>
    );
};
export default Legal;
