import styles from './BackgroundSection.module.scss';
import { Link } from 'react-router-dom';

const BackgroundSection = () => {
    return (
        <ul className={styles.backgroundSection}>
            {/* Top */}
            <li>
                <i className="fa-solid fa-house-user"></i>
            </li>
            <li>
                <i className="fa-solid fa-house-user"></i>
            </li>
            <li>
                <i className="fa-solid fa-house-user"></i>
            </li>
            <li>
                <i className="fa-solid fa-house-user"></i>
            </li>
            <li>
                <i className="fa-solid fa-house-user"></i>
            </li>
            <li>
                <i className="fa-solid fa-house-user"></i>
            </li>

            {/* Bottom */}
            <li>
                <i className="fa-solid fa-house-user"></i>
            </li>
            <li>
                <i className="fa-solid fa-house-user"></i>
            </li>
            <li>
                <i className="fa-solid fa-house-user"></i>
            </li>
            <li>
                <i className="fa-solid fa-house-user"></i>
            </li>
            <li>
                <i className="fa-solid fa-house-user"></i>
            </li>
            <li>
                <i className="fa-solid fa-house-user"></i>
            </li>

            {/* Back Home */}
            <li>
                <Link to="/">
                    <i className="fa-solid fa-house-user"></i>
                </Link>
            </li>
        </ul>
    );
};

export default BackgroundSection;
