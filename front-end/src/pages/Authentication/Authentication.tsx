import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import clsx from 'clsx';
import styles from './Authentication.module.scss';
import '../../assets/fonts/fontawesome-free-6.5.2/css/all.min.css';
import { ApiResponse, Credentials } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { loginThunk } from '../../redux/auth/authThunks';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../services/authService';
import { loginSuccess } from '../../redux/auth/authSlice';

const Authentication: React.FC = () => {
    // State for animation UI
    const [isRightPanelActive, setRightPanelActive] = useState<boolean>(false);
    const [isBtnScaled, setBtnScaled] = useState<boolean>(false);

    // State for creditials
    const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });

    // Get dispatch from redux
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Hanlde css UI
    useEffect(() => {
        const pathname = location.pathname;
        if (pathname === '/register') {
            setRightPanelActive(true);
        }

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

        // Hanlde navigate to login or register, reset data
        setCredentials({ email: '', password: '' });
        const pathname = location.pathname;
        if (pathname === '/login') {
            navigate('/register');
        } else {
            navigate('/login');
        }
    };

    // Handle input changes for login form
    const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    // Handle input changes for register form
    const handleRegisterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    // Handle login form submission
    const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate credentials
        if (!credentials.email || !credentials.password) {
            toast.error('Please fill in all fields');
            return;
        }

        // Call api login
        dispatch(loginThunk(credentials));
    };

    // Handle register form submission
    const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate credentials
        if (!credentials.email || !credentials.password) {
            toast.error('Please fill in all fields');
            return;
        }

        // Call api register
        const response: ApiResponse = await register(credentials);

        // Register sucessfully
        if (response && response.statusCode === 201) {
            toast.success(response.message);
            const { accessToken, refreshToken, role } = response.data;
            dispatch(loginSuccess({ accessToken, refreshToken, role }));
            navigate('/update-member');
        }
    };

    return (
        <div className={clsx(styles.container, { [styles.rightPanelActive]: isRightPanelActive })} id="container">
            <div className={clsx(styles.formContainer, styles.signUpContainer)}>
                <form onSubmit={handleRegisterSubmit}>
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
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={credentials.email}
                            onChange={handleRegisterInputChange}
                        />
                        <label></label>
                    </div>

                    <div className={styles.infield}>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={credentials.password}
                            onChange={handleRegisterInputChange}
                        />
                        <label></label>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            <div className={clsx(styles.formContainer, styles.signInContainer)}>
                <form onSubmit={handleLoginSubmit}>
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
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={credentials.email}
                            onChange={handleLoginInputChange}
                        />
                        <label></label>
                    </div>
                    <div className={styles.infield}>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={credentials.password}
                            onChange={handleLoginInputChange}
                        />
                        <label></label>
                    </div>
                    <a href="#" className={styles.forgot}>
                        Forgot your password?
                    </a>
                    <button type="submit">Sign In</button>
                </form>
            </div>

            <div className={styles.overlayContainer} id="overlayCon">
                <div className={styles.overlay}>
                    <div className={clsx(styles.overlayPanel, styles.overlayLeft)}>
                        <h1>Welcome to ABC Company!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <i id={styles.signInBtn} className="fa-solid fa-user-shield"></i>
                        <button onClick={handleOverlayButtonClick}>Sign In</button>
                    </div>
                    <div className={clsx(styles.overlayPanel, styles.overlayRight)}>
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <i id={styles.signUpBtn} className="fa-solid fa-user-plus"></i>
                        <button onClick={handleOverlayButtonClick}>Sign Up</button>
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

export default Authentication;
