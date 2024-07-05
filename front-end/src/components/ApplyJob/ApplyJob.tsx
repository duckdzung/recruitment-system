import { useRef } from 'react';
import styles from './ApplyJob.module.scss';

const ApplyJob = () => {
    // Ref for elements
    const fileInputRef = useRef<HTMLInputElement>(null);
    const inputBtnRef = useRef<HTMLDivElement>(null);

    // Handle input button click
    const handleInputBtnClick = () => {
        if (inputBtnRef.current && fileInputRef.current) {
            fileInputRef.current.click();
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
                            <input type="file" hidden ref={fileInputRef} />
                            <i className="fa-solid fa-circle-plus"></i>
                        </div>
                    </div>
                </div>
                <div className={styles.rightForm}>
                    <div className={styles.uploadList}>
                        <div className={styles.uploadFile}>
                            <div className={styles.thumbnail}>
                                <i className="fas fa-file-alt"></i>
                                <div className={styles.checkIcon}>
                                    <i className="fa-solid fa-circle-check"></i>
                                </div>
                            </div>
                            <div className={styles.properties}>
                                <div className={styles.title}>Pornhub.mp4</div>
                                <div className={styles.size}>1000 KB</div>
                                <div className={styles.progress}></div>
                            </div>
                            <div className={styles.progressArea}>
                                <div className={styles.uploadHanler}>
                                    <div className={styles.remove}>
                                        <i className="fa-solid fa-circle-xmark"></i>
                                    </div>
                                    <div className={styles.checkBox}>
                                        <input type="checkbox" />
                                    </div>
                                </div>
                                <span className={styles.percent}>100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyJob;
