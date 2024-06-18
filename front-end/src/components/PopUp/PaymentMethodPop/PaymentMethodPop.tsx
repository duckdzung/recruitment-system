import { useEffect } from 'react';
import styles from './PaymentMethodPop.module.scss';

const PaymentMethodPop = () => {
    useEffect(() => {
        document.body.style.margin = '0';
        return () => {
            document.body.style.margin = '';
        };
    }, []);

    // Hanlde for exits button click
    const handlExitsBtnClick = () => {
        const paymentPage = document.getElementById('paymentMethodPopUp');

        if (paymentPage) {
            paymentPage.classList.add(styles.displayNone);
        }
    };

    return (
        <>
            <div id="paymentMethodPopUp" className={styles.container}>
                <div className={styles.popUp}>
                    <div className={styles.popUpTop}>
                        <div className={styles.left}>
                            <div className={styles.icon}>
                                <i className="fa-solid fa-battery-full"></i>
                            </div>
                            <div className={styles.text}>
                                <span>Full</span>
                                <p>Pay all amounts in one payment !</p>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <span>Get payment method</span>
                            <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                    </div>
                    <div className={styles.popUpBottom}>
                        <div className={styles.left}>
                            {' '}
                            <div className={styles.icon}>
                                <i className="fa-solid fa-battery-quarter"></i>
                            </div>
                            <div className={styles.text}>
                                <span>Phase</span>
                                <p>Payment in installments, every 6 months !</p>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <span>Get payment method</span>
                            <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                    </div>
                </div>
                <div onClick={handlExitsBtnClick} className={styles.exitsBtn}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
        </>
    );
};
export default PaymentMethodPop;
