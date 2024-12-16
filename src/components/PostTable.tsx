import React, { useState } from "react";
import { Table, Button, Space, notification } from "antd";
import { Post } from "../types/Post";
import api from "../services/api";
import ReusableModal from "./ReusableModal";

const PostTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get<Post[]>("/posts");
      setPosts(response.data);
    } catch (error) {
      notification.error({ message: "Error fetching posts" });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (values: { title: string; body: string }) => {
    setLoading(true);
    try {
      const response = await api.post("/posts", values);
      setPosts([...posts, response.data]);
      notification.success({ message: "Post added successfully" });
    } catch (error) {
      notification.error({ message: "Error adding post" });
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleEdit = async (values: { title: string; body: string }) => {
    if (!selectedPost) return;
    setLoading(true);
    console.log(selectedPost);
    
    try {
      const response = await api.put(`/posts/${selectedPost.id}`, values);
      setPosts(
        posts.map((post) =>
          post.id === selectedPost.id ? response.data : post
        )
      );
      notification.success({ message: "Post updated successfully" });
    } catch (error) {
      notification.error({ message: "Error updating post" });
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };
  

  const handleDelete = async () => {
    if (!selectedPost) return;
    setLoading(true);
    try {
      await api.delete(`/posts/${selectedPost.id}`);
      setPosts(posts.filter((post) => post.id !== selectedPost.id));
      notification.success({ message: "Post deleted successfully" });
    } catch (error) {
      notification.error({ message: "Error deleting post" });
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const openModal = (mode: "add" | "edit" | "delete", post?: Post) => {
    setModalMode(mode);
    setSelectedPost(post || null);
    setIsModalOpen(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Body", dataIndex: "body", key: "body" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, post: Post) => (
        <Space>
          <Button onClick={() => openModal("edit", post)}>Edit</Button>
          <Button danger onClick={() => openModal("delete", post)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  React.useEffect(() => {
    fetchPosts();
  }, []);
  console.log(modalMode);
  

  return (
    <>
      <button
        className="bg-gradient-to-r mb-8 from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-4 focus:ring-green-300 text-white font-semibold text-sm rounded-lg px-6 py-2 shadow-lg transform transition-transform duration-150 ease-in-out hover:scale-105 focus:scale-100 active:scale-95 dark:from-green-700 dark:to-green-800 dark:hover:from-green-800 dark:hover:to-green-900 dark:focus:ring-green-900"
        onClick={() => openModal("add")}
      >
        Add Post
      </button>

      <Table
        dataSource={posts}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
      <ReusableModal
        isOpen={isModalOpen}
        title={
          modalMode === "add"
            ? "Add New Post"
            : modalMode === "edit"
            ? "Edit Post"
            : "Delete Post"
        }
        mode={modalMode}
        defaultValues={
          modalMode === "edit" && selectedPost
            ? { title: selectedPost.title, body: selectedPost.body }
            : undefined
        }
        onSubmit={modalMode === "add" ? handleAdd : handleEdit}
        onConfirm={modalMode === "delete" ? handleDelete : undefined}
        onClose={() => setIsModalOpen(false)}
        loading={loading}
      />
    </>
  );
};

export default PostTable;
