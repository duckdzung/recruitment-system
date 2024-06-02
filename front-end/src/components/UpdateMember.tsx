import React, { useState } from 'react';
import { updateMember } from '../services/memberService';
import { toast } from 'react-toastify';
import { ApiResponse } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { loginSuccess } from '../redux/auth/authSlice';

const UpdateMember: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [phoneNum, setPhoneNum] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [taxCode, setTaxCode] = useState<string>('');

    const [isCandidate, setIsCandidate] = useState<Boolean>(true);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleUpdateMember = async () => {
        const response: ApiResponse = await updateMember({ name, phoneNum, address, companyName, taxCode });

        // Update sucessfully
        if (response && response.statusCode === 200) {
            toast.success(response.message);
            navigate('/');

            const { accessToken, refreshToken, role } = response.data;
            dispatch(loginSuccess({ accessToken, refreshToken, role }));
        }
    };

    const handleSetIsCandidate = () => {
        setIsCandidate(!isCandidate);
        setName('');
        setAddress('');
        setCompanyName('');
        setPhoneNum('');
        setTaxCode('');
    };

    return (
        <div>
            <h1>Update Member</h1>
            <div>
                <label>
                    <input
                        type="radio"
                        value="candidate"
                        checked={isCandidate === true}
                        onChange={handleSetIsCandidate}
                    />
                    Candidate
                </label>
                <label>
                    <input
                        type="radio"
                        value="enterprise"
                        checked={isCandidate === false}
                        onChange={handleSetIsCandidate}
                    />
                    Enterprise
                </label>
            </div>

            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input
                type="text"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                placeholder="Phone Number"
            />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />

            {!isCandidate && (
                <>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company Name"
                    />
                    <input
                        type="text"
                        value={taxCode}
                        onChange={(e) => setTaxCode(e.target.value)}
                        placeholder="Tax Code"
                    />
                </>
            )}

            <button onClick={handleUpdateMember}>Update</button>

            <Link to="/">Skip</Link>
        </div>
    );
};

export default UpdateMember;
