import React, { useEffect, useState } from 'react';
import { Table, Input, Row, Col, Tag, DatePicker, Select } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';

import { deleteMember, updateMemberByStaff } from '../../services/memberService';
import EditModal, { FormItem } from '../Modal/EditModal';
import ConfirmModal from '../Modal/ConfirmModal';
import { ApiResponse, MemberDetails, ReportStatus } from '../../types';
import { toast } from 'react-toastify';
import { getAllReports, updateReportByStaff } from '../../services/reportService';

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
    enterpriseId: string;
    companyName: string;
    date: string;
    phoneNumber: string;
    potential: boolean;
    greatPotential: boolean;
    strategy: string;
    status: ReportStatus;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const EnterpiseReport: React.FC = () => {
    const [reportList, setReportList] = useState<DataType[]>([]);
    const [editedReport, setEditedReport] = useState<DataType | null>(null);
    const [deletedReport, setDeletedReport] = useState<DataType | null>(null);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const [year, setYear] = useState<number>(2024);
    const [month, setMonth] = useState<number>(10);

    const fetchData = async () => {
        setLoading(true);

        const response = await getAllReports(
            month,
            year,
            tableParams.pagination?.current! - 1,
            tableParams.pagination?.pageSize!,
        );

        setReportList(
            response?.data.content.map((report: any) => {
                return {
                    id: report.report.reportId,
                    enterpriseId: report.enterprise.id,
                    companyName: report.enterprise.companyName,
                    date: report.report.date,
                    phoneNumber: report.enterprise.member.phoneNumber,
                    potential: report.isPotential,
                    greatPotential: report.isGreatPotential,
                    strategy: report.strategy,
                    status: report.reportStatus as ReportStatus,
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
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize, year, month]);

    const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    const handleEditClick = (report: DataType) => {
        setEditedReport(report);
    };

    const handleEditSave = async (updatedData: { [key: string]: any }) => {
        const updatedReport = {
            reportId: updatedData.id,
            enterpriseId: updatedData.enterpriseId,
            isPotential: updatedData.potential,
            isGreatPotential: updatedData.greatPotential,
            strategy: updatedData.strategy,
            reportStatus: updatedData.status,
        };

        // Call api update report
        const response: ApiResponse = await updateReportByStaff(updatedReport);

        // Update sucessfully
        if (response && response.statusCode === 200) {
            fetchData();
            toast.success('Update report successfully');
        }

        // Close the modal after saving
        setEditedReport(null);
    };

    const handleDeleteEnterprise = async () => {
        toast.warn('Cannot delete report');
        setDeletedReport(null);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Enterprise',
            dataIndex: 'companyName',
            sorter: true,
            width: '10%',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            width: '10%',
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            width: '15%',
        },
        {
            title: 'Potential',
            dataIndex: 'potential',
            width: '5%',
            align: 'center',
            render: (validate: boolean) => (
                <Tag color={validate ? 'green' : 'volcano'}>{validate ? 'TRUE' : 'FALSE'}</Tag>
            ),
        },
        {
            title: 'Great Potential',
            dataIndex: 'greatPotential',
            width: '5%',
            align: 'center',
            render: (validate: boolean) => (
                <Tag color={validate ? 'green' : 'volcano'}>{validate ? 'TRUE' : 'FALSE'}</Tag>
            ),
        },
        {
            title: 'Strategy',
            dataIndex: 'strategy',
            width: '20%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '10%',
            render: (status: ReportStatus) => {
                let color = '';
                let text = '';
                switch (status) {
                    case ReportStatus.IN_PROGRESS:
                        color = 'blue';
                        text = 'IN PROGRESS';
                        break;
                    case ReportStatus.FAILED:
                        color = 'red';
                        text = 'FAILED';
                        break;
                    case ReportStatus.SUCCESS:
                        color = 'green';
                        text = 'SUCCESS';
                        break;
                    default:
                        color = 'gray';
                        text = 'UNKNOWN';
                }
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '10%',
            render: (_, report) => (
                <span>
                    <EditOutlined
                        style={{ fontSize: '25px', color: '#f5b342', cursor: 'pointer' }}
                        onClick={() => handleEditClick(report)}
                    />
                    <DeleteOutlined
                        style={{ fontSize: '25px', color: '#f54242', marginLeft: '20px', cursor: 'pointer' }}
                        onClick={() => setDeletedReport(report)}
                    />
                </span>
            ),
        },
    ];

    const reportStatusOptions = Object.values(ReportStatus).map((status) => ({
        label: status.replace('_', ' '),
        value: status,
    }));

    const fields: FormItem[] = [
        { name: 'companyName', label: 'Company Name', type: 'text', isDisabled: true },
        { name: 'phoneNumber', label: 'Phone Number', type: 'text', isDisabled: true },
        { name: 'date', label: 'Date', type: 'datetime', isDisabled: true },
        { name: 'potential', label: 'Potential', type: 'checkbox', isDisabled: false },
        { name: 'greatPotential', label: 'Great Potential', type: 'checkbox', isDisabled: false },
        { name: 'strategy', label: 'Strategy', type: 'text', isDisabled: false },
        { name: 'status', label: 'Status', type: 'select', options: reportStatusOptions, isDisabled: false },
    ];

    return (
        <>
            <Row>
                <h3 style={headingStyle}>MONTHLY ENTERPRISE REPORTS</h3>
            </Row>
            <Row>
                <Col span={3} offset={10}>
                    <Select
                        placeholder="Select month"
                        optionFilterProp="label"
                        style={{ width: 150 }}
                        onChange={(value: string) => setMonth(parseInt(value))}
                        options={[
                            {
                                value: '1',
                                label: '1',
                            },
                            {
                                value: '2',
                                label: '2',
                            },
                            {
                                value: '3',
                                label: '3',
                            },
                            {
                                value: '4',
                                label: '4',
                            },
                            {
                                value: '5',
                                label: '5',
                            },
                            {
                                value: '6',
                                label: '6',
                            },
                            {
                                value: '7',
                                label: '7',
                            },
                            {
                                value: '8',
                                label: '8',
                            },
                            {
                                value: '9',
                                label: '9',
                            },
                            {
                                value: '10',
                                label: '10',
                            },
                            {
                                value: '11',
                                label: '11',
                            },
                            {
                                value: '12',
                                label: '12',
                            },
                        ]}
                    />
                </Col>
                <Col span={3}>
                    <Select
                        placeholder="Select year"
                        optionFilterProp="label"
                        style={{ width: 150 }}
                        onChange={(value: number) => setYear(value)}
                        options={[
                            {
                                value: 2020,
                                label: '2020',
                            },
                            {
                                value: 2021,
                                label: '2021',
                            },
                            {
                                value: 2022,
                                label: '2022',
                            },
                            {
                                value: 2023,
                                label: '2023',
                            },
                            {
                                value: 2024,
                                label: '2024',
                            },
                            {
                                value: 2025,
                                label: '2025',
                            },
                            {
                                value: 2026,
                                label: '2026',
                            },
                            {
                                value: 2027,
                                label: '2027',
                            },
                            {
                                value: 2028,
                                label: '2028',
                            },
                            {
                                value: 2029,
                                label: '2029',
                            },
                            {
                                value: 2030,
                                label: '2015',
                            },
                        ]}
                    />
                </Col>
                <Col span={8}>
                    <Search
                        placeholder="Type here ..."
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
                        dataSource={reportList}
                        pagination={tableParams.pagination}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </Col>
            </Row>

            <EditModal
                title="Edit Enterprise"
                data={editedReport || {}}
                isOpen={!!editedReport}
                fields={fields}
                onSave={handleEditSave}
                onCancel={() => setEditedReport(null)}
            />

            <ConfirmModal
                title="Confirm"
                content="Do you want to delete this report?"
                okText="Ok"
                cancelText="Cancel"
                isOpen={deletedReport !== null}
                onConfirm={handleDeleteEnterprise}
                onCancel={() => setDeletedReport(null)}
            />
        </>
    );
};

export default EnterpiseReport;
