import React, { useState, useEffect } from "react";
import Header from "../../hooks/Header";
import { useParams } from "react-router-dom";
import { Tests } from "../../api/TestApi";

const ResultTest = () => {
    const params = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getResults = async () => {
        try {
            const storageData = localStorage.getItem("user");
            const data = {
                test_id: params.id,
                user_id: storageData ? JSON.parse(storageData).user_id : null,
            };
            const response = await Tests.getHistoryMakeTest(data);
            setResults(response);
        } catch (error) {
            console.error(error);
            setError("Không thể tải kết quả. Vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getResults();
    }, []);

    return (
        <>
            <Header />
            <div className="mt-10 flex flex-col items-center justify-center p-4">
                <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
                    <h2 className="text-xl font-bold text-center mb-4">Kết Quả Bài Kiểm Tra</h2>

                    {loading ? (
                        <p className="text-center text-gray-500">Đang tải kết quả...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : results.length > 0 ? (
                        <ul>
                            {results.map((student, index) => (
                                <li key={index} className="flex justify-between p-3 border-b last:border-none">
                                    <span className="font-medium">{student.user.email}</span>
                                    <span className="text-blue-600 font-semibold">Điểm: {student.score}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500">Chưa có kết quả nào.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ResultTest;
