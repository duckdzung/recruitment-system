import { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import styles from './WorkDetails.module.scss';
import JobDetails, { JobDetailsProps } from '../../components/JobDetails/JobDetails';
import { useParams } from 'react-router-dom';
import { getRecruitmentFormById } from '../../services/recruitmentService';

const defaultJobDetail: JobDetailsProps = {
    title: 'Rent Google Play Console Account',
    salary: '120,000',
    location: 'TP. Ho Chi Minh',
    experience: 'No Experience',
    requires: 'Job Requires',
};

const WorkDetails = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const [jobDetail, setJobDetail] = useState<JobDetailsProps>(defaultJobDetail);

    useEffect(() => {
        document.body.style.overflowX = 'hidden';
        document.body.style.margin = '0';

        // Scroll to top when component render
        scroll.scrollToTop({
            duration: 1000,
            smooth: true,
        });

        getWorkerDetail();
    }, []);

    const getWorkerDetail = async () => {
        const response = await getRecruitmentFormById(jobId || '1');
        const { recruitmentDetails } = response?.data;

        setJobDetail({
            title: recruitmentDetails.nominee.position,
            salary: recruitmentDetails.salary || 'Negotiate ',
            location: recruitmentDetails.recruitmentInformation.enterprise.member.address,
            requires: recruitmentDetails.requiredInfo,
            experience: recruitmentDetails.experience || 'No experience',
        });
    };

    return (
        <div className={styles.contactUs}>
            <div className={styles.group}>
                <Header />
                <div className={styles.firstBanner}>
                    <span>Find a Work</span>
                    <p>Exploring your inner potential with ABC company !</p>
                </div>
                <i className="fa-regular fa-face-kiss-wink-heart"></i>
            </div>
            <JobDetails {...jobDetail} />
            <Footer />
        </div>
    );
};

export default WorkDetails;
