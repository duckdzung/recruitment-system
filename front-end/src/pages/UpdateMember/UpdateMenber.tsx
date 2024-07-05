import clsx from 'clsx';
import styles from './UpdateMember.module.scss';
import '../../assets/fonts/fontawesome-free-6.5.2/css/all.min.css';
import React, { useState, useEffect, FormEvent } from 'react';
import { ApiResponse, MemberDetails, Role } from '../../types';
import { updateMember } from '../../services/memberService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BackgroundSection from '../../components/BackgroundSection/BackgroundSection';

const defaultMemberDetails = {
    name: '',
    phoneNumber: '',
    address: '',
    companyName: '',
    taxCode: '',
    role: Role.CANDIDATE,
};

const UpdateMember: React.FC = () => {
    // State for animation UI
    const [isRightPanelActive, setRightPanelActive] = useState(false);
    const [isBtnScaled, setBtnScaled] = useState(false);

    // State for form data
    const [memberDetails, setMemberDetails] = useState<MemberDetails>(defaultMemberDetails);

    const navigate = useNavigate();

    // Handle for css
    useEffect(() => {
        document.body.style.height = '100vh';
        document.body.style.background = '#f6f5f7';
        document.body.style.display = 'grid';
        document.body.style.placeContent = 'center';
        document.body.style.position = 'relative';
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.height = '';
            document.body.style.background = '';
            document.body.style.display = '';
            document.body.style.placeContent = '';
            document.body.style.position = '';
            document.body.style.overflow = '';
        };
    }, []);

    // Handle for Overlay Button click
    const handleOverlayButtonClick = () => {
        setRightPanelActive(!isRightPanelActive);
        setBtnScaled(false);
        window.requestAnimationFrame(() => {
            setBtnScaled(true);
        });

        // Reset state and change role
        setMemberDetails({
            ...defaultMemberDetails,
            role: isRightPanelActive ? Role.CANDIDATE : Role.ENTERPRISE,
        });
    };

    // Handle input change for memberDetails
    const handleMemberDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMemberDetails({
            ...memberDetails,
            [name]: value,
        });
    };

    // Process form update member
    const handleUpdateMemberSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response: ApiResponse = await updateMember(memberDetails);

        // Update sucessfully
        if (response && response.statusCode === 201) {
            toast.success(response.message);
            navigate('/');
        }
    };

    return (
        <>
            <div className={clsx(styles.container, { [styles.rightPanelActive]: isRightPanelActive })} id="container">
                <div className={clsx(styles.formContainer, styles.signUpContainer)}>
                    <form onSubmit={handleUpdateMemberSubmit}>
                        <h1>Enterprise Role</h1>
                        <span>Continue with your role</span>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-building"></i>
                            <input
                                type="text"
                                placeholder="Company Name"
                                name="companyName"
                                value={memberDetails.companyName}
                                onChange={handleMemberDetailsChange}
                            />
                            <label></label>
                        </div>

                        <div className={styles.infield}>
                            <i className="fa-solid fa-file-code"></i>
                            <input
                                type="text"
                                placeholder="Tax Code"
                                name="taxCode"
                                value={memberDetails.taxCode}
                                onChange={handleMemberDetailsChange}
                            />
                            <label></label>
                        </div>

                        <div className={styles.infield}>
                            <i className="fa-solid fa-users"></i>
                            <input
                                type="text"
                                placeholder="Company representative"
                                name="name"
                                value={memberDetails.name}
                                onChange={handleMemberDetailsChange}
                            />
                            <label></label>
                        </div>

                        <div className={styles.infield}>
                            <i className="fa-solid fa-location-dot"></i>
                            <input
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={memberDetails.address}
                                onChange={handleMemberDetailsChange}
                            />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-message"></i>
                            <input
                                type="text"
                                placeholder="Phone number"
                                name="phoneNumber"
                                value={memberDetails.phoneNumber}
                                onChange={handleMemberDetailsChange}
                            />
                            <label></label>
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                <div className={clsx(styles.formContainer, styles.signInContainer)}>
                    <form onSubmit={handleUpdateMemberSubmit}>
                        <h1>Candidate Role</h1>
                        <span>Continue with your role</span>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-user"></i>
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="name"
                                value={memberDetails.name}
                                onChange={handleMemberDetailsChange}
                            />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-location-dot"></i>
                            <input
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={memberDetails.address}
                                onChange={handleMemberDetailsChange}
                            />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-message"></i>
                            <input
                                type="text"
                                placeholder="Phone number"
                                name="phoneNumber"
                                value={memberDetails.phoneNumber}
                                onChange={handleMemberDetailsChange}
                            />
                            <label></label>
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                <div className={styles.overlayContainer} id="overlayCon">
                    <div className={styles.overlay}>
                        <div className={clsx(styles.overlayPanel, styles.overlayLeft)}>
                            <h1>Update To Candidate Role!</h1>
                            <p>Share your thoughts with the world from today!</p>
                            <i id={styles.signInBtn} className="fa-solid fa-user-tie"></i>
                            <button>Candidate</button>
                        </div>
                        <div className={clsx(styles.overlayPanel, styles.overlayRight)}>
                            <h1>Update To Enterprise Role!</h1>
                            <p>Share your thoughts with the world from today!</p>
                            <i id={styles.signUpBtn} className="fa-solid fa-building-user"></i>
                            <button>Enterprise</button>
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

export default UpdateMember;
