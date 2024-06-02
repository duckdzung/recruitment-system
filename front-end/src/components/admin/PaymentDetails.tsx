import React, { useEffect, useState } from 'react';
import { Table, Input, Row, Col } from 'antd';
import type { GetProp, TableProps } from 'antd';
import qs from 'qs';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';
import { PaymentMethod } from '../../types';

const { Search } = Input;

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// CSS for component
const headingStyle: React.CSSProperties = {
    margin: 'auto',
    fontFamily: 'Nunito',
    fontSize: '50px',
    fontWeight: 800,
    textAlign: 'center',
    color: '#0AADEB',
};

// Interface for component
interface DataType {
    id: number;
    phase: number;
    amountPaid: number;
    paymentMethod: PaymentMethod;
    date: Date;
    invoiceDate: Date;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        width: '5%',
        align: 'center',
    },
    {
        title: 'Phase',
        dataIndex: 'phase',
        width: '5%',
        align: 'center',
    },
    {
        title: 'Amount Paid',
        dataIndex: 'amountPaid',
        width: '10%',
    },
    {
        title: 'Payment Method',
        dataIndex: 'paymentMethod',
        width: '10%',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        width: '15%',
        align: 'center',
    },
    {
        title: 'Invoice Date',
        dataIndex: 'invoiceDate',
        width: '15%',
        align: 'center',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        width: '10%',
        render: () => (
            <span>
                <EditOutlined style={{ fontSize: '25px', color: '#f5b342' }} />
                <DeleteOutlined style={{ fontSize: '25px', color: '#f54242', marginLeft: '20px' }} />
            </span>
        ),
    },
];

const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});

const PaymentDetails: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const fetchData = () => {
        setLoading(true);
        fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
            .then((res) => res.json())
            .then(({ results }) => {
                setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return (
        <>
            <Row>
                <h3 style={headingStyle}>PAYMENT DETAILS</h3>
            </Row>
            <Row>
                <Col span={4} offset={20}>
                    <Search
                        placeholder="Search name, email, ..."
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
                        dataSource={data}
                        pagination={tableParams.pagination}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </Col>
            </Row>
        </>
    );
};

export default PaymentDetails;
