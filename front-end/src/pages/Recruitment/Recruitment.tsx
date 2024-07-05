import React, { useCallback, useState, useEffect } from 'react';
import { ValidationError } from 'yup';
import clsx from 'clsx';
import styles from './Recruitment.module.scss';
import '../../assets/fonts/fontawesome-free-6.5.2/css/all.min.css';

import newSpaper from '../../assets/images/newspaperIcon.png';
import adBanner from '../../assets/images/advertisingBannerIcon.png';
import onlWebsite from '../../assets/images/onlineWebsiteIcon.png';
import { AdvertisingForm, RecruitmentDetails, RecruitmentForm, TimePeriodType } from '../../types';

import BackgroundSection from '../../components/BackgroundSection/BackgroundSection';

import * as yup from 'yup';
import { toast } from 'react-toastify';
import { createRecruitmentForm } from '../../services/recruitmentService';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { updateAmount, updateRecruitId } from '../../redux/payment/paymentSlice';

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
    const [salary, setSalary] = useState<number>();
    const [experience, setExperience] = useState<string>();
    const [timePeriod, setTimePeriod] = useState<TimePeriodType | null>(null);
    const [recruitmentTime, setRecruitmentTime] = useState<string>('');
    const [recruitmentForm, setRecruitmentForm] = useState<RecruitmentForm>(RecruitmentForm.WEBSITE);

    // State for animation UI
    const [isRightPanelActive, setRightPanelActive] = useState<boolean>(false);
    const [isBtnScaled, setBtnScaled] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Hook to handle icon highlighting
    const useHighlightIcon = () => {
        const [highlighted, setHighlighted] = useState<number | null>(null);

        const handleIconClick = useCallback((index: number) => {
            setHighlighted(index);

            switch (index) {
                case 0:
                    setRecruitmentForm(RecruitmentForm.NEWSPAPER);
                    break;
                case 1:
                    setRecruitmentForm(RecruitmentForm.ADVERTISEMENT_BANNER);
                    break;
                case 2:
                    setRecruitmentForm(RecruitmentForm.WEBSITE);
                    break;
                default:
                    break;
            }
        }, []);

        const handleMouseEnter = useCallback((index: number, isLeftOverlay: boolean) => {
            let context = '';
            switch (index) {
                case 0:
                    context = 'Newspaper';
                    break;
                case 1:
                    context = 'Advertisement Banner';
                    break;
                case 2:
                    context = 'Online Website';
                    break;
                default:
                    break;
            }

            if (isLeftOverlay) {
                const methodLeftElements = document.querySelectorAll(`.${styles.methodLeft}`);

                methodLeftElements.forEach((element, idx) => {
                    if (idx === index) {
                        element.setAttribute('data-context', context);
                    } else {
                        element.removeAttribute('data-context');
                    }
                });
            } else {
                const methodRightElements = document.querySelectorAll(`.${styles.methodRight}`);

                methodRightElements.forEach((element, idx) => {
                    if (idx === index) {
                        element.setAttribute('data-context', context);
                    } else {
                        element.removeAttribute('data-context');
                    }
                });
            }
        }, []);

        return [highlighted, handleIconClick, handleMouseEnter] as const;
    };

    // State for icon highlight
    const [highlightedIcon, handleIconClick, handleMouseEnter] = useHighlightIcon();

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

    // Calculate amount from time period
    const getRecruitmentAmount = (timePeriod: TimePeriodType | null): number => {
        switch (timePeriod) {
            case TimePeriodType.ONE_WEEK:
                return 1000;
            case TimePeriodType.TWO_WEEKS:
                return 2000;
            case TimePeriodType.ONE_MONTH:
                return 5000;
            case TimePeriodType.TWO_MONTHS:
                return 10000;
            default:
                return 1000;
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
                salary: salary || 1,
                experience: experience || '',
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
                recruitmentTime: new Date(recruitmentTime).toISOString(),
            };

            // Call API
            const response = await createRecruitmentForm(recruitmentDetails, advertisingForm);

            if (response?.statusCode === 201) {
                const recruitId = response.data.recruitmentDetails.recruitmentInformation.recruitId;
                const amount = getRecruitmentAmount(timePeriod);

                // Update paymentSlice
                dispatch(updateRecruitId(recruitId));
                dispatch(updateAmount(amount));

                toast.success(response.message);
                navigate(`/payment/${recruitId}`);
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                toast.error(error.errors[0]);
            } else {
                toast.error('Please type correct data');
            }
        }
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
                            <i className="fa-solid fa-money-bill-1-wave"></i>
                            <input
                                type="text"
                                placeholder="Salary"
                                name="salary"
                                value={salary}
                                onChange={(e) => setSalary(Number(e.target.value))}
                            />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-graduation-cap"></i>
                            <input
                                type="text"
                                placeholder="Experience"
                                name="experience"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
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
                                <option value="" disabled hidden>
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
                                        className={clsx(styles.methodLeft, {
                                            [styles.methodHighlight]: highlightedIcon === index,
                                        })}
                                        onClick={() => handleIconClick(index)}
                                        onMouseEnter={() => handleMouseEnter(index, true)}
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
                                        className={clsx(styles.methodRight, {
                                            [styles.methodHighlight]: highlightedIcon === index,
                                        })}
                                        onClick={() => handleIconClick(index)}
                                        onMouseEnter={() => handleMouseEnter(index, false)}
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
            <BackgroundSection />
        </>
    );
};

export default Recruitment;
