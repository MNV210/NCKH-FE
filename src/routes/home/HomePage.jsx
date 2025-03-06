import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../hooks/Header';
import { BlogApi } from '../../api/BlogApi';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    // Remove useMediaQuery import and usage
    // const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    // useEffect(() => {
    //     // Use mock data instead of fetching from an API
    //     setPosts(mockPosts);
    // }, []);
    // const newsItems = [
    //     {
    //       id: 1,
    //       image: "https://cdn.hvcsnd.edu.vn/uploads/2024/11/07/5/07-11-fsin-3-1730946082.jpg?w=400&h=240&q=75&f=6&s=hmmel6ziuvu",
    //       title: "Đoàn công tác Học viện CSND thăm và làm việc tại Liên bang Nga",
    //       summary: "Được sự đồng ý của lãnh đạo Bộ Công an, từ ngày 27/10 - 03/11/2024, Đoàn công tác của Học viện CSND gồm 05 thành viên do đồng chí Đại tá, TS Nguyễn Đăng Sáu - Phó Giám đốc Học viện làm Trưởng đoàn đã có chuyến thăm v..."
    //     },
    //     {
    //       id: 2,
    //       image: "https://cdn.hvcsnd.edu.vn/uploads/2024/11/07/5/07-11-fsin-3-1730946082.jpg?w=400&h=240&q=75&f=6&s=hmmel6ziuvu",
    //       title: "Phú nhận Cách mạng tháng Mười Nga để xuyên tạc con đường đi lên chủ nghĩa xã hội ở Việt Nam - thủ đoạn nhám hiểm",
    //       summary: "Giá trị lịch của một cuộc cách mạng là tự thân ở chính nó và những lan tỏa tích cực từ nó ra thế giới xung quanh. Giá trị đó không phụ thuộc nhiều vào việc tô vẽ hay bôi nhọ nó. Nhưng chắc chắn rằng, những nhìn nhận, đánh giá khách..."
    //     },
    //     {
    //         id: 3,
    //         image: "https://cdn.hvcsnd.edu.vn/uploads/2024/11/07/5/07-11-fsin-3-1730946082.jpg?w=400&h=240&q=75&f=6&s=hmmel6ziuvu",
    //         title: "Phú nhận Cách mạng tháng Mười Nga để xuyên tạc con đường đi lên chủ nghĩa xã hội ở Việt Nam - thủ đoạn nhám hiểm",
    //         summary: "Giá trị lịch của một cuộc cách mạng là tự thân ở chính nó và những lan tỏa tích cực từ nó ra thế giới xung quanh. Giá trị đó không phụ thuộc nhiều vào việc tô vẽ hay bôi nhọ nó. Nhưng chắc chắn rằng, những nhìn nhận, đánh giá khách..."
    //       },
    //       {
    //         id: 4,
    //         image: "https://cdn.hvcsnd.edu.vn/uploads/2024/11/07/5/07-11-fsin-3-1730946082.jpg?w=400&h=240&q=75&f=6&s=hmmel6ziuvu",
    //         title: "Phú nhận Cách mạng tháng Mười Nga để xuyên tạc con đường đi lên chủ nghĩa xã hội ở Việt Nam - thủ đoạn nhám hiểm",
    //         summary: "Giá trị lịch của một cuộc cách mạng là tự thân ở chính nó và những lan tỏa tích cực từ nó ra thế giới xung quanh. Giá trị đó không phụ thuộc nhiều vào việc tô vẽ hay bôi nhọ nó. Nhưng chắc chắn rằng, những nhìn nhận, đánh giá khách..."
    //       },
    //       {
    //         id: 5,
    //         image: "https://cdn.hvcsnd.edu.vn/uploads/2024/11/07/5/07-11-fsin-3-1730946082.jpg?w=400&h=240&q=75&f=6&s=hmmel6ziuvu",
    //         title: "Phú nhận Cách mạng tháng Mười Nga để xuyên tạc con đường đi lên chủ nghĩa xã hội ở Việt Nam - thủ đoạn nhám hiểm",
    //         summary: "Giá trị lịch của một cuộc cách mạng là tự thân ở chính nó và những lan tỏa tích cực từ nó ra thế giới xung quanh. Giá trị đó không phụ thuộc nhiều vào việc tô vẽ hay bôi nhọ nó. Nhưng chắc chắn rằng, những nhìn nhận, đánh giá khách..."
    //       },
    //       {
    //         id: 6,
    //         image: "https://cdn.hvcsnd.edu.vn/uploads/2024/11/07/5/07-11-fsin-3-1730946082.jpg?w=400&h=240&q=75&f=6&s=hmmel6ziuvu",
    //         title: "Phú nhận Cách mạng tháng Mười Nga để xuyên tạc con đường đi lên chủ nghĩa xã hội ở Việt Nam - thủ đoạn nhám hiểm",
    //         summary: "Giá trị lịch của một cuộc cách mạng là tự thân ở chính nó và những lan tỏa tích cực từ nó ra thế giới xung quanh. Giá trị đó không phụ thuộc nhiều vào việc tô vẽ hay bôi nhọ nó. Nhưng chắc chắn rằng, những nhìn nhận, đánh giá khách..."
    //       }
    //   ];

    const getBlogs = async () => { 
        try {
            const response = await BlogApi.getBlogs();  
            setPosts(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBlogs();
    }, []);

    const handleBlogClick = (id) => {
        navigate(`/blog/${id}`);
    };

    return (
        <>
            <Header/>
            <div className="container mx-auto px-4 py-6 max-w-4xl">
                {posts.map((item) => (
                    <div 
                        key={item.id} 
                        className="border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden mb-6 hover:bg-gray-50 transition-colors"
                        onClick={() => handleBlogClick(item.id)}
                    >
                        <div className="flex p-4">
                            {/* Hình ảnh */}
                            <div className="w-1/3 mr-4">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                            </div>

                            {/* Nội dung */}
                            <div className="w-2/3">
                                <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                                    {item.title}
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-3">
                                    {item.summary}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HomePage;
