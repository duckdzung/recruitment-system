import styles from './Legals.module.scss';

const RefundPolicy = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <h2>Refund Policy</h2>
                <h3 id="part01">Introduction</h3>
                <p>
                    At ABC Company, we strive to provide the best recruitment management services to our clients. This
                    Refund Policy outlines the terms under which refunds may be issued for services provided through our
                    recruitment management system. Please read this policy carefully.
                </p>

                <h3 id="part02">Eligibility for Refunds</h3>
                <p>Refunds are applicable under the following circumstances:</p>
                <h4>A. Service Non-Delivery:</h4>
                <p>
                    If the job posting is not published within 10 days after the final payment is completed and
                    confirmed, enterprises are eligible for a full refund.
                </p>
                <h4>B. Incorrect Service Delivery:</h4>
                <p>
                    If the job posting does not match the details provided and confirmed by the enterprise, the
                    enterprise can request a correction. If the issue is not resolved within 3 days of the request, the
                    enterprise is eligible for a full refund.
                </p>
                <h4>C. Service Cancellation by ABC Company:</h4>
                <p>
                    If ABC Company cancels the service for any reason not attributable to the enterprise, a full refund
                    will be issued for the remaining service period.
                </p>

                <h3 id="part03">Non-Refundable Conditions</h3>
                <p>Refunds are not applicable under the following circumstances:</p>
                <ul>
                    <li>
                        Partial usage of the service. Once the job posting is live, no partial refunds will be issued.
                    </li>
                    <li>Delays caused by the enterprise in providing necessary information or documents.</li>
                    <li>
                        Voluntary cancellation of services by the enterprise after the job posting has been published.
                    </li>
                </ul>

                <h3 id="part04">Refund Process</h3>
                <h4>A. Request for Refund:</h4>
                <ul>
                    <li>
                        Enterprises must submit a refund request in writing via email to{' '}
                        <a href="mailto:ABC_Company@gmail.com">ABC_Company@gmail.com</a> within 10 days of the eligible
                        incident.
                    </li>
                    <li>
                        The request must include the enterprise's details, service details, and the reason for the
                        refund request.
                    </li>
                </ul>
                <h4>B. Review and Approval:</h4>
                <ul>
                    <li>
                        ABC Company will review the refund request and may request additional information if necessary.
                    </li>
                    <li>Refund requests will be processed within 14 days of receipt.</li>
                </ul>
                <h4>C. Refund Issuance:</h4>
                <ul>
                    <li>Approved refunds will be issued via the original payment method.</li>
                    <li>Enterprises will receive a notification once the refund has been processed.</li>
                </ul>

                <h3 id="part05">Contact Information</h3>
                <p>For any questions or concerns regarding this Refund Policy, please contact us at:</p>
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

                <h3 id="part06">Changes to Refund Policy</h3>
                <p>
                    ABC Company reserves the right to modify this Refund Policy at any time. Changes will be notified
                    through the Service or via email.
                </p>

                <h3 id="part07">Governing Law</h3>
                <p>This Refund Policy is governed by the laws of the jurisdiction in which ABC Company operates.</p>
            </div>
            <div className={styles.rightPanel}>
                <ul className={styles.backgoroundSection}>
                    <li>
                        <a href="#part01">Introduction</a>
                    </li>
                    <li>
                        <a href="#part02">Eligibility for Refunds</a>
                    </li>
                    <li>
                        <a href="#part03">Non-Refundable Conditions</a>
                    </li>
                    <li>
                        <a href="#part04">Refund Process</a>
                    </li>
                    <li>
                        <a href="#part05">Contact Information</a>
                    </li>
                    <li>
                        <a href="#part06">Changes to Refund Policy</a>
                    </li>
                    <li>
                        <a href="#part07">Governing Law</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default RefundPolicy;
