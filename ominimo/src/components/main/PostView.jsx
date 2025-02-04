import { useDeleteComment, useDeletePost, usePostComment } from "@/hooks/post";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import EditPostView from "./EditPostView";
import { div } from "framer-motion/client";

function PostView({ selectedPost, onClose }) {
  const { register, handleSubmit } = useForm();

  const { deletePost, isDeleting, error: deleteError } = useDeletePost();
  const {
    postComment,
    isLoading: commentLoading,
    error: commentError,
  } = usePostComment();

  const toggleEditPost = () => setIsEditPostOpen((prevState) => !prevState);
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);

  const closeEdit = () => {
    setIsEditPostOpen(false);
  };

  async function handlePostComment(data) {
    console.log("bla: " + selectedPost.id);

    postComment({
      postId: selectedPost.id,
      comment: data.comment,
    });
  }

  const { deleteComment, isLoading, error } = useDeleteComment();

  const handleDelete = (commentId) => {
    deleteComment(commentId);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
    >
      <div
        className="w-[600px] h-[400px] bg-black rounded-2xl flex flex-col"
        style={{ paddingLeft: "32px", paddingRight: "32px" }}
      >
        <div className="h-[60px] flex flex-row items-center justify-between px-8 border-b border-gray-700">
          <p className="text-white text-lg font-bold">{selectedPost.title}</p>

          <div className="flex flex-row items-center justify-center gap-4">
            {selectedPost.user_id == sessionStorage.getItem("user_id") && (
              <div className="flex flex-row items-center gap-4">
                <div
                  className="cursor-pointer"
                  onClick={() => deletePost(selectedPost.id)}
                >
                  {isDeleting ? (
                    <svg
                      width="20"
                      height="20"
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
                      width="16"
                      height="16"
                      fill="#ffffff"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.25 4.5h-4.5V3.375A1.875 1.875 0 0 0 13.875 1.5h-3.75A1.875 1.875 0 0 0 8.25 3.375V4.5h-4.5a.75.75 0 0 0 0 1.5h.797l.89 14.293c.067 1.259 1.032 2.207 2.25 2.207h8.625c1.225 0 2.17-.927 2.25-2.203L19.453 6h.797a.75.75 0 1 0 0-1.5Zm-11.223 15H9a.75.75 0 0 1-.75-.723l-.375-10.5a.75.75 0 0 1 1.5-.054l.375 10.5a.75.75 0 0 1-.723.777Zm3.723-.75a.75.75 0 1 1-1.5 0V8.25a.75.75 0 1 1 1.5 0v10.5Zm1.5-14.25h-4.5V3.375A.37.37 0 0 1 10.125 3h3.75a.371.371 0 0 1 .375.375V4.5Zm1.5 14.277a.75.75 0 0 1-.75.723h-.027a.75.75 0 0 1-.723-.777l.375-10.5a.75.75 0 0 1 1.5.054l-.375 10.5Z"></path>
                    </svg>
                  )}
                </div>

                <div className="cursor-pointer" onClick={toggleEditPost}>
                  <svg
                    width="16"
                    height="16"
                    fill="#ffffff"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.828 21.754H2.25v-2.579L16.788 4.602l2.614 2.614L4.828 21.754Z"></path>
                    <path d="m19.956 6.656-2.612-2.612 1.484-1.437c.229-.23.58-.357.906-.357a1.214 1.214 0 0 1 .864.357l.797.797a1.213 1.213 0 0 1 .355.862c0 .328-.127.677-.357.907l-1.437 1.483Z"></path>
                  </svg>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="text-white text-lg cursor-pointer"
            >
              <svg
                width="26"
                height="26"
                fill="#ffffff"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m13.59 12.002 4.454-4.453a1.126 1.126 0 0 0-1.59-1.594L12 10.408 7.547 5.955A1.127 1.127 0 1 0 5.953 7.55l4.453 4.453-4.453 4.453a1.127 1.127 0 1 0 1.594 1.594L12 13.596l4.453 4.453a1.127 1.127 0 1 0 1.594-1.594l-4.456-4.453Z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8 text-white flex-1 overflow-y-auto">
          <p style={{ fontSize: "1.4rem" }}>{selectedPost.content}</p>
          <p
            className="text-sm opacity-70 mt-2"
            style={{ fontSize: "0.7rem", marginTop: "20px" }}
          >
            Created at: {new Date(selectedPost.created_at).toLocaleString()}
          </p>

          {selectedPost.comments.length > 0 ? (
            <div className="mt-4">
              <h3
                className="text-md font-semibold border-b border-gray-700 pb-2"
                style={{ fontSize: "0.7rem" }}
              >
                Comments:
              </h3>
              <div className="max-h-[150px] overflow-y-auto mt-2 flex flex-col gap-1">
                {selectedPost.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-[#333333] p-3 rounded-lg text-sm flex flex-row items-center justify-between"
                    style={{ padding: "10px" }}
                  >
                    <div>
                      <p className="text-white">{comment.comment}</p>
                      <p
                        className="text-xs opacity-60 mt-1"
                        style={{ fontSize: "0.6rem" }}
                      >
                        By User {comment.user_id} at{" "}
                        {new Date(comment.created_at).toLocaleString()}
                      </p>
                    </div>

                    {(sessionStorage.getItem("user_id") == comment.user_id ||
                      sessionStorage.getItem("user_id") ==
                        selectedPost.user_id) && (
                      <div
                        className="cursor-pointer"
                        onClick={() => handleDelete(comment.id)}
                        disabled={isLoading}
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="#ffffff"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.25 4.5h-4.5V3.375A1.875 1.875 0 0 0 13.875 1.5h-3.75A1.875 1.875 0 0 0 8.25 3.375V4.5h-4.5a.75.75 0 0 0 0 1.5h.797l.89 14.293c.067 1.259 1.032 2.207 2.25 2.207h8.625c1.225 0 2.17-.927 2.25-2.203L19.453 6h.797a.75.75 0 1 0 0-1.5Zm-11.223 15H9a.75.75 0 0 1-.75-.723l-.375-10.5a.75.75 0 0 1 1.5-.054l.375 10.5a.75.75 0 0 1-.723.777Zm3.723-.75a.75.75 0 1 1-1.5 0V8.25a.75.75 0 1 1 1.5 0v10.5Zm1.5-14.25h-4.5V3.375A.37.37 0 0 1 10.125 3h3.75a.371.371 0 0 1 .375.375V4.5Zm1.5 14.277a.75.75 0 0 1-.75.723h-.027a.75.75 0 0 1-.723-.777l.375-10.5a.75.75 0 0 1 1.5.054l-.375 10.5Z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No comments yet.</p>
          )}
        </div>

        <form onSubmit={handleSubmit(handlePostComment)}>
          <div
            style={{ paddingLeft: "5px", paddingRight: "5px" }}
            className="flex flex-row items-center gap-4"
          >
            <input
              type="text"
              {...register("comment")}
              style={{
                backgroundColor: "#333333",
                paddingLeft: "5px",
                borderRadius: "8px",
                marginBottom: "10px",
                paddingLeft: "12px",
              }}
              className="border-gray-500 border border-solid border-b-1 border-l-0 border-r-0 border-t-0 w-full h-[40px] focus:outline-none focus:border-black"
              placeholder="Comment..."
            />

            <Button
              sx={{
                backgroundColor: "#032fe8",
                height: "40px",
                width: "40px",
                borderRadius: "8px",
                textColor: "white",
                cursor: "pointer",
                fontWeight: "thin",
              }}
              _hover={{}}
              type="submit"
              className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer mt-5"
              style={{ borderRadius: "8px", marginBottom: "10px" }}
            >
              {commentLoading ? (
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
                <svg
                  width="16"
                  height="16"
                  fill="#000000"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.25A9.75 9.75 0 0 0 2.25 12c0 5.384 4.365 9.75 9.75 9.75 5.384 0 9.75-4.366 9.75-9.75 0-5.385-4.366-9.75-9.75-9.75Zm4.282 9.968a.751.751 0 0 1-1.06.004L12.75 9.77v6.261a.75.75 0 1 1-1.5 0V9.77l-2.472 2.452a.75.75 0 1 1-1.056-1.066l3.75-3.721a.75.75 0 0 1 1.056 0l3.75 3.721a.75.75 0 0 1 .005 1.062Z"></path>
                </svg>
              )}
            </Button>
          </div>
        </form>
      </div>

      {isEditPostOpen && (
        <EditPostView selectedPost={selectedPost} onClose={closeEdit} />
      )}
    </div>
  );
}

export default PostView;
