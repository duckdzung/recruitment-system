import { ChangeEvent, useRef, useState } from 'react';
import styles from './ApplyJob.module.scss';
import axiosClient from '../../axios/axiosClient';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecruitmentFormById } from '../../services/recruitmentService';
import { applyJob } from '../../services/profileService';

interface UploadFile {
    id: number;
    title: string;
    size: number;
    progress: number;
    isSelected: boolean;
}

const ApplyJob = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const navigate = useNavigate();

    // Ref for elements
    const fileInputRef = useRef<HTMLInputElement>(null);
    const inputBtnRef = useRef<HTMLDivElement>(null);

    // State to store selected file
    const [selectedFile, setSelectedFile] = useState<UploadFile | null>(null);
    const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);

    // Handle input button click
    const handleInputBtnClick = () => {
        if (inputBtnRef.current && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Handle file selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            // Upload file
            uploadFile(file);
        }
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axiosClient.post('/profiles', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response);

            if (response.status === 200) {
                setUploadFileList((prevList) => [
                    ...prevList,
                    { id: response.data.data, title: file.name, size: file.size, progress: 100, isSelected: false },
                ]);
            }
        } catch (error) {
            toast.error('Error uploading file');
        }
    };

    const handleChangeIsSelected = (fileName: string) => {
        setUploadFileList((prevList) => {
            return prevList.map((prev) => {
                if (prev.title === fileName) {
                    setSelectedFile(prev);
                    return {
                        ...prev,
                        isSelected: !prev.isSelected,
                    };
                } else {
                    return {
                        ...prev,
                        isSelected: false,
                    };
                }
            });
        });
    };

    const handleSubmit = async () => {
        if (selectedFile === null) {
            toast.error('Please select a file to apply');
            return;
        }

        const response = await getRecruitmentFormById(jobId || '1');
        const { recruitmentDetails } = response?.data;
        const nomineeId: number = recruitmentDetails.nominee.nomineeId;
        const recruitId = recruitmentDetails.recruitmentInformation.recruitId;
        const profileId = selectedFile.id;

        // Call api apply job
        await applyJob(nomineeId, recruitId, profileId);

        toast.success('Apply job successfully');
        navigate('/job-list');
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.leftForm}>
                    <div className={styles.LeftFormTop}>
                        <div className={styles.outerCircle}>
                            <div className={styles.coreCircle}>
                                <i className="fa-solid fa-arrow-up"></i>
                            </div>
                        </div>
                    </div>
                    <div className={styles.leftFormBottom}>
                        <h1>Select and upload the files of your choice</h1>
                        <span>- Now -</span>
                        <p>Browse</p>
                        <div className={styles.uploadBtn} ref={inputBtnRef} onClick={handleInputBtnClick}>
                            <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
                            <i className="fa-solid fa-circle-plus"></i>
                        </div>
                    </div>
                </div>
                <div className={styles.rightForm}>
                    <div className={styles.uploadList}>
                        {uploadFileList?.map((file, index) => (
                            <div className={styles.uploadFile} key={index}>
                                <div className={styles.thumbnail}>
                                    <i className="fas fa-file-alt"></i>
                                    <div className={styles.checkIcon}>
                                        <i className="fa-solid fa-circle-check"></i>
                                    </div>
                                </div>
                                <div className={styles.properties}>
                                    <div className={styles.title}>{file.title}</div>
                                    <div className={styles.size}>{file.size / 1000} KB</div>
                                    <div className={styles.progress}>
                                        <div className={styles.progressBar}></div>
                                    </div>
                                </div>
                                <div className={styles.progressArea}>
                                    <div className={styles.uploadHandler}>
                                        <div className={styles.remove}>
                                            <i className="fa-solid fa-circle-xmark"></i>
                                        </div>
                                        <div className={styles.checkBox}>
                                            <input
                                                type="checkbox"
                                                checked={file.isSelected}
                                                onChange={() => handleChangeIsSelected(file.title)}
                                            />
                                        </div>
                                    </div>
                                    <span className={styles.percent}>{file.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.submitBtnConainer}>
                        {uploadFileList?.length > 0 && (
                            <button type="button" className={styles.submitBtn} onClick={handleSubmit}>
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyJob;
