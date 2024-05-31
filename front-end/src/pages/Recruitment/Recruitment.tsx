import React, { useCallback, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Recruitment.module.scss';
import '../../assets/fonts/fontawesome-free-6.5.2/css/all.min.css';
import 'flatpickr/dist/themes/material_blue.css';
import Flatpickr from 'flatpickr';

import newSpaper from '../../assets/images/newspaperIcon.png';
import adBanner from '../../assets/images/advertisingBannerIcon.png';
import onlWebsite from '../../assets/images/onlineWebsiteIcon.png';

const useHighlightIcon = () => {
    const [highlighted, setHighlighted] = useState<number | null>(null);

    const handleIconClick = useCallback((index: number) => {
        setHighlighted(index);
    }, []);

    return [highlighted, handleIconClick] as const;
};

const Recruitment: React.FC = () => {
    // State for animation UI
    const [isRightPanelActive, setRightPanelActive] = useState<boolean>(false);
    const [isBtnScaled, setBtnScaled] = useState<boolean>(false);

    // Ref for Flatpickr instance
    const datePickerRefTimePeriod = useRef<HTMLInputElement | null>(null);
    const datePickerRefRecruitmentTime = useRef<HTMLInputElement | null>(null);

    // State for icon highlight
    const [highlightedIcon, handleIconClick] = useHighlightIcon();

    // Hanlde css UI
    useEffect(() => {
        document.body.style.height = '100vh';
        document.body.style.background = '#f6f5f7';
        document.body.style.display = 'grid';
        document.body.style.placeContent = 'center';
        return () => {
            document.body.style.height = '';
            document.body.style.background = '';
            document.body.style.display = '';
            document.body.style.placeContent = '';
        };
    }, []);

    // Hanlde animation UI
    const handleOverlayButtonClick = () => {
        setRightPanelActive(!isRightPanelActive);
        setBtnScaled(false);
        window.requestAnimationFrame(() => {
            setBtnScaled(true);
        });
    };

    // Effect will run whenever the value of datePickerRef changes
    useEffect(() => {
        if (datePickerRefTimePeriod.current) {
            Flatpickr(datePickerRefTimePeriod.current, {
                dateFormat: 'd-m-y',
                position: 'above',
                weekNumbers: true,
                enableTime: true,
                time_24hr: true,
            });
        }

        if (datePickerRefRecruitmentTime.current) {
            Flatpickr(datePickerRefRecruitmentTime.current, {
                dateFormat: 'd-m-y',
                position: 'above',
                weekNumbers: true,
                enableTime: true,
                time_24hr: true,
            });
        }
    }, [datePickerRefTimePeriod, datePickerRefRecruitmentTime]);

    return (
        <div className={clsx(styles.container, { [styles.rightPanelActive]: isRightPanelActive })} id="container">
            <div className={clsx(styles.formContainer, styles.signUpContainer)}>
                <form>
                    <h1>Recruitment Form</h1>

                    <span>Share your thoughts with the world from today</span>

                    <div className={styles.infield}>
                        <textarea cols={30} rows={5} placeholder="Job Describe" name="JobDescribe" />
                    </div>

                    <div className={styles.infield}>
                        <textarea cols={30} rows={5} placeholder="Requested Information" name="RequestedInformation" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div className={clsx(styles.formContainer, styles.signInContainer)}>
                <form>
                    <h1>Recruitment Form</h1>

                    <span>Share your thoughts with the world from today</span>

                    <div className={styles.infield}>
                        <input type="text" placeholder="Job Position" name="JobPosition" />
                        <label></label>
                    </div>

                    <div className={styles.infield}>
                        <input type="number" placeholder="Quantity" name="Quantity" />
                        <label></label>
                    </div>

                    <div className={styles.infield}>
                        <input
                            ref={datePickerRefTimePeriod}
                            className={styles.datePicker}
                            type="date"
                            placeholder="Time Period"
                            name="TimePeriod"
                        />
                        <i className="fa-solid fa-calendar-days"></i>
                        <label></label>
                    </div>

                    <div className={styles.infield}>
                        <input
                            ref={datePickerRefRecruitmentTime}
                            className={styles.datePicker}
                            type="date"
                            placeholder="Recruitment Time"
                            name="RecruitmentTime"
                        />
                        <i className="fa-solid fa-calendar-days"></i>
                        <label></label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div className={styles.overlayContainer} id="overlayCon">
                <div className={styles.overlay}>
                    <div className={clsx(styles.overlayPanel, styles.overlayLeft)}>
                        <h1>Welcome to ABC Company!</h1>
                        <p>Choose type of recruitment form</p>
                        <div className={styles.recMethod}>
                            {[newSpaper, adBanner, onlWebsite].map((icon, index) => (
                                <div
                                    key={index}
                                    className={clsx(styles.method, {
                                        [styles.methodHighlight]: highlightedIcon === index,
                                    })}
                                    onClick={() => handleIconClick(index)}
                                >
                                    <img src={icon} alt={`${icon} recruitment method`} />
                                </div>
                            ))}
                        </div>
                        <button className={styles.previousBtn} onClick={handleOverlayButtonClick}>
                            Previous
                        </button>
                    </div>
                    <div className={clsx(styles.overlayPanel, styles.overlayRight)}>
                        <h1>Hello, Friend!</h1>
                        <p>Choose type of recruitment form</p>
                        <div className={styles.recMethod}>
                            {[newSpaper, adBanner, onlWebsite].map((icon, index) => (
                                <div
                                    key={index}
                                    className={clsx(styles.method, {
                                        [styles.methodHighlight]: highlightedIcon === index,
                                    })}
                                    onClick={() => handleIconClick(index)}
                                >
                                    <img src={icon} alt={`${icon} recruitment method`} />
                                </div>
                            ))}
                        </div>
                        <button className={styles.nextBtn} onClick={handleOverlayButtonClick}>
                            Next
                        </button>
                    </div>
                </div>
                <button
                    id={styles.overlayBtn}
                    className={clsx({ [styles.btnScaled]: isBtnScaled })}
                    onClick={handleOverlayButtonClick}
                ></button>
            </div>
        </div>
    );
};

export default Recruitment;
