import Link from "next/link";
import { useState } from "react";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleBook = async e => {
    e.preventDefault();

    // reset error and message
    setError("");
    setMessage("");

    // fields check
    if (!title || !content) return setError("All fields are required");
  };

  return (
    <div>
      {" "}
      <nav className="w-full border-b border-solid border-indigo-600">
        <ul className="flex justify-center space-x-2">
          <li>
            <Link href="/index2">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/add-book">
              <a>Add post</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <form onSubmit={handleBook}>
          {error ? (
            <div>
              <h3>{error}</h3>
            </div>
          ) : null}
          {message ? (
            <div>
              <h3>{message}</h3>
            </div>
          ) : null}
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              onChange={e => setTitle(e.target.value)}
              value={title}
              placeholder="title"
            />
          </div>
          <div>
            <label>Content</label>
            <textarea
              name="content"
              onChange={e => setContent(e.target.value)}
              value={content}
              placeholder="Post content"
            />
          </div>
          <div>
            <button type="submit">Add post</button>
          </div>
        </form>
      </div>
    </div>
  );
}
