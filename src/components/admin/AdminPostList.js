// components/NoticeList.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminPostList = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/admin/posts');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div>
     
      <button onClick={() => router.push('/admin/posts/new')}>Add New Post</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date Uploaded</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.description}</td>
              <td>{new Date(post.dateUploaded).toLocaleDateString()}</td>
              <td>
                <button onClick={() => router.push(`/admin/posts/${post._id}`)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPostList;
