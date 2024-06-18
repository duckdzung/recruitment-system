import { useEffect } from 'react';
import styles from './PopUpImage.module.scss';

const PopUpImage = ({ Title = 'Default Title' }) => {
    useEffect(() => {
        document.body.style.margin = '0';
    }, []);

    // Handle exits button
    const handlExitsBtnClick = () => {
        const paymentPage = document.getElementById('popUpPage');

        if (paymentPage) {
            paymentPage.classList.add(styles.displayNone);
        }
    };

    return (
        <div id="popUpPage" className={styles.container}>
            <div className={styles.popUp}>
                <div className={styles.popUpTop}>
                    <div className={styles.checkIcon}>
                        <i className="fa-solid fa-check"></i>
                    </div>
                    <div className={styles.checkIconShadow}>
                        <i className="fa-solid fa-check"></i>
                    </div>
                    <ul className={styles.starOverLay}>
                        <li className={styles.starIcon}>
                            <i className="fa-regular fa-star"></i>
                        </li>
                        <li className={styles.starIcon}>
                            <i className="fa-regular fa-star"></i>
                        </li>
                        <li className={styles.starIcon}>
                            <i className="fa-regular fa-star"></i>
                        </li>
                        <li className={styles.starIcon}>
                            <i className="fa-regular fa-star"></i>
                        </li>
                        <li className={styles.starIcon}>
                            <i className="fa-regular fa-star"></i>
                        </li>
                    </ul>
                </div>
                <div className={styles.popUpBottom}>
                    <span>Success !</span>
                    <p>{Title}</p>
                    <button>Continue</button>
                </div>
            </div>
            <div onClick={handlExitsBtnClick} className={styles.exitsBtn}>
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>
    );
};

export default PopUpImage;
