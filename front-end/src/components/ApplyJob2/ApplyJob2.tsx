import { useRef, useState } from 'react';
import styles from './ApplyJob.module.scss';

import PopUpImage from '../PopUp/PopUpImage/PopUpImage';

const ApplyJob2 = () => {
    // Ref for Elements
    const uploadFormRef = useRef<HTMLDivElement>(null);
    const exitsBtnRef = useRef<HTMLDivElement>(null);
    const inputIconRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadBtnRef = useRef<HTMLButtonElement>(null);

    // Handle exits button click
    const handlExitsBtnClick = () => {
        if (exitsBtnRef.current && uploadFormRef.current) {
            uploadFormRef.current.classList.add(styles.displayNone);
        }
    };

    // Handle input button click
    const handleInputBtnClick = () => {
        if (inputIconRef.current && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Handle upload button click
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleUploadButtonClick = () => {
        if (uploadBtnRef.current && uploadFormRef.current) {
            uploadFormRef.current.classList.add(styles.displayNone);
            setIsPopupVisible(true);
        }
    };

    return (
        <>
            <div ref={uploadFormRef} className={styles.uploadForm}>
                <div className={styles.container}>
                    <div className={styles.top}>
                        <div className={styles.left}>
                            <div className={styles.uploadIcon}>
                                <i className="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            <div className={styles.uploadIconContent}>
                                <span>Upload Files</span>
                                <p>Select and upload the files of your choice</p>
                            </div>
                        </div>
                        <div className={styles.right} onClick={handlExitsBtnClick} ref={exitsBtnRef}>
                            <i className="fa-regular fa-circle-xmark"></i>
                        </div>
                    </div>
                    <div className={styles.middle}>
                        <form action="#">
                            <input type="file" hidden ref={fileInputRef} />
                            <div className={styles.browseFileIcon} ref={inputIconRef} onClick={handleInputBtnClick}>
                                <i className="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            <span>Browse File to Upload Your Application Documents</span>
                        </form>
                    </div>
                    <div className={styles.bottom}>
                        <section className={styles.progressArea}>
                            <li className={styles.progressdRow}>
                                <i className="fas fa-file-alt"></i>
                                <div className={styles.progressContent}>
                                    <div className={styles.progressDetails}>
                                        <span className={styles.fileName}>
                                            Porn-180Plus.mp4
                                            <div className={styles.uploadingState}>
                                                <i className="fa-solid fa-spinner"></i>
                                            </div>
                                            <span>Uploading</span>
                                        </span>
                                        <span className={styles.uploadPercent}>50%</span>
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div className={styles.progress}></div>
                                    </div>
                                </div>
                            </li>
                        </section>
                        <section className={styles.uploadedArea}>
                            <li className={styles.uploadRow}>
                                <i className="fas fa-file-alt"></i>
                                <div className={styles.uploadContent}>
                                    <span className={styles.fileName}>
                                        Porn-180Plus.mp4
                                        <div className={styles.uploadedState}>
                                            <i className="fa-regular fa-circle-check"></i>
                                        </div>
                                        <span>Uploaded</span>
                                    </span>
                                    <span className={styles.fileSize}>400 MB</span>
                                </div>
                                <div className={styles.uploadedIcon}>
                                    <i className="fa-regular fa-circle-xmark"></i>
                                </div>
                            </li>
                        </section>
                    </div>
                    <button ref={uploadBtnRef} className={styles.nextBtn} onClick={handleUploadButtonClick}>
                        Upload
                    </button>
                </div>
            </div>
            {isPopupVisible && <PopUpImage Title="Your job application has been successfully uploaded" />}
        </>
    );
};

export default ApplyJob2;
