import styles from './Legals.module.scss';

const LeadershipTraining = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <h2>Leadership Training Program</h2>

                <h3 id="part01">Introduction to Leadership Training Program</h3>
                <p>
                    Leadership training is a vital component of organizational development, aiming to nurture and
                    enhance leadership skills among employees to drive the company's success. Company ABC offers a
                    comprehensive Leadership Training Program designed to empower individuals at all levels within an
                    organization with the necessary skills and knowledge to become effective leaders.
                </p>

                <h3 id="part02">Leadership Training Process</h3>
                <h4>A. Assessment of Training Needs:</h4>
                <ul>
                    <li>
                        The training program begins with an assessment of the organization's leadership needs. This
                        involves identifying key areas where leadership skills can be enhanced to align with the
                        company's strategic objectives.
                    </li>
                    <li>
                        Conducting surveys, interviews, and performance evaluations to understand the specific
                        leadership challenges and development areas within the organization.
                    </li>
                </ul>
                <h4>B. Designing Customized Training Modules:</h4>
                <ul>
                    <li>
                        Based on the assessment results, customized training modules are developed to address the
                        identified leadership development needs.
                    </li>
                    <li>
                        Modules cover a range of topics including communication skills, decision-making, conflict
                        resolution, team building, strategic thinking, and change management.
                    </li>
                </ul>
                <h4>C. Delivery of Training Sessions:</h4>
                <ul>
                    <li>
                        The training sessions are conducted by experienced facilitators who specialize in leadership
                        development.
                    </li>
                    <li>
                        Sessions may include interactive workshops, group discussions, case studies, role-playing
                        exercises, and real-world simulations to provide participants with hands-on learning
                        experiences.
                    </li>
                </ul>
                <h4>D. Practical Application and Skill Building:</h4>
                <ul>
                    <li>
                        Participants are encouraged to apply the leadership concepts and techniques learned during the
                        training sessions in their day-to-day work environment.
                    </li>
                    <li>
                        Assignments, projects, and on-the-job training opportunities are provided to reinforce learning
                        and enhance skill development.
                    </li>
                </ul>
                <h4>E. Feedback and Evaluation:</h4>
                <ul>
                    <li>
                        Regular feedback is collected from participants to assess the effectiveness of the training
                        program and make necessary adjustments.
                    </li>
                    <li>
                        Evaluations are conducted to measure the impact of the training on participants' leadership
                        capabilities and the overall organizational performance.
                    </li>
                </ul>

                <h3 id="part03">Benefits of Company ABC's Leadership Training Program</h3>
                <ul>
                    <li>
                        Developing Effective Leaders: The program equips participants with the skills, knowledge, and
                        confidence to lead teams and drive organizational success.
                    </li>
                    <li>
                        Improving Employee Engagement: Investing in leadership development demonstrates the company's
                        commitment to employee growth and fosters a culture of continuous learning and development.
                    </li>
                    <li>
                        Enhancing Organizational Performance: Effective leadership positively impacts employee morale,
                        productivity, and retention, ultimately contributing to improved organizational performance.
                    </li>
                    <li>
                        Succession Planning: The program helps identify and groom future leaders, ensuring a pipeline of
                        talented individuals ready to assume leadership roles as the organization evolves.
                    </li>
                </ul>
            </div>
            <div className={styles.rightPanel}>
                <ul className={styles.backgoroundSection}>
                    <li>
                        <a href="#part01">Introduction</a>
                    </li>
                    <li>
                        <a href="#part02">Leadership Training Process</a>
                    </li>
                    <li>
                        <a href="#part03">Benefits</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default LeadershipTraining;
