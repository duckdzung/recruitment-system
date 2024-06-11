import styles from './Legals.module.scss';

const TalentAcquisition = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <h2>Talent Acquisition Strategy</h2>

                <h3 id="part01">Introduction to Talent Acquisition</h3>
                <p>
                    Talent acquisition is a critical aspect of organizational growth, focusing on identifying,
                    attracting, and hiring skilled individuals who align with the company's values, culture, and
                    strategic goals. Company ABC employs a comprehensive Talent Acquisition Strategy designed to
                    identify and recruit top talent to drive the company's success.
                </p>

                <h3 id="part02">Talent Acquisition Process</h3>
                <h4>A. Identifying Talent Needs:</h4>
                <ul>
                    <li>
                        The talent acquisition process begins with a thorough analysis of the organization's current and
                        future talent needs.
                    </li>
                    <li>
                        Human resource professionals work closely with hiring managers to understand the specific
                        skills, experience, and qualifications required for various positions within the company.
                    </li>
                </ul>
                <h4>B. Employer Branding and Talent Attraction:</h4>
                <ul>
                    <li>Company ABC focuses on building a strong employer brand to attract top talent.</li>
                    <li>
                        Utilizing various channels such as career fairs, social media, job boards, and networking events
                        to promote the company's culture, values, and career opportunities.
                    </li>
                </ul>
                <h4>C. Candidate Sourcing and Screening:</h4>
                <ul>
                    <li>
                        Talent acquisition specialists employ a multi-faceted approach to source potential candidates.
                    </li>
                    <li>
                        Utilizing online job portals, professional networks, employee referrals, and headhunting
                        techniques to identify qualified candidates.
                    </li>
                    <li>
                        Screening resumes, conducting initial interviews, and assessing candidate qualifications to
                        ensure alignment with the job requirements and organizational culture.
                    </li>
                </ul>
                <h4>D. Interviewing and Selection:</h4>
                <ul>
                    <li>
                        Conducting structured interviews, behavioral assessments, and technical evaluations to further
                        assess candidate suitability.
                    </li>
                    <li>
                        Involving key stakeholders and hiring managers in the interview process to evaluate candidates'
                        skills, competencies, and cultural fit.
                    </li>
                    <li>
                        Selecting candidates who best meet the job requirements, demonstrate potential for growth, and
                        align with the company's values and culture.
                    </li>
                </ul>
                <h4>E. Offer Negotiation and Onboarding:</h4>
                <ul>
                    <li>
                        Extending job offers to selected candidates and negotiating terms of employment, including
                        salary, benefits, and start dates.
                    </li>
                    <li>
                        Providing a seamless onboarding experience for new hires, including orientation programs,
                        training sessions, and introductions to key team members and company policies.
                    </li>
                </ul>

                <h3 id="part03">Benefits of Company ABC's Talent Acquisition Strategy</h3>
                <ul>
                    <li>
                        Access to Top Talent: The strategic approach to talent acquisition ensures access to a diverse
                        pool of top-tier candidates with the skills and experience needed to drive the company forward.
                    </li>
                    <li>
                        Enhanced Employer Brand: Company ABC's commitment to attracting and retaining top talent
                        enhances its reputation as an employer of choice in the industry.
                    </li>
                    <li>
                        Improved Employee Retention: By hiring candidates who align with the company's values and
                        culture, the talent acquisition strategy contributes to higher employee engagement,
                        satisfaction, and retention rates.
                    </li>
                    <li>
                        Support for Organizational Growth: The recruitment of skilled and qualified professionals
                        enables Company ABC to achieve its strategic objectives, drive innovation, and maintain a
                        competitive edge in the market.
                    </li>
                </ul>
            </div>
            <div className={styles.rightPanel}>
                <ul className={styles.backgoroundSection}>
                    <li>
                        <a href="#part01">Introduction</a>
                    </li>
                    <li>
                        <a href="#part02">Talent Acquisition Process</a>
                    </li>
                    <li>
                        <a href="#part03">Benefits</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TalentAcquisition;
