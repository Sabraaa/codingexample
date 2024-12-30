'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  const openModal = (post: Post, type: 'view' | 'edit' | 'delete') => {
    setSelectedPost(post);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalType(null);
  };

  const deleteHandler = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    closeModal(); 
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300">ID</th>
              <th className="px-4 py-2 border border-gray-300">Title</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-gray-100 even:bg-gray-50 odd:bg-white"
              >
                <td className="px-4 py-2 border border-gray-300">{post.id}</td>
                <td className="px-4 py-2 border border-gray-300">{post.title}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => openModal(post, 'view')}
                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => openModal(post, 'edit')}
                    className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openModal(post, 'delete')}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalType && selectedPost && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {modalType === 'view'
                ? 'View Post'
                : modalType === 'edit'
                ? 'Edit Post'
                : 'Delete Post'}
            </h2>
            <div className="mb-4">
              {modalType === 'view' && (
                <>
                  <p>
                    <strong>ID:</strong> {selectedPost.id}
                  </p>
                  <p>
                    <strong>Title:</strong> {selectedPost.title}
                  </p>
                  <p>
                    <strong>Comment:</strong> {selectedPost.body}
                  </p>
                </>
              )}
              {modalType === 'edit' && (
                <form>
                  <label className="block mb-2 text-sm font-medium">Title</label>
                  <input
                    type="text"
                    defaultValue={selectedPost.title}
                    className="w-full border border-gray-300 p-2 rounded mb-4"
                  />
                  <label className="block mb-2 text-sm font-medium">Comment</label>
                  <textarea
                    defaultValue={selectedPost.body}
                    className="w-full border border-gray-300 p-2 rounded mb-4"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                </form>
              )}
              {modalType === 'delete' && (
                <p>Are you sure you want to delete this post?</p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              {modalType === 'delete' && (
                <button
                  onClick={() => deleteHandler(selectedPost.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Confirm
                </button>
              )}
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
