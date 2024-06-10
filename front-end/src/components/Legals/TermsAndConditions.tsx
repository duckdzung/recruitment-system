import styles from './Legals.module.scss';

const TermsAndConditions = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <h2>Terms and Conditions</h2>
                <h3 id="part01">Introduction</h3>
                <p>
                    Welcome to ABC Company's recruitment management system. By accessing or using our services, you
                    agree to comply with and be bound by these Terms and Conditions. Please read these terms carefully.
                </p>

                <h3 id="part02">Definitions</h3>
                <p>
                    <strong>Company:</strong> Refers to ABC Company.
                </p>
                <p>
                    <strong>Service:</strong> Refers to the recruitment management system provided by ABC Company.
                </p>
                <p>
                    <strong>User:</strong> Refers to anyone who accesses or uses the Service, including enterprises and
                    applicants.
                </p>
                <p>
                    <strong>Enterprise:</strong> Refers to companies or organizations using the Service to post job
                    advertisements and recruit candidates.
                </p>
                <p>
                    <strong>Applicant:</strong> Refers to individuals applying for job positions through the Service.
                </p>

                <h3 id="part03">Registration and Account Management</h3>
                <p>
                    <strong>A. For Enterprises:</strong>
                </p>
                <ul>
                    <li>
                        Enterprises must register by providing accurate and complete information, including company
                        name, tax identification number, representative name, address, and contact email.
                    </li>
                    <li>
                        The registration process includes a verification phase which can take up to one week.
                        Enterprises will be notified upon successful verification.
                    </li>
                    <li>
                        Enterprises are responsible for maintaining the confidentiality of their account and password
                        and for all activities that occur under their account.
                    </li>
                </ul>
                <p>
                    <strong>B. For Applicants:</strong>
                </p>
                <ul>
                    <li>
                        Applicants must register by providing accurate personal information and uploading necessary
                        documents (e.g., resume, certificates).
                    </li>
                    <li>
                        Applicants are responsible for maintaining the confidentiality of their account and password and
                        for all activities that occur under their account.
                    </li>
                </ul>

                <h3 id="part04">Job Posting and Application Process</h3>
                <p>
                    <strong>A. For Enterprises:</strong>
                </p>
                <ul>
                    <li>
                        Enterprises must provide detailed job information, including position, number of vacancies,
                        posting duration, and candidate requirements.
                    </li>
                    <li>
                        Job postings will be reviewed for accuracy and completeness. Enterprises will be required to
                        confirm details before publication.
                    </li>
                    <li>
                        Enterprises can choose from various advertisement options: newspaper ads, banner ads, and online
                        postings.
                    </li>
                    <li>
                        Payment for job postings must be completed as per the agreed schedule. Payments can be made in
                        installments if the posting duration exceeds 30 days. Otherwise, full payment is required.
                    </li>
                </ul>
                <p>
                    <strong>B. For Applicants:</strong>
                </p>
                <ul>
                    <li>
                        Applicants can apply for positions by selecting suitable job postings and submitting required
                        documents.
                    </li>
                    <li>
                        Incomplete or invalid applications will be notified and given a maximum of three days to correct
                        the issues.
                    </li>
                    <li>
                        Applications will be reviewed based on the criteria provided by the enterprises. Approved
                        applications will be forwarded to the respective enterprises.
                    </li>
                </ul>

                <h3 id="part05">Application Review and Selection</h3>
                <p>
                    After the application deadline, applications will be reviewed based on the criteria set by the
                    enterprises.
                </p>
                <p>
                    Applications meeting the criteria will be prioritized and forwarded to the enterprises. Enterprises
                    will respond within ten days.
                </p>
                <p>Applicants who meet the requirements will be contacted and informed of their selection.</p>

                <h3 id="part06">Contract Renewal</h3>
                <p>
                    At the end of each month, the system will generate a list of enterprises with contracts nearing
                    expiration (less than three days remaining).
                </p>
                <p>
                    The list will be reviewed by the management to decide on potential contract renewals based on the
                    performance and number of positions filled.
                </p>
                <p>
                    Selected enterprises will be contacted for contract renewal discussions, and special incentives may
                    be offered to high-potential enterprises.
                </p>

                <h3 id="part07">Payment Terms</h3>
                <p>Enterprises must adhere to the payment terms as specified during the job posting process.</p>
                <p>
                    Payment options include direct payment or through credit cards. Invoices will be issued upon
                    completion of payments.
                </p>
                <p>Failure to comply with payment terms may result in suspension of services.</p>

                <h3 id="part08">Data Protection and Privacy</h3>
                <p>Users agree to the collection and use of their data as described in our Privacy Policy.</p>
                <p>Enterprises and applicants must ensure the accuracy and integrity of the data they provide.</p>

                <h3 id="part09">User Responsibilities</h3>
                <p>Users must use the Service in compliance with all applicable laws and regulations.</p>
                <p>Users must not use the Service for any unlawful or prohibited activities.</p>

                <h3 id="part10">Termination</h3>
                <p>
                    ABC Company reserves the right to suspend or terminate any account if the user violates these Terms
                    and Conditions or engages in fraudulent activities.
                </p>

                <h3 id="part11">Limitation of Liability</h3>
                <p>
                    ABC Company will not be liable for any indirect, incidental, or consequential damages arising from
                    the use of the Service.
                </p>
                <p>
                    The total liability of ABC Company for any claims arising under these Terms and Conditions will not
                    exceed the amount paid by the user for the Service.
                </p>

                <h3 id="part12">Changes to Terms and Conditions</h3>
                <p>
                    ABC Company reserves the right to modify these Terms and Conditions at any time. Changes will be
                    notified through the Service or via email.
                </p>

                <h3 id="part13">Governing Law</h3>
                <p>
                    These Terms and Conditions are governed by the laws of the jurisdiction in which ABC Company
                    operates.
                </p>

                <h3 id="part14">Contact Information</h3>
                <p>For any questions or concerns regarding these Terms and Conditions, please contact us at:</p>
                <ul>
                    <li>
                        <strong>Email:</strong> <a href="mailto:ABC_Company@gmail.com">ABC_Company@gmail.com</a>
                    </li>
                    <li>
                        <strong>Address:</strong> [Main street 10, Linh Trung ward, Thu Duc city, Ho Chi Minh city]
                    </li>
                    <li>
                        <strong>Phone:</strong> [+ 0123456789]
                    </li>
                </ul>
            </div>
            <div className={styles.rightPanel}>
                <ul className={styles.backgoroundSection}>
                    <li>
                        <a href="#part01">Introduction</a>
                    </li>
                    <li>
                        <a href="#part02">Definitions</a>
                    </li>
                    <li>
                        <a href="#part03">Registration and Account Management</a>
                    </li>
                    <li>
                        <a href="#part04">Job Posting and Application Process</a>
                    </li>
                    <li>
                        <a href="#part05">Application Review and Selection</a>
                    </li>
                    <li>
                        <a href="#part06">Contract Renewal</a>
                    </li>
                    <li>
                        <a href="#part07">Payment Terms</a>
                    </li>
                    <li>
                        <a href="#part08">Data Protection and Privacy</a>
                    </li>
                    <li>
                        <a href="#part09">User Responsibilities</a>
                    </li>
                    <li>
                        <a href="#part10">Termination</a>
                    </li>
                    <li>
                        <a href="#part11">Limitation of Liability</a>
                    </li>
                    <li>
                        <a href="#part12">Changes to Terms and Conditions</a>
                    </li>
                    <li>
                        <a href="#part13">Governing Law</a>
                    </li>
                    <li>
                        <a href="#part14">Contact Information</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TermsAndConditions;
