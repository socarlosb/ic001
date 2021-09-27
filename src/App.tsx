import "./styles.css";
import { useState, useEffect, useRef } from "react";
import { addPost, getPosts } from "./utils/api";
import { IPost, Tfilter, IApiRequest } from "./types";
import { Post } from "./components/Post";
import { Loader } from "./components/Loader";
import { NewPost } from "./components/NewPost";

export default function App() {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [loading, setLoading] = useState(false);
	const [filter, setFilter] = useState<Tfilter>("all");
	const [showNewPost, setShowNewPost] = useState(false);

	/**
	 * We can add more user info here
	 */
	const [createNewPost, setCreateNewPost] = useState<IApiRequest>({
		validated: true,
		userName: "Carlos",
		userProfileImgUrl:
			"https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_1280.png",
		comment: "",
	});

	useEffect(() => {
		const getData = async () => {
			try {
				setLoading(true);
				const data = await getPosts(0, filter);
				setPosts(data?.posts || []);
				setLoading(false);
			} catch (error) {
				console.info("error", error);
				console.info("----------------");
			}
		};
		getData();
	}, [filter]);

	const sendNewPost = async () => {
		try {
			const newData = await addPost(createNewPost);
			const newPost = newData.posts;
			setPosts([newPost, ...posts]);
			window.scrollTo(0, 0);
			setShowNewPost(false);
			setCreateNewPost({ ...createNewPost, comment: "" });
		} catch (error) {
			console.info("error", error);
			console.info("----------------");
		}
	};

	return (
		<div>
			<header className="sticky">
				<h1>Discussion to the infinity</h1>
				<section className="options">
					<button
						type="button"
						className={`button
					${filter == "all" ? "button--active" : ""}`}
						onClick={() => setFilter("all")}
					>
						All
					</button>
					<button
						type="button"
						className={`button ${
							filter == "validated" ? "button--active" : ""
						}`}
						onClick={() => setFilter("validated")}
					>
						Active
					</button>
					<button
						type="button"
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
					posts.map((post: IPost) => <Post key={post.id} info={post} />)
				)}
			</section>

			<NewPost
				createNewPost={createNewPost}
				sendNewPost={sendNewPost}
				setCreateNewPost={setCreateNewPost}
				setShowNewPost={setShowNewPost}
				showNewPost={showNewPost}
			></NewPost>
		</div>
	);
}
