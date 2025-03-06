import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, MessageCircle } from 'lucide-react';
import { Categories } from '../../api/CetegoryApi';
import { HeadContent } from '../../api/HeadContent';
import Header from '../../hooks/Header';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});

  const getCategory = async () => {
    try {
      const response = await Categories.getCategories();
      setCategories(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getSubcategories = async (categoryId) => {
    try {
      const response = await HeadContent.getHeadContent(categoryId);
      setSubcategories((prev) => ({
        ...prev,
        [categoryId]: response,
      }));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const icons = {
    BookOpen,
    MessageCircle,
  };

  const handleCategoryClick = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      if (!subcategories[categoryId]) {
        getSubcategories(categoryId);
      }
    }
  };

  const navigate = useNavigate();

  const handleSubcategoryClick = (subcategoryId,name) => {
    navigate(`/subcategory/${name}/${subcategoryId}`);
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <Header/>
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8 mt-5">
        Danh Mục Học Tiếng Nga
      </h1>

      <div className="space-y-6 px-4 py-2">
        {categories.map((category) => {
          const IconComponent = icons[category.icon];
          return (
            <div 
              key={category.id} 
              className="bg-white border border-gray-200 rounded-xl shadow-md"
            >
              <div 
                onClick={() => handleCategoryClick(category.id)}
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  }
                  <h2 className="text-xl font-semibold text-gray-900">
                    {category.name}
                  </h2>
                </div>
                <ChevronRight 
                  className={`w-6 h-6 text-gray-500 transform transition-transform ${
                    expandedCategory === category.id ? 'rotate-90' : ''
                  }`} 
                />
              </div>

              {expandedCategory === category.id && (
                <div className="grid md:grid-cols-2 gap-4 p-6 pt-0">
                  {subcategories[category.id]?.map((sub, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition-colors cursor-pointer"
                      onClick={() => handleSubcategoryClick(sub.id,sub.title)}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {sub.title}
                      </h3>
                      {/* <p className="text-gray-600 text-sm">
                        {sub.description}
                      </p> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
      })}
      </div>
    </div>
  );
};

export default Category;