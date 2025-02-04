import { useLogout } from "@/hooks/auth";
import {
  useCreatePost,
  useDeletePost,
  useEditPost,
  useFetchPosts,
  usePostComment,
} from "@/hooks/post";
import { Button } from "@chakra-ui/react";
import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import PostView from "./PostView";
import EditPostView from "./EditPostView";

function MainView() {
  const navigate = useNavigate();
  const { logout, isLoading } = useLogout();
  const { register, handleSubmit } = useForm();

  const { createPost, isLoading: createLoading, error } = useCreatePost();
  const { posts, isLoading: postsLoading, error: postsError } = useFetchPosts();
  const { deletePost, isDeleting, error: deleteError } = useDeletePost();
  const { editPost, isEditing, error: editError } = useEditPost();
  const {
    postComment,
    isLoading: commentLoading,
    error: commentError,
  } = usePostComment();

  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState();

  const [isEditPostOpen, setIsEditPostOpen] = useState(false);

  const toggleNewPost = () => setIsNewPostOpen((prevState) => !prevState);

  const toggleEditPost = () => setIsEditPostOpen((prevState) => !prevState);

  const togglePost = (post) => {
    setSelectedPost(post);
    setIsPostOpen(true);
  };

  const closePost = () => {
    setIsPostOpen(false);
  };

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  async function handleCreatePost(data) {
    createPost({
      title: data.title,
      content: data.content,
    }).then(() => {
      toggleNewPost();
    });
  }

  async function handleEditPost() {
    editPost({
      postId: selectedPost.id,
      title: title,
      content: content,
    }).then(() => {
      toggleEditPost();
    });
  }

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="w-full">
      <div
        className="h-[70px] flex items-center justify-between"
        style={{ paddingLeft: "32px" }}
      >
        <p>Ominimo Blog</p>
        <div
          style={{ paddingRight: "32px" }}
          className="cursor-pointer"
          onClick={() => logout()}
        >
          {isLoading ? (
            <svg
              width="26"
              height="26"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.825 21.75h10.35c.927 0 1.666-.764 1.566-1.643-.645-5.67-4.491-5.576-4.491-8.107 0-2.531 3.895-2.39 4.49-8.107.094-.88-.638-1.643-1.566-1.643H6.825c-.928 0-1.658.763-1.566 1.643C5.854 9.61 9.75 9.422 9.75 12c0 2.578-3.846 2.438-4.49 8.107-.1.88.638 1.643 1.566 1.643Z"></path>
              <path
                fill="#ffffff"
                stroke="none"
                d="M16.091 20.25H7.927c-.731 0-.937-.844-.424-1.367 1.24-1.258 3.746-2.159 3.746-3.602V10.5c0-.93-1.781-1.64-2.883-3.15-.182-.249-.164-.6.299-.6h6.69c.394 0 .48.348.3.598-1.086 1.511-2.906 2.217-2.906 3.152v4.781c0 1.431 2.612 2.203 3.769 3.603.466.565.303 1.366-.427 1.366Z"
              ></path>
            </svg>
          ) : (
            <svg
              width="26"
              height="26"
              fill="#ffffff"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.5 12a.75.75 0 0 1 .75-.75H15V6.375c0-1.5-1.584-2.625-3-2.625H4.875A2.628 2.628 0 0 0 2.25 6.375v11.25a2.628 2.628 0 0 0 2.625 2.625h7.5A2.627 2.627 0 0 0 15 17.625V12.75H8.25A.75.75 0 0 1 7.5 12Z"></path>
              <path d="m21.53 11.472-3.75-3.75a.75.75 0 0 0-1.06 1.06l2.47 2.47H15v1.5h4.19l-2.47 2.47a.749.749 0 0 0 .526 1.294.75.75 0 0 0 .534-.234l3.75-3.75a.75.75 0 0 0 0-1.06Z"></path>
            </svg>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <div
          className="w-[700px] h-[60px] flex justify-center items-center bg-[#333333] rounded-2xl gap-5 cursor-pointer"
          onClick={toggleNewPost}
        >
          <svg
            width="26"
            height="26"
            fill="#ffffff"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.828 21.754H2.25v-2.579L16.788 4.602l2.614 2.614L4.828 21.754Z"></path>
            <path d="m19.956 6.656-2.612-2.612 1.484-1.437c.229-.23.58-.357.906-.357a1.214 1.214 0 0 1 .864.357l.797.797a1.213 1.213 0 0 1 .355.862c0 .328-.127.677-.357.907l-1.437 1.483Z"></path>
          </svg>
          <p>New Post</p>
        </div>

        {postsLoading ? (
          <div style={{ marginTop: "50px" }}>
            <svg
              width="26"
              height="26"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.825 21.75h10.35c.927 0 1.666-.764 1.566-1.643-.645-5.67-4.491-5.576-4.491-8.107 0-2.531 3.895-2.39 4.49-8.107.094-.88-.638-1.643-1.566-1.643H6.825c-.928 0-1.658.763-1.566 1.643C5.854 9.61 9.75 9.422 9.75 12c0 2.578-3.846 2.438-4.49 8.107-.1.88.638 1.643 1.566 1.643Z"></path>
              <path
                fill="#ffffff"
                stroke="none"
                d="M16.091 20.25H7.927c-.731 0-.937-.844-.424-1.367 1.24-1.258 3.746-2.159 3.746-3.602V10.5c0-.93-1.781-1.64-2.883-3.15-.182-.249-.164-.6.299-.6h6.69c.394 0 .48.348.3.598-1.086 1.511-2.906 2.217-2.906 3.152v4.781c0 1.431 2.612 2.203 3.769 3.603.466.565.303 1.366-.427 1.366Z"
              ></path>
            </svg>
          </div>
        ) : posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div
            style={{ marginTop: "32px" }}
            className="w-full flex flex-col items-center gap-5"
          >
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onClick={() => togglePost(post)}
              />
            ))}
          </div>
        )}
      </div>

      {isPostOpen && (
        <PostView selectedPost={selectedPost} onClose={closePost} />
      )}

      {isNewPostOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div className="w-[600px] h-[300px] bg-black rounded-2xl flex flex-col">
            <div
              className="h-[60px] flex flex-row items-center justify-between"
              style={{ paddingLeft: "32px", paddingRight: "17px" }}
            >
              <p>New Post</p>

              <div className="cursor-pointer" onClick={toggleNewPost}>
                <svg
                  width="26"
                  height="26"
                  fill="#ffffff"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m13.59 12.002 4.454-4.453a1.126 1.126 0 0 0-1.59-1.594L12 10.408 7.547 5.955A1.127 1.127 0 1 0 5.953 7.55l4.453 4.453-4.453 4.453a1.127 1.127 0 1 0 1.594 1.594L12 13.596l4.453 4.453a1.127 1.127 0 1 0 1.594-1.594l-4.456-4.453Z"></path>
                </svg>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleCreatePost)}>
              <div style={{ paddingLeft: "32px", paddingRight: "32px" }}>
                <input
                  type="text"
                  {...register("title")}
                  style={{
                    backgroundColor: "#333333",
                    paddingLeft: "12px",
                    borderRadius: "8px",
                    marginTop: "30px",
                    paddingLeft: "12px",
                  }}
                  className="border-gray-500 border border-solid border-b-1 border-l-0 border-r-0 border-t-0 w-full h-[40px] focus:outline-none focus:border-black"
                  placeholder="Title..."
                />

                <textarea
                  {...register("content")}
                  style={{
                    backgroundColor: "#333333",
                    paddingLeft: "12px",
                    borderRadius: "8px",
                    marginTop: "10px",
                    paddingTop: "10px",
                    resize: "none",
                  }}
                  className="border-gray-500 border border-solid border-b-1 border-l-0 border-r-0 border-t-0 w-full h-[100px] focus:outline-none focus:border-black"
                  placeholder="Content..."
                ></textarea>

                <Button
                  sx={{
                    backgroundColor: "#032fe8",
                    height: "40px",
                    width: "full",
                    borderRadius: "8px",
                    textColor: "white",
                    cursor: "pointer",
                    fontWeight: "thin",
                  }}
                  _hover={{}}
                  type="submit"
                  className="w-full h-[40px] flex justify-center items-center cursor-pointer mt-5"
                  style={{ borderRadius: "8px" }}
                >
                  {createLoading ? (
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6.825 21.75h10.35c.927 0 1.666-.764 1.566-1.643-.645-5.67-4.491-5.576-4.491-8.107 0-2.531 3.895-2.39 4.49-8.107.094-.88-.638-1.643-1.566-1.643H6.825c-.928 0-1.658.763-1.566 1.643C5.854 9.61 9.75 9.422 9.75 12c0 2.578-3.846 2.438-4.49 8.107-.1.88.638 1.643 1.566 1.643Z"></path>
                      <path
                        fill="#000000"
                        stroke="none"
                        d="M16.091 20.25H7.927c-.731 0-.937-.844-.424-1.367 1.24-1.258 3.746-2.159 3.746-3.602V10.5c0-.93-1.781-1.64-2.883-3.15-.182-.249-.164-.6.299-.6h6.69c.394 0 .48.348.3.598-1.086 1.511-2.906 2.217-2.906 3.152v4.781c0 1.431 2.612 2.203 3.769 3.603.466.565.303 1.366-.427 1.366Z"
                      ></path>
                    </svg>
                  ) : (
                    <p className="font-[apple] text-black">Post</p>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainView;
