import { BlogApi } from "../../api/BlogApi";
import Header from "../../hooks/Header";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

export default function ContentOfBlog() {
    const params = useParams();

    const [contents, setContents] = useState([]);

    const getContents = async () => {
        try {
            const response = await BlogApi.getBlogById(params.id);
            setContents(response);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getContents();
    }, []);
    
    return (
        <>
            <Header/>
            <div className="max-w-3xl mx-auto md:p-8 p-4">
                <article className="bg-white p-6 rounded-2xl shadow-md p-4">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">{contents.title}</h1>
                <p className="text-gray-600 text-sm md:text-base mb-6">{contents.created_at}</p>
                <img
                    src={`${contents.image}`}
                    alt="Blog Cover"
                    className="w-full h-auto rounded-lg mb-6"
                />
                <div className="text-gray-800 text-sm md:text-base leading-relaxed">
                    <p className="mb-5">
                    {contents.content}
                    </p>
                    {/* <p className="mb-4">
                    Sử dụng <strong>React.js</strong> và <strong>TailwindCSS</strong> giúp tạo giao diện đẹp và dễ tùy chỉnh.
                    </p> */}
                </div>
                </article>
            </div>
        </>
    );
  }
