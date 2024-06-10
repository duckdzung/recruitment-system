import styles from './Legals.module.scss';

const PrivacyPolicy = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <h2>Privacy Policy</h2>
                <h3 id="part01">Introduction</h3>
                <p>
                    Welcome to ABC Company. We are committed to protecting your personal data and respecting your
                    privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                    when you interact with our recruitment management system. Please read this policy carefully to
                    understand our views and practices regarding your personal data and how we will treat it.
                </p>

                <h3 id="part02">Information We Collect</h3>
                <p>We collect various types of information to provide and improve our service to you:</p>
                <h4>A. Personal Information:</h4>
                <ul>
                    <li>
                        <strong>For Enterprises:</strong>
                        <ul>
                            <li>Company Name</li>
                            <li>Tax Identification Number</li>
                            <li>Representative Name</li>
                            <li>Address</li>
                            <li>Contact Email</li>
                        </ul>
                    </li>
                    <li>
                        <strong>For Applicants:</strong>
                        <ul>
                            <li>Personal Information (Name, Contact Details)</li>
                            <li>Application Documents (Resume, Certificates, Degrees)</li>
                        </ul>
                    </li>
                </ul>
                <h4>B. Usage Data:</h4>
                <p>
                    Information on how the service is accessed and used, including IP addresses, browser types, and
                    usage patterns.
                </p>

                <h3 id="part03">Use of Information</h3>
                <p>We use the collected information for various purposes:</p>
                <ul>
                    <li>To register enterprises and validate their information.</li>
                    <li>To manage job postings and advertisements.</li>
                    <li>To facilitate the application process for job seekers.</li>
                    <li>To verify and process application documents.</li>
                    <li>To communicate with enterprises and applicants.</li>
                    <li>To improve our services and develop new features.</li>
                    <li>To comply with legal obligations and protect our rights.</li>
                </ul>

                <h3 id="part04">Information Sharing and Disclosure</h3>
                <p>We may share your information with:</p>
                <ul>
                    <li>
                        <strong>Partner Companies:</strong> For the purpose of facilitating the recruitment process.
                    </li>
                    <li>
                        <strong>Service Providers:</strong> To assist in providing our services (e.g., payment
                        processors, hosting services).
                    </li>
                    <li>
                        <strong>Legal Requirements:</strong> If required by law or to protect our rights and property.
                    </li>
                </ul>

                <h3 id="part05">Data Security</h3>
                <p>
                    We employ appropriate technical and organizational measures to protect your data from unauthorized
                    access, alteration, disclosure, or destruction. These measures include encryption, firewalls, and
                    secure server environments.
                </p>

                <h3 id="part06">Data Retention</h3>
                <p>
                    We retain your personal data only for as long as necessary to fulfill the purposes we collected it
                    for, including any legal or reporting requirements. Once the data is no longer needed, we will
                    delete or anonymize it.
                </p>

                <h3 id="part07">Your Data Protection Rights</h3>
                <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                <ul>
                    <li>Access to your data.</li>
                    <li>Correction of inaccurate data.</li>
                    <li>Deletion of your data.</li>
                    <li>Restriction of processing.</li>
                    <li>Data portability.</li>
                    <li>Objection to processing.</li>
                    <li>Withdrawal of consent.</li>
                </ul>
                <p>
                    To exercise these rights, please contact us at{' '}
                    <a href="mailto:ABC_Company@gmail.com">ABC_Company@gmail.com</a>.
                </p>

                <h3 id="part08">Changes to This Privacy Policy</h3>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                    new Privacy Policy on our website and, where appropriate, notify you via email.
                </p>

                <h3 id="part09">Contact Us</h3>
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
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

                <h3 id="part10">Governing Law</h3>
                <p>
                    This Privacy Policy shall be governed and construed in accordance with the laws of the jurisdiction
                    in which ABC Company operates, without regard to its conflict of law provisions.
                </p>
            </div>
            <div className={styles.rightPanel}>
                <ul className={styles.backgoroundSection}>
                    <li>
                        <a href="#part01">Introduction</a>
                    </li>
                    <li>
                        <a href="#part02">Information We Collect</a>
                    </li>
                    <li>
                        <a href="#part03">Use of Information</a>
                    </li>
                    <li>
                        <a href="#part04">Information Sharing and Disclosure</a>
                    </li>
                    <li>
                        <a href="#part05">Data Security</a>
                    </li>
                    <li>
                        <a href="#part06">Data Retention</a>
                    </li>
                    <li>
                        <a href="#part07">Your Data Protection Rights</a>
                    </li>
                    <li>
                        <a href="#part08">Changes to This Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#part09">Contact Us</a>
                    </li>
                    <li>
                        <a href="#part10">Governing Law</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
