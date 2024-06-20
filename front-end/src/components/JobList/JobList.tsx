import styles from './JobList.module.scss';
import JobItem from '../JobItem/JobItem';

const jobItem = {
    imgUrl: '../public/demo.png',
    name: 'New York Stock Exchange',
    location: 'New York, NY',
    jobPosition: 'Software Engineer',
    salary: '120,000',
    contact: 'contact@example.com',
    quantity: 100,
};

const jobItems = Array.from({ length: 3 }, () => jobItem);

const JobList = () => {
    return (
        <>
            <div className={styles.container}>
                {jobItems.map((item, index) => (
                    <JobItem key={index} {...item} />
                ))}
            </div>
        </>
    );
};

export default JobList;
