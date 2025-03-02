import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../hooks/Header';
import { Categories } from '../../api/CetegoryApi';
import { Tests } from '../../api/TestApi'; // Import the Tests API

const ListCategory = () => {
    const [categories, setCategories] = useState([]);
    const [tests, setTests] = useState([]); // State for tests
    const [loading, setLoading] = useState(true);
    const [loadingTests, setLoadingTests] = useState(true); // Loading state for tests

    const getCategories = async () => {
        setLoading(true);
        const response = await Categories.getCategories();
        setCategories(response);
        setLoading(false);
    };

    const getTests = async () => {
        setLoadingTests(true);
        const response = await Tests.getTests(); // Fetch tests
        setTests(response);
        setLoadingTests(false);
    };

    useEffect(() => {
        getCategories();
        getTests(); // Fetch tests on component mount
    }, []);

    return (
        <div>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Danh mục</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map(category => (
                            <Link to={`/category/${category.id}`} key={category.id}>
                                <li className="p-4 border rounded shadow">
                                    {category.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
                <h1 className="text-2xl font-bold mb-4 mt-8">Bài kiểm tra</h1> {/* New section for tests */}
                {loadingTests ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {tests.map(test => (
                            <Link to={`/test/${test.id}`} key={test.id}>
                                <li className="p-4 border rounded shadow">
                                    {test.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ListCategory;
