import clsx from 'clsx';

import logo from '../../assets/images/logo.png';
import styles from './Header.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Role } from '../../types';
import { logoutThunk } from '../../redux/auth/authThunks';
import { Link } from 'react-router-dom';

const Header = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

    const handleLogout = (): void => {
        dispatch(logoutThunk());
    };

    return (
        <>
            <header className={styles.header}>
                <div className={clsx(styles.headerTop, styles.displayFlex)}>
                    <div className={clsx(styles.leftTop, styles.displayFlex)}>
                        <div className={clsx(styles.leftTopItem, styles.displayFlex)}>
                            <i className="fa-solid fa-square-envelope"></i>
                            <p>Email Address: example@gmail.com</p>
                        </div>
                        <div className={clsx(styles.leftTopItem, styles.displayFlex)}>
                            <i className="fa-solid fa-map-location-dot"></i>
                            <p>Office Address: Ho Chi Minh City, Vietnam</p>
                        </div>
                    </div>
                    <div className={clsx(styles.rightTop, styles.displayFlex)}>
                        <div className={clsx(styles.account, styles.rightTop, styles.displayFlex)}>
                            <i className="fa-solid fa-user"></i>
                            <span>Account</span>
                            {isAuthenticated ? (
                                <div className={styles.dropdownList}>
                                    <div>
                                        <i className="fa-solid fa-user"></i>
                                        <span>Username</span>
                                    </div>
                                    <hr />
                                    <ul>
                                        <li>
                                            <a href="#" className={styles.dropdownItem}>
                                                <i className="fa-regular fa-address-card"></i>
                                                <span>Profile</span>
                                            </a>
                                        </li>

                                        {(role === Role.PRESIDENT || role === Role.STAFF) && (
                                            <li>
                                                <a href="#" className={styles.dropdownItem}>
                                                    <i className="fa-regular fa-folder-closed"></i>
                                                    <span>System Management</span>
                                                </a>
                                            </li>
                                        )}

                                        <li>
                                            <a href="#" className={styles.dropdownItem}>
                                                <i className="fa-solid fa-gears"></i>
                                                <span>Settings</span>
                                            </a>
                                        </li>

                                        <li>
                                            <span className={styles.dropdownItem} onClick={handleLogout}>
                                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                                <span>Logout</span>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <div className={styles.dropdownList}>
                                    <ul>
                                        <li>
                                            <Link to="/login" className={styles.dropdownItem}>
                                                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                                <span>Login</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <form action="" className={styles.searchBox}>
                            <input
                                type="text"
                                className={clsx(styles.searchText, styles.searchPlaceholder)}
                                placeholder="Search"
                                required
                            />
                            <button className={styles.searchButton}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>
                    </div>
                </div>

                <div className={styles.headerBottom}>
                    <div className={clsx(styles.leftBottom, styles.displayFlex)}>
                        <a href="">
                            <img src={logo} alt="logo" />
                        </a>
                        <div className={clsx(styles.menuItem, styles.displayFlex)}>
                            <a href="">Home</a>
                            <a href="">Pages</a>
                            <a href="">Services</a>
                            <a href="">Projects</a>
                            <a href="">Blog</a>
                            <a href="">Contact Us</a>
                        </div>
                    </div>

                    <div className={clsx(styles.rightBottom, styles.displayFlex)}>
                        <a href="" className={clsx(styles.displayFlex, styles.centered, styles.chatButton)}>
                            <i className="fa-regular fa-comments chat-button"></i>
                        </a>
                        <div>
                            <p style={{ fontWeight: 'bold' }}>Have any Question?</p>
                            <p>+0 123 456 789</p>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
