import { useState, useEffect } from "react";

export function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function createPost({ title, content }) {
    setIsLoading(true);
    setError(null);

    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to create a post.");
      setIsLoading(false);
      return;
    }

    if (title == "" || content == "") {
      setError("Title and content must not be empty.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Post created successfully!", data);
        return data;
      } else {
        setError(data.message || "An error occurred while creating the post");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);

      window.location.reload();
    }
  }

  return { createPost, isLoading, error };
}

export function useFetchPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      setError(null);

      const token = sessionStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view posts");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/posts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setPosts(data);
        } else {
          setError(data.message || "An error occurred while fetching posts");
        }
      } catch (error) {
        setError("An unexpected error occurred");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, isLoading, error };
}

export function useDeletePost() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  async function deletePost(postId) {
    setIsDeleting(true);
    setError(null);

    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to delete a post");
      setIsDeleting(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        window.location.reload();
      } else {
        setError(data.message || "An error occurred while deleting the post");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return { deletePost, isDeleting, error };
}

export function useEditPost() {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  async function editPost({ postId, title, content }) {
    setIsEditing(true);
    setError(null);

    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to edit a post");
      setIsEditing(false);
      return;
    }

    if (title == "" || content == "") {
      setError("Title and content must not be empty.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        window.location.reload();
      } else {
        setError(data.message || "An error occurred while updating the post");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  }

  return { editPost, isEditing, error };
}

export function usePostComment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postComment = async ({ postId, comment }) => {
    setIsLoading(true);
    setError(null);

    console.log("postid: " + postId);

    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to post a comment");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Comment posted:", data);
        window.location.reload();
      } else {
        setError(data.message || "An error occurred while posting the comment");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { postComment, isLoading, error };
}

export function useDeleteComment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteComment = async (commentId) => {
    setIsLoading(true);
    setError(null);

    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to delete a comment");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      window.location.reload();
    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteComment, isLoading, error };
}
