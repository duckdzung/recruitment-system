import styles from './Legals.module.scss';

const OrganizationalStructures = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <h2>Functionality of the Web Platform</h2>
                <h3 id="part01">User Registration</h3>
                <h4>Employer Registration:</h4>
                <ul>
                    <li>
                        Employers can either visit the company in person or contact the staff via phone to register.
                    </li>
                    <li>
                        Staff will ask employers to fill out a membership registration form including: company name, tax
                        code, representative, address, and contact email.
                    </li>
                    <li>
                        Staff will check if the company's information is complete and not already in the system's list
                        of companies.
                    </li>
                    <li>
                        Staff will verify the registration information within one week. If the information is valid, the
                        staff will respond to the company with the valid information and they can register to recruit
                        candidates.
                    </li>
                    <li>
                        If the company's information is invalid, the staff will contact the company to request that the
                        information be corrected.
                    </li>
                </ul>
                <h4>Candidate Registration:</h4>
                <ul>
                    <li>
                        Candidates who want to apply for a position posted on the ABC company's system need to register
                        as members of the company.
                    </li>
                    <li>When registering as a member, candidates need to provide personal information.</li>
                    <li>Staff will check that the personal information is complete and correct.</li>
                    <li>Staff will check the candidate's information.</li>
                    <li>
                        Once the candidate has registered their member information, the staff will provide the candidate
                        with a list of available positions.
                    </li>
                    <li>
                        Candidates will select the positions that are a good fit for them and fill out the application
                        forms for the positions that are a good fit for them.
                    </li>
                    <li>
                        Candidates need to submit the necessary documents, certificates, degrees, etc. in accordance
                        with the requirements of the position they are applying for.
                    </li>
                    <li>
                        Staff will collect the application and check that the documents, certificates, etc. have been
                        properly notarized.
                    </li>
                    <li>
                        If any documents are missing or invalid, the staff will schedule an appointment with the
                        candidate to supplement the application, within 3 days of receiving the application at most.
                    </li>
                    <li>Valid application forms and documents will be recorded by the staff.</li>
                    <li>
                        Once there are enough applications from candidates or the application deadline has passed, the
                        staff will conduct the first round of candidate screening before sending the candidate
                        applications to the recruiting companies.
                    </li>
                </ul>

                <h3 id="part02">Job Posting</h3>
                <ul>
                    <li>
                        Companies can post jobs in three ways: newspaper advertisements, banner ads, and online
                        postings.
                    </li>
                    <li>Companies that want to post jobs must first register as members of the company.</li>
                    <li>
                        Staff will ask companies to fill out a job posting information form including: job title, number
                        of positions, posting period, and candidate requirements.
                    </li>
                    <li>
                        Staff will check the job posting information. If the job posting information is valid, the staff
                        will record the job posting information and request the company to provide the posting time and
                        posting method.
                    </li>
                    <li>
                        Staff will use the company's posting method and posting time to create an advertising
                        registration form.
                    </li>
                    <li>The company will verify the job posting information and send it back to the staff.</li>
                    <li>Staff will make the payment based on the company's job posting information.</li>
                    <li>
                        The company can pay in installments if the posting period is longer than 30 days. Otherwise, the
                        company must pay the full amount.
                    </li>
                    <li>
                        For each installment payment, the company needs to pay 30% of the total amount and pay the full
                        amount in the final payment.
                    </li>
                    <li>The company can choose the payment method, either directly or by credit card.</li>
                    <li>
                        The payment invoice will be sent to the company by the staff after the payment has been
                        completed.
                    </li>
                    <li>
                        After 10 days of full payment, the company will proceed to post the company's recruitment
                        announcement.
                    </li>
                    <li>The job posting information will be sent to the company for confirmation.</li>
                    <li>
                        If the job posting information is incorrect, the company can request a correction within 3 days.
                    </li>
                </ul>

                <h3 id="part03">Application Review</h3>
                <ul>
                    <li>
                        After the application deadline has passed, the staff will review the candidate applications.
                    </li>
                    <li>Applications are reviewed based on the criteria provided by the company to the company.</li>
                    <li>
                        Qualified applications will be recorded, while unqualified applications will be saved with the
                        status of not qualified for the application.
                    </li>
                    <li>
                        The qualified applications will then be ranked according to the priority of the selection
                        criteria.
                    </li>
                    <li>
                        The ranked applications will be sent to the recruiting companies and also recorded with the
                        status of processed applications.
                    </li>
                    <li>The company will respond within 10 days of the date the approved applications are sent.</li>
                    <li>Applications that meet the company's response will be recorded by the staff.</li>
                    <li>Staff will contact the qualified candidates to inform them that they have been qualified.</li>
                </ul>

                <h3 id="part04">Contract Renewal</h3>
                <ul>
                    <li>
                        Periodically at the end of each month, the staff will compile a list of companies whose
                        recruitment is about to expire (contracts have less than 3 days left to expire).
                    </li>
                    <li>
                        Staff will create a list of these companies to send to management for review and approval of
                        whether to extend the contract with these companies.
                    </li>
                    <li>
                        Management will review the results of the applications submitted by candidates to the company,
                        the number of positions applied for, etc.
                    </li>
                </ul>
            </div>
            <div className={styles.rightPanel}>
                <ul className={styles.backgoroundSection}>
                    <li>
                        <a href="#part01">User Registration</a>
                    </li>
                    <li>
                        <a href="#part02">Job Posting</a>
                    </li>
                    <li>
                        <a href="#part03">Application Review</a>
                    </li>
                    <li>
                        <a href="#part04">Contract Renewal</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default OrganizationalStructures;
