import { ChangeEvent, useRef, useState } from 'react';
import axios from 'axios';
import styles from './ApplyJob.module.scss';
import axiosClient from '../../axios/axiosClient';

interface UploadFile {
    title: string;
    size: number;
    progress: number;
}

const ApplyJob = () => {
    // Ref for elements
    const fileInputRef = useRef<HTMLInputElement>(null);
    const inputBtnRef = useRef<HTMLDivElement>(null);

    // State to store selected file
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

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
            setSelectedFile(file);

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
                onUploadProgress: (progressEvent) => {
                    const percentCompleted =
                        progressEvent.total !== undefined
                            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                            : 0;
                    setUploadProgress(percentCompleted);
                },
            });

            if (response.status === 201) {
                setUploadFileList((prevList) => [...prevList, { title: file.name, size: file.size, progress: 100 }]);
            }
        } catch (error) {
            console.error('Error uploading file', error);
        }
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
                        {uploadFileList.map((file, index) => (
                            <div className={styles.uploadFile} key={index}>
                                <div className={styles.thumbnail}>
                                    <i className="fas fa-file-alt"></i>
                                    <div className={styles.checkIcon}>
                                        <i className="fa-solid fa-circle-check"></i>
                                    </div>
                                </div>
                                <div className={styles.properties}>
                                    <div className={styles.title}>{file.title}</div>
                                    <div className={styles.size}>{file.size} KB</div>
                                    <div className={styles.progress}>
                                        <div
                                            style={{ width: `${file.progress}%` }}
                                            className={styles.progressBar}
                                        ></div>
                                    </div>
                                </div>
                                <div className={styles.progressArea}>
                                    <div className={styles.uploadHandler}>
                                        <div className={styles.remove}>
                                            <i className="fa-solid fa-circle-xmark"></i>
                                        </div>
                                        <div className={styles.checkBox}>
                                            <input type="checkbox" />
                                        </div>
                                    </div>
                                    <span className={styles.percent}>{file.progress}%</span>
                                </div>
                            </div>
                        ))}
                        {selectedFile && (
                            <div className={styles.uploadFile}>
                                <div className={styles.thumbnail}>
                                    <i className="fas fa-file-alt"></i>
                                    <div className={styles.checkIcon}>
                                        <i className="fa-solid fa-circle-check"></i>
                                    </div>
                                </div>
                                <div className={styles.properties}>
                                    <div className={styles.title}>{selectedFile.name}</div>
                                    <div className={styles.size}>{selectedFile.size} KB</div>
                                    <div className={styles.progress}>
                                        <div
                                            style={{ width: `${uploadProgress}%` }}
                                            className={styles.progressBar}
                                        ></div>
                                    </div>
                                </div>
                                <div className={styles.progressArea}>
                                    <div className={styles.uploadHandler}>
                                        <div className={styles.remove}>
                                            <i className="fa-solid fa-circle-xmark"></i>
                                        </div>
                                        <div className={styles.checkBox}>
                                            <input type="checkbox" />
                                        </div>
                                    </div>
                                    <span className={styles.percent}>{uploadProgress}%</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyJob;
