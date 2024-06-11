import styles from './Legals.module.scss';

const CompensationConsulting = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <h2>Compensation Consulting Service</h2>

                <h3 id="part01">Introduction to Compensation Consulting Service</h3>
                <p>
                    Compensation consulting service is an essential part of effective human resource management for
                    businesses, especially in the areas of recruitment and employee retention. Company ABC provides
                    compensation consulting service to support businesses in identifying and establishing fair and
                    competitive compensation policies and strategies.
                </p>

                <h3 id="part02">Compensation Consulting Process</h3>
                <h4>A. Analysis of the Company's Needs:</h4>
                <ul>
                    <li>
                        Consultants will receive requests from businesses regarding their recruitment needs and factors
                        related to compensation such as job positions, salary levels, benefits, etc.
                    </li>
                    <li>
                        Analyze internal and external factors affecting the company's compensation strategy, such as the
                        business environment, industry competition, and staffing requirements.
                    </li>
                </ul>
                <h4>B. Assessment and Consultation:</h4>
                <ul>
                    <li>
                        Consultants will conduct assessments and compare the company's current salary levels and
                        compensation policies with those of similar businesses in the industry to propose improvements.
                    </li>
                    <li>
                        Collaborate with the business to develop appropriate compensation policies and strategies
                        aligned with the company's goals and development strategy.
                    </li>
                </ul>
                <h4>C. Establishment of Compensation Policies and Strategies:</h4>
                <ul>
                    <li>
                        Based on the information collected and assessed, consultants will help the business develop
                        appropriate compensation policies and strategies.
                    </li>
                    <li>
                        Develop basic salary levels, allowances, bonuses, and other related policies to ensure fairness
                        and competitiveness in attracting and retaining high-caliber employees.
                    </li>
                </ul>
                <h4>D. Support Implementation and Monitoring:</h4>
                <ul>
                    <li>Support the business in implementing compensation policies and strategies in practice.</li>
                    <li>
                        Implement monitoring and evaluation measures to assess the effectiveness of compensation
                        policies and propose necessary adjustments.
                    </li>
                </ul>

                <h3 id="part03">Benefits of Company ABC's Compensation Consulting Service</h3>
                <ul>
                    <li>
                        Cost optimization: Compensation consulting helps the business determine appropriate salary
                        levels and compensation policies, optimizing human resource costs.
                    </li>
                    <li>
                        Attracting and retaining talented employees: Fair and competitive compensation strategies help
                        the business attract and retain high-caliber employees.
                    </li>
                    <li>
                        Enhancing labor productivity: Reasonable salary levels and benefits provide motivation for
                        employees to work effectively and contribute positively to the company's development.
                    </li>
                    <li>
                        Meeting legal requirements: Compensation strategies are built based on current legal
                        regulations, helping businesses comply with labor compensation regulations.
                    </li>
                </ul>
            </div>
            <div className={styles.rightPanel}>
                <ul className={styles.backgoroundSection}>
                    <li>
                        <a href="#part01">Introduction</a>
                    </li>
                    <li>
                        <a href="#part02">Compensation Consulting Process</a>
                    </li>
                    <li>
                        <a href="#part03">Benefits</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CompensationConsulting;
