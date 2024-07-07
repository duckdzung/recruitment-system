import { useNavigate, useParams } from 'react-router-dom';
import styles from './JobDetails.module.scss';

export interface JobDetailsProps {
    title: string;
    location: string;
    requires: string;
}

const JobDetails: React.FC<JobDetailsProps> = ({ title, location, requires }) => {
    const { jobId } = useParams<{ jobId: string }>();
    const navigate = useNavigate();

    const handleClickApplyJob = () => {
        navigate(`/apply-job/${jobId}`);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <h1>{title}</h1>
                </div>
                <div className={styles.banner}>
                    <div className={styles.bannerImage}>
                        <div className={styles.bannerImageLeft}>
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className={styles.bannerImageRight}>
                            <p>{location}</p>
                            <span>Location</span>
                        </div>
                    </div>
                </div>
                <div className={styles.button}>
                    <div className={styles.btnImage} onClick={handleClickApplyJob}>
                        <i className="fa-regular fa-paper-plane"></i>
                        <span>Apply this Job</span>
                    </div>
                    <div className={styles.btnImage}>
                        <i className="fa-regular fa-heart"></i>
                        <span>Favourite</span>
                    </div>
                </div>

                <div className={styles.content}>
                    <p>{requires}</p>
                </div>
            </div>
        </>
    );
};

export default JobDetails;
