import styles from './JobItem.module.scss';
import { Link, useNavigate } from 'react-router-dom';

interface JobItemProps {
    imgUrl: string;
    name: string;
    location: string;
    jobPosition: string;
    salary: string;
    contact: string;
    quantity: number;
}

const JobItem: React.FC<JobItemProps> = ({ imgUrl, name, location, jobPosition, salary, contact, quantity }) => {
    // Handle for JobItem click
    const jobItem = document.getElementById('jobItem');
    const navigate = useNavigate();

    const handleJobItemClick = () => {
        if (jobItem) {
            navigate('/job-details');
        }
    };

    return (
        <>
            <div id="jobItem" onClick={handleJobItemClick} className={styles.container}>
                <div className={styles.topItem}>
                    <div className={styles.topItemFirst}>
                        <div className={styles.attachment}></div>
                        <div className={styles.bussinessLogo} style={{ backgroundImage: `url(${imgUrl})` }}></div>
                        <Link to="#">
                            <i className="fa-solid fa-plus"></i>
                        </Link>
                    </div>

                    <div className={styles.topItemSecond}>
                        <div className={styles.topItemSecondImage}>
                            <i className="fa-solid fa-building-user"></i>
                            <span>{name}</span>
                        </div>
                        <div className={styles.topItemSecondImage}>
                            <i className="fa-solid fa-map-location-dot"></i>
                            <span>{location}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.middleItem}>
                    <div className={styles.middleItemImage}>
                        <span>Job Position</span>
                        <p>{jobPosition}</p>
                    </div>
                    <div className={styles.middleItemImage}>
                        <span>Salary</span>
                        <p>{salary} $</p>
                    </div>
                </div>
                <div className={styles.bottomItem}>
                    <div className={styles.bottomItemImage}>
                        <i className="fa-solid fa-envelope"></i>
                        <span>{contact}</span>
                    </div>
                    <div className={styles.bottomItemImage}>
                        <i className="fa-solid fa-circle-user"></i>
                        <span>{quantity} Employees</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobItem;
