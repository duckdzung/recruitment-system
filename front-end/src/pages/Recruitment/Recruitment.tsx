import React, { useCallback, useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Recruitment.module.scss';
import '../../assets/fonts/fontawesome-free-6.5.2/css/all.min.css';

import newSpaper from '../../assets/images/newspaperIcon.png';
import adBanner from '../../assets/images/advertisingBannerIcon.png';
import onlWebsite from '../../assets/images/onlineWebsiteIcon.png';
import { AdvertisingForm, RecruitmentDetails, RecruitmentForm, TimePeriodType } from '../../types';

import * as yup from 'yup';
import { toast } from 'react-toastify';
import { createRecruitmentForm } from '../../services/recruitmentService';
import { useNavigate } from 'react-router-dom';

// Schema validation using yup
const schema = yup.object().shape({
    jobDescribe: yup.string().required('Job description is required'),
    requestedInformation: yup.string().required('Requested information is required'),
    jobPosition: yup.string().required('Job position is required'),
    quantity: yup
        .number()
        .positive('Quantity must be a positive number')
        .min(1, 'Quantity must be at least 1')
        .required('Quantity is required'),
    timePeriod: yup.string().required('Time period is required'),
    recruitmentTime: yup.string().required('Recruitment time is required'),
    recruitmentForm: yup.string().required('Recruitment form is required'),
});

const Recruitment: React.FC = () => {
    // State for recruitment form
    const [jobDescribe, setJobDescribe] = useState('');
    const [requestedInformation, setRequestedInformation] = useState('');
    const [jobPosition, setJobPosition] = useState('');
    const [quantity, setQuantity] = useState<number>();
    const [timePeriod, setTimePeriod] = useState<TimePeriodType | null>(null);
    const [recruitmentTime, setRecruitmentTime] = useState<string>('');
    const [recruitmentForm, setRecruitmentForm] = useState<RecruitmentForm>(RecruitmentForm.WEBSITE);

    // State for animation UI
    const [isRightPanelActive, setRightPanelActive] = useState<boolean>(false);
    const [isBtnScaled, setBtnScaled] = useState<boolean>(false);

    const navigate = useNavigate();

    // Hook to handle icon highlighting
    const useHighlightIcon = () => {
        const [highlighted, setHighlighted] = useState<number | null>(null);

        const handleIconClick = useCallback((index: number) => {
            setHighlighted(index);

            // Set state for recruitment form based on selected icon
            switch (index) {
                case 1:
                    setRecruitmentForm(RecruitmentForm.NEWSPAPER);
                    break;

                case 2:
                    setRecruitmentForm(RecruitmentForm.ADVERTISEMENT_BANNER);
                    break;
                case 3:
                    setRecruitmentForm(RecruitmentForm.WEBSITE);
                    break;
                default:
                    break;
            }
        }, []);

        return [highlighted, handleIconClick] as const;
    };

    // State for icon highlight
    const [highlightedIcon, handleIconClick] = useHighlightIcon();

    // Handle CSS UI
    useEffect(() => {
        document.body.style.height = '100vh';
        document.body.style.background = '#f6f5f7';
        document.body.style.display = 'grid';
        document.body.style.placeContent = 'center';
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.height = '';
            document.body.style.background = '';
            document.body.style.display = '';
            document.body.style.placeContent = '';
            document.body.style.overflow = '';
        };
    }, []);

    // Handle animation UI
    const handleOverlayButtonClick = (): void => {
        setRightPanelActive(!isRightPanelActive);
        setBtnScaled(false);
        window.requestAnimationFrame(() => {
            setBtnScaled(true);
        });
    };

    // Handle change in time period
    const handleSetTimePeriod = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        switch (e.target.value) {
            case TimePeriodType.ONE_WEEK:
                setTimePeriod(TimePeriodType.ONE_WEEK);
                break;

            case TimePeriodType.TWO_WEEKS:
                setTimePeriod(TimePeriodType.TWO_WEEKS);
                break;

            case TimePeriodType.ONE_MONTH:
                setTimePeriod(TimePeriodType.ONE_MONTH);
                break;

            case TimePeriodType.TWO_MONTHS:
                setTimePeriod(TimePeriodType.TWO_MONTHS);
                break;

            default:
                break;
        }
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Validate the form data using yup schema
            await schema.validate({
                jobDescribe,
                requestedInformation,
                jobPosition,
                quantity,
                timePeriod,
                recruitmentTime,
                recruitmentForm,
            });

            // Map data to object
            const recruitmentDetails: RecruitmentDetails = {
                quantity: quantity || 1,
                requiredInfo: requestedInformation,
                nominee: {
                    position: jobPosition,
                    description: jobDescribe,
                },
                recruitmentInformation: {
                    timePeriod: timePeriod || TimePeriodType.ONE_WEEK,
                },
            };

            const advertisingForm: AdvertisingForm = {
                advertisingType: recruitmentForm,
                recruitmentTime: getLocalISOString(recruitmentTime),
            };

            // Call API
            const response = await createRecruitmentForm(recruitmentDetails, advertisingForm);

            if (response?.statusCode === 201) {
                toast.success(response.message);
                navigate('/');
            }
        } catch (error: any) {
            toast.error(error.errors ? error.errors[0] : 'Please type correct data');
        }
    };

    // This function converts a date to a local ISO string
    const getLocalISOString = (dateString: string): string => {
        const date = new Date(dateString);

        const isoDateString =
            date.getFullYear().toString().padStart(4, '0') +
            '-' +
            (date.getMonth() + 1).toString().padStart(2, '0') +
            '-' +
            date.getDate().toString().padStart(2, '0') +
            'T' +
            date.getHours().toString().padStart(2, '0') +
            ':' +
            date.getMinutes().toString().padStart(2, '0') +
            ':' +
            date.getSeconds().toString().padStart(2, '0') +
            '.' +
            date.getMilliseconds().toString().padStart(3, '0') +
            'Z';

        return isoDateString;
    };

    return (
        <>
            <div className={clsx(styles.container, { [styles.rightPanelActive]: isRightPanelActive })} id="container">
                <div className={clsx(styles.formContainer, styles.signUpContainer)}>
                    <form onSubmit={handleSubmit}>
                        <h1>Recruitment Form</h1>
                        <span>Share your thoughts with the world from today</span>
                        <div className={styles.infield}>
                            <textarea
                                cols={30}
                                rows={5}
                                placeholder="Job Describe"
                                name="JobDescribe"
                                value={jobDescribe}
                                onChange={(e) => setJobDescribe(e.target.value)}
                            />
                        </div>
                        <div className={styles.infield}>
                            <textarea
                                cols={30}
                                rows={5}
                                placeholder="Requested Information"
                                name="RequestedInformation"
                                value={requestedInformation}
                                onChange={(e) => setRequestedInformation(e.target.value)}
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div className={clsx(styles.formContainer, styles.signInContainer)}>
                    <form>
                        <h1>Recruitment Form</h1>
                        <span>Share your thoughts with the world from today</span>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-circle-user"></i>
                            <input
                                type="text"
                                placeholder="Job Position"
                                name="JobPosition"
                                value={jobPosition}
                                onChange={(e) => setJobPosition(e.target.value)}
                            />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-user-plus"></i>
                            <input
                                type="number"
                                placeholder="Quantity"
                                name="Quantity"
                                value={quantity || ''}
                                min={1}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-calendar-day"></i>
                            <select
                                name="timePeriod"
                                className={styles.datePicker}
                                value={timePeriod || ''}
                                onChange={handleSetTimePeriod}
                            >
                                <option value="" disabled>
                                    Select Time Period
                                </option>
                                <option value={TimePeriodType.ONE_WEEK}>1 week</option>
                                <option value={TimePeriodType.TWO_WEEKS}>2 weeks</option>
                                <option value={TimePeriodType.ONE_MONTH}>1 month</option>
                                <option value={TimePeriodType.TWO_MONTHS}>2 months</option>
                            </select>
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-calendar-check"></i>
                            <input
                                className={styles.datePicker}
                                type="datetime-local"
                                placeholder="Recruitment Time"
                                name="RecruitmentTime"
                                value={recruitmentTime}
                                onChange={(e) => setRecruitmentTime(e.target.value)}
                            />

                            <label></label>
                        </div>
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
            <ul className={styles.backgroundSection}>
                <li>
                    <a href="/">
                        <i className="fa-solid fa-house-user"></i>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fa-solid fa-house-user"></i>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fa-solid fa-house-user"></i>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fa-solid fa-house-user"></i>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fa-solid fa-house-user"></i>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fa-solid fa-house-user"></i>
                    </a>
                </li>
            </ul>
        </>
    );
};

export default Recruitment;
