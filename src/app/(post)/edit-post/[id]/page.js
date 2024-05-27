"use client"
import { EditPostForm } from "@/components/Post/editPost";
import { useState, useEffect } from "react";

export default function EditPostPage({ params }) {
  const { id } = params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/post/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="mb-20">
          {post && <EditPostForm p={post} />}
        </div>
      </div>
    </>
  );
}
