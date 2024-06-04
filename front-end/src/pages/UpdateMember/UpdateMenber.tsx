import clsx from 'clsx';
import styles from './UpdateMember.module.scss';
import '../../assets/fonts/fontawesome-free-6.5.2/css/all.min.css';
import React, { useState, useEffect } from 'react';

const UpdateMember: React.FC = () => {
    const [isRightPanelActive, setRightPanelActive] = useState(false);
    const [isBtnScaled, setBtnScaled] = useState(false);
    // ------------------------------------------------------------------ //
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

    // ------------------------------------------------------------------ //

    const handleOverlayButtonClick = () => {
        setRightPanelActive(!isRightPanelActive);
        setBtnScaled(false);
        window.requestAnimationFrame(() => {
            setBtnScaled(true);
        });
    };

    return (
        <>
            <div className={clsx(styles.container, { [styles.rightPanelActive]: isRightPanelActive })} id="container">
                <div className={clsx(styles.formContainer, styles.signUpContainer)}>
                    <form action="#">
                        <h1>Enterprise Role</h1>
                        <span>Continue with your role</span>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-building"></i>
                            <input type="text" placeholder="Company Name" name="CompanyName" />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-file-code"></i>
                            <input type="text" placeholder="Tax Code" name="TaxCode" />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-users"></i>
                            <input type="text" placeholder="Company representative" name="CompanyRepresentative" />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-location-dot"></i>
                            <input type="text" placeholder="Address" name="Address" />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-message"></i>
                            <input type="text" placeholder="Contact" name="Contact" />
                            <label></label>
                        </div>
                        <button>Sign Up</button>
                    </form>
                </div>

                <div className={clsx(styles.formContainer, styles.signInContainer)}>
                    <form action="#">
                        <h1>Candidate Role</h1>
                        <span>Continue with your role</span>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-user"></i>
                            <input type="text" placeholder="Full Name" name="FullName" />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-location-dot"></i>
                            <input type="text" placeholder="Address" name="Address" />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <i className="fa-solid fa-message"></i>
                            <input type="text" placeholder="Contact" name="Contact" />
                            <label></label>
                        </div>
                        <button>Sign Up</button>
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

export default UpdateMember;
