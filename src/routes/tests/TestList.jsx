import React, { useEffect } from "react";
import { Card, List, Button } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Header from "../../hooks/Header";
import { Tests } from "../../api/TestApi";
import { useNavigate } from "react-router-dom";


const TestList = () => {
    const [tests, setTests] = React.useState([]);
    const navigate = useNavigate();
    const getTestList = async () => {
        try {
            const response = await Tests.getTests();
            setTests(response);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTestList();
    }, []);

    const hanldeOnClickTest = (id) => () => {
        navigate(`/test/${id}`);
    }

  return (
    <>
        <Header/>
        <div className="p-4 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Danh sách bài kiểm tra</h1>
        <List
            dataSource={tests}
            renderItem={(test) => (
            <List.Item>
                <Card
                className="w-full shadow-md rounded-lg overflow-hidden"
                hoverable
                >
                <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-3">
                    {test.status === "Hoàn thành" ? (
                        <CheckCircleOutlined className="text-green-500 text-xl" />
                    ) : (
                        <ClockCircleOutlined className="text-yellow-500 text-xl" />
                    )}
                    <span className="text-lg font-semibold">{test.name}</span>
                    </div>
                    <Button type="primary" shape="round" onClick={hanldeOnClickTest(test.id)}>Làm bài</Button>
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
