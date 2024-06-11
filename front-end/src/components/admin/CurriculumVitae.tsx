import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Row, Col, Tag } from 'antd';
import type { GetProp, TableProps } from 'antd';
import qs from 'qs';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';

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
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    validate: boolean;
    profiled: boolean;
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
    },
    {
        title: 'Validate',
        dataIndex: 'Validate',
        width: '5%',
        render: () => <Tag color="green">Validated</Tag>,
    },
    {
        title: 'Date Receipt',
        dataIndex: 'dateReceipt',
        width: '5%',
    },
    {
        title: 'Date Processed',
        dataIndex: 'dateProcessed',
        width: '5%',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        width: '5%',
        render: () => <Tag color="green">DONE</Tag>,
    },
    {
        title: 'Details',
        dataIndex: 'details',
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

const CurriculumVitae: React.FC = () => {
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
                <h3 style={headingStyle}>CURRICULUM VITAE</h3>
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

export default CurriculumVitae;
