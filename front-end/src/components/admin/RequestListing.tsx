import React, { useEffect, useState } from 'react';
import { Table, Input, Row, Col, Tag } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';

import { approveRequest, getAllRequests, rejectRequest } from '../../services/memberService';
import ConfirmModal from '../Modal/ConfirmModal';
import { ApiResponse, Role } from '../../types';
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
    requestId: number;
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
    const [selectedRequest, setSelectedRequest] = useState<DataType | null>(null);
    const [isApproveRequest, setIsApproveRequest] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const fetchData = async () => {
        setLoading(true);

        const response = await getAllRequests(tableParams.pagination?.current! - 1, tableParams.pagination?.pageSize!);

        setRequestList(
            response?.data.content.map((request: any) => {
                return {
                    id: request.member.id,
                    name: request.companyName || request.name,
                    roleRequest: request.role,
                    requestId: request.requestId,
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
        setIsApproveRequest(true);
        setSelectedRequest(request);
    };

    const handleRejectClick = (request: DataType) => {
        setIsApproveRequest(false);
        setSelectedRequest(request);
    };

    const handleApproveRequest = async () => {
        const requestId = selectedRequest?.requestId || 0;

        // Call api aprrove request
        const response: ApiResponse = await approveRequest(requestId);

        // Approve successfully
        if (response && response.statusCode === 200) {
            fetchData();
            toast.success('Request approved successfully');
        }

        // Close the modal after approve request
        setSelectedRequest(null);
    };

    const handleRejectRequest = async () => {
        const requestId = selectedRequest?.requestId || 0;

        // Call api aprrove request
        const response: ApiResponse = await rejectRequest(requestId);

        // Approve successfully
        if (response && response.statusCode === 200) {
            fetchData();
            toast.success('Request approved successfully');
        }

        // Close the modal after approve request
        setSelectedRequest(null);
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
            render: (roleRequest: Role) => <Tag color="processing">{roleRequest}</Tag>,
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
                        onClick={() => handleRejectClick(request)}
                    />
                </span>
            ),
        },
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

            <ConfirmModal
                title="Confirm"
                content={
                    isApproveRequest ? 'Do you want to aprrove this request?' : 'Do you want to reject this request?'
                }
                okText="Ok"
                cancelText="Cancel"
                isOpen={selectedRequest !== null}
                onConfirm={isApproveRequest ? handleApproveRequest : handleRejectRequest}
                onCancel={() => setSelectedRequest(null)}
            />
        </>
    );
};

export default RequestListing;
