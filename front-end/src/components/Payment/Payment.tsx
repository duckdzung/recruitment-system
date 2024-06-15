import styles from './Payment.module.scss';
import { useRef, useEffect } from 'react';
import clsx from 'clsx';

import visa from '../../assets/images/visa.png';
import chip from '../../assets/images/chip.png';
import useDraggable from './useDraggable';

const Payment = () => {
    const cardNumberInputRef = useRef<HTMLInputElement>(null);
    const cardHolderInputRef = useRef<HTMLInputElement>(null);
    const monthInputRef = useRef<HTMLSelectElement>(null);
    const yearInputRef = useRef<HTMLSelectElement>(null);
    const cvvInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleCardNumberInput = () => {
            const cardNumberBox = document.querySelector(`.${styles.cardNumber}`) as HTMLElement;
            if (cardNumberBox) cardNumberBox.innerText = cardNumberInputRef.current!.value;
        };

        const handleCardHolderInput = () => {
            const cardHolderName = document.querySelector(`.cardHolderName`) as HTMLElement;
            if (cardHolderName) cardHolderName.innerText = cardHolderInputRef.current!.value;
        };

        const handleMonthInput = () => {
            const expMonth = document.querySelector(`.expMonth`) as HTMLElement;
            if (expMonth) expMonth.innerText = monthInputRef.current!.value;
        };

        const handleYearInput = () => {
            const expYear = document.querySelector(`.expYear`) as HTMLElement;
            if (expYear) expYear.innerText = yearInputRef.current!.value;
        };

        const handleCvvMouseEnter = () => {
            const front = document.querySelector(`.${styles.front}`) as HTMLElement;
            const back = document.querySelector(`.${styles.back}`) as HTMLElement;
            if (front && back) {
                front.style.transform = 'perspective(1000px) rotateY(-180deg)';
                back.style.transform = 'perspective(1000px) rotateY(0deg)';
            }
        };

        const handleCvvMouseLeave = () => {
            const front = document.querySelector(`.${styles.front}`) as HTMLElement;
            const back = document.querySelector(`.${styles.back}`) as HTMLElement;
            if (front && back) {
                front.style.transform = 'perspective(1000px) rotateY(0deg)';
                back.style.transform = 'perspective(1000px) rotateY(180deg)';
            }
        };

        const handleCvvInput = () => {
            const cvvBox = document.querySelector(`.${styles.cvvBox}`) as HTMLElement;
            if (cvvBox) cvvBox.innerText = cvvInputRef.current!.value;
        };

        cardNumberInputRef.current!.addEventListener('input', handleCardNumberInput);
        cardHolderInputRef.current!.addEventListener('input', handleCardHolderInput);
        monthInputRef.current!.addEventListener('input', handleMonthInput);
        yearInputRef.current!.addEventListener('input', handleYearInput);
        cvvInputRef.current!.addEventListener('mouseenter', handleCvvMouseEnter);
        cvvInputRef.current!.addEventListener('mouseleave', handleCvvMouseLeave);
        cvvInputRef.current!.addEventListener('input', handleCvvInput);
    }, []);

    // Handle exits button
    const handlExitsBtnClick = () => {
        const exitsBtn = document.getElementById('exitsBtn');
        const paymentPage = document.getElementById('paymentPage');

        if (exitsBtn && paymentPage) {
            paymentPage.classList.add(styles.displayNone);
        }
    };

    // Handle for draggable
    const { position, isDragging, onMouseDown, ref } = useDraggable();

    return (
        <div
            id="paymentPage"
            className={clsx(styles.container, isDragging && styles.dragging)}
            style={{ left: position.x, top: position.y }}
            ref={ref}
            onMouseDown={onMouseDown}
        >
            <form action="" className={styles.paymentForm}>
                <div className={styles.card}>
                    <div className={styles.front}>
                        <div className={styles.cardBackground}>
                            <div></div>
                        </div>
                        <div className={styles.image}>
                            <img src={chip} alt="Visa Chip" />
                            <img src={visa} alt="Visa" />
                        </div>
                        <div className={styles.cardNumber}>################</div>
                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoSection01}>
                                <span>card holder</span>
                                <div className="cardHolderName">full name</div>
                            </div>
                            <div className={styles.cardInfoSection01}>
                                <span>expires</span>
                                <div className={styles.expiration}>
                                    <span className="expMonth">mm</span>
                                    <span>/</span>
                                    <span className="expYear">yy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.back}>
                        <div className={styles.stripe}></div>
                        <div className={styles.cardInfoSection02}>
                            <div className={styles.cvvBox}></div>
                            <img src={visa} alt="Visa Logo" />
                        </div>
                    </div>
                </div>
                <div className={styles.details}>
                    <div className={styles.detailsSection01}>
                        <div className={styles.inputBox}>
                            <input type="email" placeholder="Email" />
                            <label></label>
                        </div>

                        <div className={styles.inputBox}>
                            <input type="tel" placeholder="Phone Number" />
                            <label></label>
                        </div>
                    </div>
                    <div className={styles.detailsSection02}>
                        <div className={styles.inputBox}>
                            <input type="text" maxLength={16} placeholder="Card Number" ref={cardNumberInputRef} />
                            <label></label>
                        </div>

                        <div className={styles.inputBox}>
                            <input type="text" maxLength={20} placeholder="Card Holder" ref={cardHolderInputRef} />
                            <label></label>
                        </div>
                    </div>
                    <div className={styles.detailsSection03}>
                        <div className={clsx(styles.inputBox, styles.dateInput)}>
                            <select name="" id="" ref={monthInputRef}>
                                <option value="Month" selected disabled>
                                    Month
                                </option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <label></label>
                        </div>

                        <div className={clsx(styles.inputBox, styles.dateInput)}>
                            <select name="" id="" ref={yearInputRef}>
                                <option value="Year" selected disabled>
                                    Year
                                </option>
                                <option value="2019">2021</option>
                                <option value="2020">2021</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                            </select>
                            <label></label>
                        </div>

                        <div className={clsx(styles.inputBox, styles.cvvInput)}>
                            <input type="text" placeholder="CVV" maxLength={4} ref={cvvInputRef} />
                            <label></label>
                        </div>
                    </div>
                    <div className={styles.detailsSection04}>
                        <input type="submit" value="Click here to pay" />
                    </div>
                </div>
                <div className={styles.exits}>
                    <i id="exitsBtn" className="fa-solid fa-xmark" onClick={handlExitsBtnClick}></i>
                </div>
            </form>
        </div>
    );
};
export default Payment;
