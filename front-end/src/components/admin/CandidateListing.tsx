import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Row, Col, Tag } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import EditModal, { FormItem } from '../Modal/EditModal';
import ConfirmModal from '../Modal/ConfirmModal';
import { deleteMember, getCandidateList, updateMemberByStaff } from '../../services/memberService';
import { toast } from 'react-toastify';
import { ApiResponse, MemberDetails } from '../../types';

const { Search } = Input;

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// CSS for component
const headingStyle: React.CSSProperties = {
    margin: '40px auto',
    fontFamily: 'Nunito',
    fontSize: '50px',
    fontWeight: 800,
    textAlign: 'center',
    color: '#0AADEB',
};

// Interface for component
interface DataType {
    key: string;
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    validate: boolean;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const CandidateListing: React.FC = () => {
    const [candidateList, setCandidateList] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [editedCandidate, setEditedCandidate] = useState<DataType | null>(null);
    const [deletedCandidate, setDeletedCandidate] = useState<DataType | null>(null);

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    const fetchData = async () => {
        setLoading(true);

        const response = await getCandidateList(
            tableParams.pagination?.current! - 1,
            tableParams.pagination?.pageSize!,
        );

        setCandidateList(
            response?.data.content.map((candidate: any) => {
                return {
                    key: candidate.id,
                    id: candidate.id,
                    name: candidate.name,
                    address: candidate.address,
                    phoneNumber: candidate.phoneNumber,
                    email: candidate.email,
                    validate: candidate.isValidated,
                };
            }),
        );

        setLoading(false);
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: response?.data.page.totalPages,
            },
        });
    };

    const handleTableChange = (pagination: TablePaginationConfig, filters: any, sorter: any) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    const handleEditSave = async (updatedData: { [key: string]: any }) => {
        const candidateId = updatedData.id;
        const updatedCandidate: MemberDetails = {
            name: updatedData.name,
            address: updatedData.address,
            phoneNum: updatedData.phoneNumber,
            email: updatedData.email,
            isValidated: updatedData.validate,
        };

        // Call api update candidate
        const response: ApiResponse = await updateMemberByStaff(candidateId, updatedCandidate);

        // Update sucessfully
        if (response && response.statusCode === 200) {
            fetchData();
            toast.success('Update candidate successfully');
        }

        // Close the modal after saving
        setEditedCandidate(null);
    };

    const handleDeleteCandidate = async () => {
        const candidateId = deletedCandidate?.id || '';

        // Call api delete candidate
        const response: ApiResponse = await deleteMember(candidateId);

        // Delete sucessfully
        if (response && response.statusCode === 200) {
            fetchData();
            toast.success('Delete candidate successfully');
        }

        // Close the modal after saving
        setDeletedCandidate(null);
    };

    const onSearch = (value: string) => {
        const filteredCandidates = candidateList.filter((candidate) =>
            candidate.name.toLowerCase().includes(value.toLowerCase()),
        );
        setCandidateList(filteredCandidates);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            width: '15%',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '20%',
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            width: '15%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '15%',
        },
        {
            title: 'Validate',
            dataIndex: 'validate',
            width: '5%',
            align: 'center',
            render: (validate: boolean) => (
                <Tag color={validate ? 'green' : 'volcano'}>{validate ? 'TRUE' : 'FALSE'}</Tag>
            ),
        },
        {
            title: 'Profiled',
            dataIndex: 'profiled',
            width: '5%',
            render: () => (
                <Button type="primary" ghost size="middle">
                    View
                </Button>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '10%',
            render: (_, record) => (
                <>
                    <EditOutlined
                        style={{ fontSize: '25px', color: '#f5b342', cursor: 'pointer' }}
                        onClick={() => setEditedCandidate(record)}
                    />
                    <DeleteOutlined
                        style={{ fontSize: '25px', color: '#f54242', marginLeft: '20px', cursor: 'pointer' }}
                        onClick={() => setDeletedCandidate(record)}
                    />
                </>
            ),
        },
    ];

    const fields: FormItem[] = [
        { name: 'name', label: 'Name', type: 'text', isDisabled: false },
        { name: 'address', label: 'Address', type: 'text', isDisabled: false },
        { name: 'phoneNumber', label: 'Phone Number', type: 'text', isDisabled: false },
        { name: 'email', label: 'Email', type: 'text', isDisabled: false },
        { name: 'validate', label: 'Validate', type: 'checkbox', isDisabled: false },
    ];

    return (
        <>
            <Row>
                <h3 style={headingStyle}>CANDIDATE LISTING</h3>
            </Row>
            <Row>
                <Col span={4} offset={20}>
                    <Search
                        placeholder="Type here ... "
                        allowClear
                        onSearch={onSearch}
                        size="large"
                        style={{ marginBottom: '10px' }}
                    />
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={candidateList}
                        pagination={tableParams.pagination}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </Col>
            </Row>

            {editedCandidate && (
                <EditModal
                    title="Edit Candidate"
                    data={editedCandidate}
                    isOpen={!!editedCandidate}
                    fields={fields}
                    onSave={handleEditSave}
                    onCancel={() => setEditedCandidate(null)}
                />
            )}
            {deletedCandidate && (
                <ConfirmModal
                    title="Confirm"
                    content="Do you want to delete this candidate?"
                    okText="Ok"
                    cancelText="Cancel"
                    isOpen={!!deletedCandidate}
                    onConfirm={handleDeleteCandidate}
                    onCancel={() => setDeletedCandidate(null)}
                />
            )}
        </>
    );
};

export default CandidateListing;
