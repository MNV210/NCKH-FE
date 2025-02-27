import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Categories } from '../api/CetegoryApi';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = debounce(async (term) => {
            if (term) {
                // Call API to get search results
                const response = await Categories.getCategoriesWithName(term);
                setSearchResults(response);
            } else {
                setSearchResults([]);
            }
        }, 300);

        fetchResults(searchTerm);

        return () => {
            fetchResults.cancel();
        };
    }, [searchTerm]);

    const handleLinkClick = (id) => {
        navigate(`/category/${id}`);
        window.location.reload();
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <header className="h-24 bg-blue-500 flex items-center justify-between p-4">
            <h1 className="text-white text-2xl">My App</h1>
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="p-2 rounded border border-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg">
                        <ul>
                            {searchResults.map(result => (
                                <li 
                                    key={result.id} 
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleLinkClick(result.id)}
                                >
                                    {result.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                <Button type="primary" icon={<UserOutlined />} onClick={showModal}>
                </Button>
                <Modal title="Login" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Input placeholder="Username" className="mb-2" />
                    <Input.Password placeholder="Password" />
                </Modal>
            </div>
        </header>
    );
};

export default Header;
