import { useEffect, useRef } from 'react';
import styles from './PopUpImage.module.scss';

const PopUpImage = ({ Title = 'Default Title' }) => {
    // Effect for body element
    useEffect(() => {
        document.body.style.margin = '0';
        return () => {
            document.body.style.margin = '';
        };
    }, []);

    // Handle exits button
    const paymentPageRef = useRef<HTMLDivElement>(null);

    const handlExitsBtnClick = () => {
        if (paymentPageRef.current) {
            paymentPageRef.current.classList.add(styles.displayNone);
        }
    };

    return (
        <div ref={paymentPageRef} className={styles.container}>
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
                <div className={styles.popUpBottom} onClick={handlExitsBtnClick}>
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
