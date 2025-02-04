import { useEditPost } from "@/hooks/post";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function EditPostView({ selectedPost, onClose }) {
  const { editPost, isEditing, error: editError } = useEditPost();

  const [title, setTitle] = useState(selectedPost.title);
  const [content, setContent] = useState(selectedPost.content);

  const { handleSubmit } = useForm();

  async function handleEditPost() {
    editPost({
      postId: selectedPost.id,
      title: title,
      content: content,
    }).then(() => {
      window.location.reload();
    });
  }

  return (
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

          <div className="cursor-pointer" onClick={onClose}>
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

        <form onSubmit={handleSubmit(handleEditPost)}>
          <div style={{ paddingLeft: "32px", paddingRight: "32px" }}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              //{...register("title")}
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
              //{...register("content")}
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
              {isEditing ? (
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
                <p className="font-[apple] text-black">Edit</p>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPostView;
