import "./styles.css";
import { useState, useEffect } from "react";
import { addPost, getPosts } from "./utils/api";
import { IPost } from "./types";
import { Post } from "./components/Post";
import { Loader } from "./components/Loader";

export default function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);

  /**
   * We can add more user info here
   */
  const [createNewPost, setCreateNewPost] = useState({
    comment: "",
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getPosts();
      setPosts(data.posts);
      setLoading(false);
    };
    getData();
  }, []);

  const sendNewPost = async () => {
    const demoData = {
      validated: false,
      userName: "Carlos",
      userProfileImgUrl:
        "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_1280.png",
      comment: createNewPost.comment,
    };
    const newData = await addPost(demoData);
    const newPost = newData.posts;
    setPosts([newPost, ...posts]);
  };

  return (
    <div>
      <header className="sticky">
        <h1>Discussion to the infinity</h1>
        <section className="options">
          <button
            className={`button
             ${!filter ? "button--active" : ""}`}
            onClick={() => setFilter(false)}
          >
            All
          </button>
          <button
            className={`button ${filter ? "button--active" : ""}`}
            onClick={() => setFilter(true)}
          >
            Active
          </button>
          <button
            className="button button--cta"
            onClick={() => setShowNewPost(!showNewPost)}
          >
            Reply
          </button>
        </section>
      </header>

      <section className="posts__container">
        {loading ? (
          <Loader />
        ) : (
          posts
            .filter((item: IPost) => (filter ? item.validated === true : item))
            .map((post: IPost) => <Post key={post.id} info={post} />)
        )}
      </section>

      <section className={`new-post ${showNewPost ? "new-post--close" : ""}`}>
        <textarea
          name="new-post"
          rows={6}
          onChange={(e) =>
            setCreateNewPost({ ...createNewPost, comment: e.target.value })
          }
        ></textarea>
        <div className="options">
          <button className="button button--cta" onClick={sendNewPost}>
            Send
          </button>
          <button
            className="button"
            onClick={() => setShowNewPost(!showNewPost)}
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
}
