import React, { useEffect, useState } from 'react';
import { Table, Input, Row, Col, Tag } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';

import { deleteMember, getAllMembers, updateMemberByStaff } from '../../services/memberService';
import EditModal, { FormItem } from '../Modal/EditModal';
import ConfirmModal from '../Modal/ConfirmModal';
import { ApiResponse, MemberDetails, Role } from '../../types';
import { toast } from 'react-toastify';

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
    id: string;
    name: string;
    roleRequest: Role;
    validate: boolean;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const RequestListing: React.FC = () => {
    const [requestList, setRequestList] = useState<DataType[]>([]);
    const [editedRequest, setEditedRequest] = useState<DataType | null>(null);
    const [deletedRequest, setDeletedRequest] = useState<DataType | null>(null);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const fetchData = async () => {
        setLoading(true);

        const response = await getAllMembers(
            Role.ENTERPRISE,
            tableParams.pagination?.current! - 1,
            tableParams.pagination?.pageSize!,
        );

        setRequestList(
            response?.data.content.map((request: any) => {
                return {
                    key: request.member.id,
                    id: request.member.id,
                    name: request.companyName,
                    roleRequest: request.role,
                    validate: request.member.isValidated,
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

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    const handleApproveClick = (request: DataType) => {
        setEditedRequest(request);
    };

    const handleApproveSave = async (updatedData: { [key: string]: any }) => {
        const requestId = updatedData.id;
        const updatedRequest: MemberDetails = {
            name: updatedData.name,
            address: updatedData.address,
            phoneNumber: updatedData.phoneNumber,
            email: updatedData.email,
            taxCode: updatedData.taxCode,
            dateOfExpiration: updatedData.dateOfExpiration ? new Date(updatedData.dateOfExpiration).toISOString() : '',
            isValidated: updatedData.validate,
        };

        // Call api update request
        const response: ApiResponse = await updateMemberByStaff(requestId, updatedRequest);

        // Update successfully
        if (response && response.statusCode === 200) {
            fetchData();
            toast.success('Request approved successfully');
        }

        // Close the modal after saving
        setEditedRequest(null);
    };

    const handleRejectRequest = async () => {
        const requestId = deletedRequest?.id || '';

        // Call api delete request
        const response: ApiResponse = await deleteMember(requestId);

        // Delete successfully
        if (response && response.statusCode === 200) {
            fetchData();
            toast.success('Request rejected successfully');
        }

        // Close the modal after saving
        setDeletedRequest(null);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Member',
            dataIndex: 'name',
            sorter: true,
            width: '10%',
        },
        {
            title: 'Role Request',
            dataIndex: 'roleRequest',
            sorter: true,
            width: '10%',
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
            title: 'Action',
            dataIndex: 'action',
            width: '10%',
            render: (_, request) => (
                <span>
                    <CheckOutlined
                        style={{ fontSize: '25px', color: '#42b72a', cursor: 'pointer' }}
                        onClick={() => handleApproveClick(request)}
                    />
                    <CloseOutlined
                        style={{ fontSize: '25px', color: '#f54242', marginLeft: '20px', cursor: 'pointer' }}
                        onClick={() => setDeletedRequest(request)}
                    />
                </span>
            ),
        },
    ];

    const fields: FormItem[] = [
        { name: 'name', label: 'Name', type: 'text', isDisabled: false },
        { name: 'address', label: 'Address', type: 'text', isDisabled: false },
        { name: 'phoneNumber', label: 'Phone Number', type: 'text', isDisabled: false },
        { name: 'email', label: 'Email', type: 'text', isDisabled: true },
        { name: 'taxCode', label: 'Tax Code', type: 'text', isDisabled: false },
        { name: 'dateOfExpiration', label: 'Date of Expiration', type: 'datetime', isDisabled: false },
        { name: 'validate', label: 'Validate', type: 'checkbox', isDisabled: false },
    ];

    return (
        <>
            <Row>
                <h3 style={headingStyle}>REQUEST LISTING</h3>
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
                        dataSource={requestList}
                        pagination={tableParams.pagination}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </Col>
            </Row>

            <EditModal
                title="Approve Request"
                data={editedRequest || {}}
                isOpen={!!editedRequest}
                fields={fields}
                onSave={handleApproveSave}
                onCancel={() => setEditedRequest(null)}
            />

            <ConfirmModal
                title="Confirm"
                content="Do you want to reject this request?"
                okText="Ok"
                cancelText="Cancel"
                isOpen={deletedRequest !== null}
                onConfirm={handleRejectRequest}
                onCancel={() => setDeletedRequest(null)}
            />
        </>
    );
};

export default RequestListing;
