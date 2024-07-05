import React, { useEffect, useState } from 'react';
import { Table, Input, Row, Col, Tag } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';

import { deleteMember, getCandidateList, getEnterpriseList, updateMemberByStaff } from '../../services/memberService';
import EditModal, { FormItem } from '../Modal/EditModal';
import ConfirmModal from '../Modal/ConfirmModal';
import { ApiResponse, MemberDetails } from '../../types';
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
    address: string;
    phoneNumber: string;
    email: string;
    taxCode: string;
    dateOfExpiration: string;
    validate: boolean;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const EnterpiseListing: React.FC = () => {
    const [enterpiseList, setEnterpiseList] = useState<DataType[]>([]);
    const [editedEnterprise, setEditedEnterprise] = useState<DataType | null>(null);
    const [deletedEnterprise, setDeletedEnterprise] = useState<DataType | null>(null);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const fetchData = async () => {
        setLoading(true);

        const response = await getEnterpriseList(
            tableParams.pagination?.current! - 1,
            tableParams.pagination?.pageSize!,
        );

        setEnterpiseList(
            response?.data.content.map((enterprise: any) => {
                return {
                    key: enterprise.member.id,
                    id: enterprise.member.id,
                    name: enterprise.companyName,
                    address: enterprise.member.address,
                    phoneNumber: enterprise.member.phoneNumber,
                    email: enterprise.member.email,
                    taxCode: enterprise.taxCode,
                    dateOfExpiration: enterprise.dateOfExpiration || '',
                    validate: enterprise.member.isValidated,
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

    const handleEditClick = (enterprise: DataType) => {
        setEditedEnterprise(enterprise);
    };

    const handleEditSave = async (updatedData: { [key: string]: any }) => {
        const enterpiseId = updatedData.id;
        const updatedEnterprise: MemberDetails = {
            name: updatedData.name,
            address: updatedData.address,
            phoneNumber: updatedData.phoneNumber,
            email: updatedData.email,
            taxCode: updatedData.taxCode,
            dateOfExpiration: updatedData.dateOfExpiration ? new Date(updatedData.dateOfExpiration).toISOString() : '',
            isValidated: updatedData.validate,
        };

        // Call api update enterprise
        const response: ApiResponse = await updateMemberByStaff(enterpiseId, updatedEnterprise);

        // Update sucessfully
        if (response && response.statusCode === 200) {
            fetchData();
            toast.success('Update enterprise successfully');
        }

        // Close the modal after saving
        setEditedEnterprise(null);
    };

    const handleDeleteEnterprise = async () => {
        const enterpiseId = deletedEnterprise?.id || '';

        // Call api delete enterprise
        const response: ApiResponse = await deleteMember(enterpiseId);

        // Delete sucessfully
        if (response && response.statusCode === 200) {
            fetchData();
            toast.success('Delete enterprise successfully');
        }

        // Close the modal after saving
        setDeletedEnterprise(null);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Enterprise',
            dataIndex: 'name',
            sorter: true,
            width: '10%',
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
            title: 'Tax code',
            dataIndex: 'taxCode',
            width: '10%',
        },
        {
            title: 'Expiration',
            dataIndex: 'dateOfExpiration',
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
            render: (_, enterprise) => (
                <span>
                    <EditOutlined
                        style={{ fontSize: '25px', color: '#f5b342', cursor: 'pointer' }}
                        onClick={() => handleEditClick(enterprise)}
                    />
                    <DeleteOutlined
                        style={{ fontSize: '25px', color: '#f54242', marginLeft: '20px', cursor: 'pointer' }}
                        onClick={() => setDeletedEnterprise(enterprise)}
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
                <h3 style={headingStyle}>ENTERPRISE LISTING</h3>
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
                        dataSource={enterpiseList}
                        pagination={tableParams.pagination}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </Col>
            </Row>

            <EditModal
                title="Edit Enterprise"
                data={editedEnterprise || {}}
                isOpen={!!editedEnterprise}
                fields={fields}
                onSave={handleEditSave}
                onCancel={() => setEditedEnterprise(null)}
            />

            <ConfirmModal
                title="Confirm"
                content="Do you want to delete this enterprise?"
                okText="Ok"
                cancelText="Cancel"
                isOpen={deletedEnterprise !== null}
                onConfirm={handleDeleteEnterprise}
                onCancel={() => setDeletedEnterprise(null)}
            />
        </>
    );
};

export default EnterpiseListing;
