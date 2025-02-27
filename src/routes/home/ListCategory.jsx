import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../hooks/Header';
import { Categories } from '../../api/CetegoryApi';

const ListCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCategories = async () => {
        setLoading(true);
        const response = await Categories.getCategories();
        setCategories(response);
        setLoading(false);
    };

    useEffect(() => {
        getCategories();
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
            </div>
        </div>
    );
};

export default ListCategory;
