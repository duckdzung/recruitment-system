import clsx from 'clsx';

import logo from '../../assets/images/logo.svg';
import styles from './Header.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Role } from '../../types';
import { logoutThunk } from '../../redux/auth/authThunks';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, role, username } = useSelector((state: RootState) => state.auth);

    // State for search job
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [locationList] = useState<string[]>(['Hồ Chí Minh', 'Hà Nội']);
    const [position, setPosition] = useState<string>('');

    const handleLogout = (): void => {
        dispatch(logoutThunk());
    };

    // Handle for search button click
    const handleSearchButtonClick = () => {
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay) {
            searchOverlay.classList.remove(styles.displayNone);
            searchOverlay.classList.add(styles.displayFlex);
        }
    };

    // Handle for back search
    const handleBackSearchClick = () => {
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay) {
            searchOverlay.classList.remove(styles.displayFlex);
            searchOverlay.classList.add(styles.displayNone);
        }
    };

    // Handle search job
    const handleSearchJob = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleBackSearchClick();
        navigate(`/job-list?position=${position}&location=${selectedLocation}`);
    };

    return (
        <header className={styles.header}>
            <div className={clsx(styles.headerTop, styles.displayFlex)}>
                <div className={clsx(styles.leftTop, styles.displayFlex)}>
                    <div className={clsx(styles.leftTopItem, styles.displayFlex)}>
                        <i className="fa-regular fa-envelope"></i>
                        <p>Email Address: Example@gmail.com</p>
                    </div>
                    <div className={clsx(styles.leftTopItem, styles.displayFlex)}>
                        <i className="fa-regular fa-building"></i>
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
                                    <span>{username}</span>
                                </div>
                                <hr />
                                <ul>
                                    {role === Role.MEMBER && (
                                        <li>
                                            <Link to="/update-member" className={styles.dropdownItem}>
                                                <i className="fa-solid fa-circle-up"></i>
                                                <span>Update member</span>
                                            </Link>
                                        </li>
                                    )}

                                    <li>
                                        <Link to="/profile" className={styles.dropdownItem}>
                                            <i className="fa-regular fa-address-card"></i>
                                            <span>Profile</span>
                                        </Link>
                                    </li>

                                    {(role === Role.PRESIDENT || role === Role.STAFF) && (
                                        <li>
                                            <Link to="/admin/enterpise-listing" className={styles.dropdownItem}>
                                                <i className="fa-regular fa-folder-closed"></i>
                                                <span>System Management</span>
                                            </Link>
                                        </li>
                                    )}

                                    {role === Role.ENTERPRISE && (
                                        <li>
                                            <Link to="/recruitment" className={styles.dropdownItem}>
                                                <i className="fa-regular fa-folder-closed"></i>
                                                <span>Recruitment form</span>
                                            </Link>
                                        </li>
                                    )}

                                    <li>
                                        <Link to="/settings" className={styles.dropdownItem}>
                                            <i className="fa-solid fa-gears"></i>
                                            <span>Settings</span>
                                        </Link>
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

                    <div className={clsx(styles.searchBox, styles.displayFlex, styles.centered)}>
                        <i className="fa-solid fa-magnifying-glass" onClick={handleSearchButtonClick}></i>
                        <div id="searchOverlay" className={clsx(styles.searchOverlay, styles.displayNone)}>
                            <form onSubmit={handleSearchJob} className={styles.searchPanel}>
                                <input
                                    type="text"
                                    className={clsx(styles.searchText, styles.searchPlaceholder)}
                                    placeholder="Search by job position ..."
                                    required
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                />
                                <button className={styles.searchButton}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                                <div className={clsx(styles.searchLocation, styles.displayFlex, styles.centered)}>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <span>{selectedLocation || 'Location'}</span>
                                    <i className="fa-solid fa-angle-down"></i>

                                    <ul className={styles.locationList}>
                                        {locationList?.map((location: string, index: number) => (
                                            <li
                                                key={index}
                                                className={styles.locationListItem}
                                                onClick={() => setSelectedLocation(location)}
                                            >
                                                <i className="fa-solid fa-location-dot"></i>
                                                <span>{location}</span>
                                            </li>
                                        ))}

                                        <li className={styles.locationListItem}>
                                            <i className="fa-solid fa-location-dot"></i>
                                            <span>Kiên Giang</span>
                                        </li>

                                        <li className={styles.locationListItem}>
                                            <i className="fa-solid fa-location-dot"></i>
                                            <span>An Giang</span>
                                        </li>
                                    </ul>
                                </div>
                            </form>
                            <i onClick={handleBackSearchClick} className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.headerBottom}>
                <div className={clsx(styles.leftBottom, styles.displayFlex)}>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    <div className={clsx(styles.menuItem, styles.displayFlex)}>
                        <Link to="/">Home</Link>
                        <Link to="/job-list">Find Work</Link>
                        <Link to="/test">Test</Link>
                        <Link to="#">Projects</Link>
                        <Link to="#">Blog</Link>
                        <Link to="/contact">Contact Us</Link>
                    </div>
                </div>

                <div className={clsx(styles.rightBottom, styles.displayFlex)}>
                    <Link to="#" className={clsx(styles.chatButton, styles.displayFlex, styles.centered)}>
                        <i className="fa-brands fa-rocketchat"></i>
                    </Link>
                    <div>
                        <p style={{ fontWeight: 'bold' }}>Have any Question?</p>
                        <p>+0 123 456 789</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
