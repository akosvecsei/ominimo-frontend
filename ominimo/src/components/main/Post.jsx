import React from "react";

function Post({ post, onClick }) {
  return (
    <div
      className="post-container bg-[#333333] text-white rounded-xl p-4 mb-4 shadow-lg max-w-md w-full cursor-pointer"
      style={{ padding: "12px" }}
      onClick={onClick}
    >
      <h2
        className="text-xl font-bold"
        style={{ fontSize: "1.2rem", fontWeight: 600 }}
      >
        {post.title}
      </h2>
      <p className="mt-2">{post.content}</p>
      <p className="mt-2 text-gray-400" style={{ fontSize: "0.7rem" }}>
        <strong>Created At:</strong>{" "}
        {new Date(post.created_at).toLocaleString()}
      </p>

      {post.comments && post.comments.length > 0 && (
        <div className="comments mt-4">
          <p className="font-semibold" style={{ fontSize: "0.8rem" }}>
            Comments:
          </p>
          <div className="flex flex-col gap-1">
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-[#555555] text-white rounded-lg p-2"
                style={{ padding: "7px" }}
              >
                <p>{comment.comment}</p>
                <p className="text-xs mt-1" style={{ fontSize: "0.6rem" }}>
                  Commented At: {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
