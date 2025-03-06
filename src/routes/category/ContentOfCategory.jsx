import React, { useState, useEffect } from 'react';
import Header from '../../hooks/Header';
import { useParams } from 'react-router-dom';
import { HeadContent } from '../../api/HeadContent';
import { set } from 'react-hook-form';

const ContentOfCategory = () => {
    const params = useParams();
    const [contents, setContents] = useState([]);
    const [headContent, setHeadContent] = useState({});
  // Table headers
  const headers = [
    { key: 'nga', label: 'Tiếng Nga' },
    { key: 'phienam', label: 'Phiên âm' },
    { key: 'viet', label: 'Tiếng Việt' },
  ];
  
  const getContent = async() => {
    try {
      const response = await HeadContent.getContentByCategoryId(params.id);
      setContents(response);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }

  const getHeadContentById = async() => {
      const response = await HeadContent.getHeadContentById(params.id)
      console.log(response)
      setHeadContent(response)
  }

  useEffect(() => {
    getContent();
    getHeadContentById()
  }, [params.id]);

  return (
    <div className="container mx-auto p-4 mb-10">
      <Header />
      {/* <h1 className="text-2xl font-bold mb-6">Danh sách từ vựng</h1> */}
        <h3 className='text-xl font-bold mb-4 text-center mt-4'>{headContent.title}</h3>

      {contents.length === 0 ? (
        <div className="text-center text-gray-500">hiện chưa có dữ liệu</div>
      ) : (
        <>
          {/* Desktop table view - hidden on mobile */}
          <div className="hidden md:block">
            <div className="rounded-lg shadow">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    {headers.map((header) => (
                      <th key={header.key} className="py-3 px-4 text-left font-medium">
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contents.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{row.nga}</td>
                      <td className="py-3 px-4">{row.phienam}</td>
                      <td className="py-3 px-4">{row.viet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile view with table-like rows but responsive */}
          <div className="md:hidden">
            {/* Header row - appears once */}
            <div className="grid grid-cols-3 gap-2 bg-gray-200 p-3 rounded-t-lg mb-2">
              {headers.map((header) => (
                <div key={header.key} className="text-sm font-medium text-gray-700">
                  {header.label}
                </div>
              ))}
            </div>
            
            {/* Content rows */}
            <div className="rounded-b-lg shadow overflow-hidden">
              {contents?.map((row, index) => (
                <div 
                  key={row.id} 
                  className={`grid grid-cols-3 gap-2 p-3 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } border-b last:border-b-0`}
                >
                  <div className="break-words">{row.nga}</div>
                  <div className="break-words">{row.phienam}</div>
                  <div className="break-words">{row.viet}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentOfCategory;