import Pagination from 'rc-pagination';

import styles from './JobList.module.scss';
import JobItem, { JobItemProps } from '../JobItem/JobItem';
import { useEffect, useState } from 'react';
import { getAllRecruitmentForms } from '../../services/recruitmentService';

const JobList = () => {
    const [jobList, setJobList] = useState<JobItemProps[]>([]);

    // State for pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const size: number = 3;

    useEffect(() => {
        getJobList();
    }, [currentPage]);

    const getJobList = async () => {
        const response = await getAllRecruitmentForms(currentPage - 1, size);

        setJobList(
            response?.data.content.map((recruitment: any) => {
                return {
                    id: recruitment.recruitmentDetails.recruitmentInformation.recruitId,
                    imgUrl: '../public/demo.png',
                    name: recruitment.recruitmentDetails.recruitmentInformation.enterprise.companyName,
                    location: recruitment.recruitmentDetails.recruitmentInformation.enterprise.member.address,
                    jobPosition: recruitment.recruitmentDetails.nominee.position,
                    salary: recruitment.salary || '120,000',
                    contact: recruitment.recruitmentDetails.recruitmentInformation.enterprise.member.email,
                    quantity: recruitment.recruitmentDetails.quantity,
                };
            }),
        );

        setTotalPages(response?.data.page.totalPages);
    };

    const onChangeCurentPage = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className={styles.container}>
                {jobList?.map((jobItem, index) => (
                    <JobItem key={index} {...jobItem} />
                ))}
            </div>

            <Pagination
                onChange={onChangeCurentPage}
                align="center"
                defaultCurrent={1}
                current={currentPage}
                total={totalPages * 10}
            />
        </>
    );
};

export default JobList;
