import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import { Categories } from '../../api/CetegoryApi';
import Header from '../../hooks/Header';

const ContentOfCategory = () => {
    const [data, setData] = useState([]);

    const param = useParams();

    const getContentOfCategory = async () => {
        // Call API to get content of category
        const response = await Categories.getContentByCategoryId(param.id);
        setData(response);
        console.log(response)
    }

    useEffect(() => {
        getContentOfCategory();
    }, []);

    const columns = [
        {
            title: 'Nga',
            dataIndex: 'nga',
            key: 'nga',
        },
        {
            title: 'Viet',
            dataIndex: 'viet',
            key: 'viet',
        },
        {
            title: 'Giaithich',
            dataIndex: 'giaithich',
            key: 'giaithich',
        },
    ];

    return (
        <div className="">
            <Header />
            <a href="/" className="text-blue-500 mt-5">Về trang chủ</a>
            <h1 className="text-2xl font-bold mb-4 mt-10">{data[0]?.category.name}</h1>
            <Table dataSource={data} columns={columns} rowKey="id"/>
        </div>
    );
};

export default ContentOfCategory;
