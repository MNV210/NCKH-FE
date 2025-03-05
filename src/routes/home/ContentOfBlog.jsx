import React, { useEffect, useState } from 'react';

const ContentOfBlog = () => {
    const [blogContent, setBlogContent] = useState('');

    useEffect(() => {
        // Fetch the blog content from an API or a local file
        fetch('/path/to/blog/content')
            .then(response => response.json())
            .then(data => setBlogContent(data.content))
            .catch(error => console.error('Error fetching blog content:', error));
    }, []);

    return (
        <div>
            <h1>Blog Content</h1>
            <div>{blogContent}</div>
        </div>
    );
};

export default ContentOfBlog;
