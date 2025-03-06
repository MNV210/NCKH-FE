import React, { useEffect, useState } from "react";
import { Card, List, Button } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Header from "../../hooks/Header";
import { Tests } from "../../api/TestApi";
import { useNavigate } from "react-router-dom";

const TestList = () => {
    const [tests, setTests] = useState([]);
    const navigate = useNavigate();

    // Hàm lấy danh sách bài kiểm tra
    const getTestList = async () => {
        try {
            const response = await Tests.getTests();
            setTests(response);
            console.log("Danh sách bài kiểm tra:", response);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bài kiểm tra:", error);
        }
    };

    useEffect(() => {
        getTestList();
    }, []);

    // Hàm xử lý khi nhấn nút "Làm bài"
    const handleOnClickTest = async (id) => {
        try {
            const storageData = localStorage.getItem("user");
            const storage = storageData ? JSON.parse(storageData) : null;
    
            if (!storage || !storage.user_id) {
                console.error("Không tìm thấy thông tin user trong localStorage");
                return;
            }
    
            const data = {
                user_id: storage.user_id,
                test_id: id
            };
            const response = await Tests.getHistoryMakeTest(data);
            console.log("Kết quả lấy lịch sử làm bài:", response);
    
            // Sau khi lấy lịch sử bài kiểm tra, điều hướng tới trang làm bài
            if(response.length > 0){
                navigate(`/result/${id}`);

            }else{
                navigate(`/test/${id}`);
            }
            // navigate(`/test/${id}`);
        } catch (error) {
            console.error("Lỗi khi lấy lịch sử làm bài:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="p-4 max-w-lg mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
                    Danh sách bài kiểm tra
                </h1>
                <List
                    dataSource={tests}
                    renderItem={(test) => (
                        <List.Item>
                            <Card className="w-full shadow-md rounded-lg overflow-hidden" hoverable>
                                <div className="flex justify-between items-center p-4">
                                    <div className="flex items-center gap-3">
                                        {test.status === "Hoàn thành" ? (
                                            <CheckCircleOutlined className="text-green-500 text-xl" />
                                        ) : (
                                            <ClockCircleOutlined className="text-yellow-500 text-xl" />
                                        )}
                                        <span className="text-lg font-semibold">{test.name}</span>
                                    </div>
                                    {/* Sửa lỗi gọi hàm trực tiếp trong onClick */}
                                    <Button 
                                        type="primary" 
                                        shape="round" 
                                        onClick={() => handleOnClickTest(test.id)}
                                    >
                                        Làm bài
                                    </Button>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
};

export default TestList;
