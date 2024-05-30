import clsx from 'clsx';
import styles from './Login.module.scss';
import '../../assets/fonts/fontawesome-free-6.5.2/css/all.min.css';
import React, { useState, useEffect } from 'react';

const Authentication: React.FC = () => {
    const [isRightPanelActive, setRightPanelActive] = useState(false);
    const [isBtnScaled, setBtnScaled] = useState(false);
    // ------------------------------------------------------------------ //
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
                        <h1>Create Account</h1>
                        <div className={styles.socialContainer}>
                            <a href="#" className={styles.social}>
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className={styles.social}>
                                <i className="fab fa-google-plus-g"></i>
                            </a>
                            <a href="#" className={styles.social}>
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span>or use your email for registration</span>
                        <div className={styles.infield}>
                            <input type="text" placeholder="Username" />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <input type="email" placeholder="Email" name="email" />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <input type="password" placeholder="Password" />
                            <label></label>
                        </div>
                        <button>Sign Up</button>
                    </form>
                </div>

                <div className={clsx(styles.formContainer, styles.signInContainer)}>
                    <form action="#">
                        <h1>Sign in</h1>
                        <div className={styles.socialContainer}>
                            <a href="#" className={styles.social}>
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className={styles.social}>
                                <i className="fab fa-google-plus-g"></i>
                            </a>
                            <a href="#" className={styles.social}>
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span>or use your account</span>
                        <div className={styles.infield}>
                            <input type="email" placeholder="Email" name="email" />
                            <label></label>
                        </div>
                        <div className={styles.infield}>
                            <input type="password" placeholder="Password" />
                            <label></label>
                        </div>
                        <a href="#" className={styles.forgot}>
                            {' '}
                            Forgot your password?{' '}
                        </a>
                        <button>Sign In</button>
                    </form>
                </div>

                <div className={styles.overlayContainer} id="overlayCon">
                    <div className={styles.overlay}>
                        <div className={clsx(styles.overlayPanel, styles.overlayLeft)}>
                            <h1>Welcome to ABC Company!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <i id={styles.signInBtn} className="fa-solid fa-user-shield"></i>
                            <button>Sign In</button>
                        </div>
                        <div className={clsx(styles.overlayPanel, styles.overlayRight)}>
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <i id={styles.signUpBtn} className="fa-solid fa-user-plus"></i>
                            <button>Sign Up</button>
                        </div>
                    </div>
                    <button
                        id={styles.overlayBtn}
                        className={clsx({ [styles.btnScaled]: isBtnScaled })}
                        onClick={handleOverlayButtonClick}
                    ></button>
                </div>
            </div>
        </>
    );
};

export default Authentication;
