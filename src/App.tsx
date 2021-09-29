import "./styles.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { VirtuosoHandle } from "react-virtuoso";
import { NewPost } from "./components/NewPost";
import { Actions } from "./components/Actions";
import { PostList } from "./components/PostList";
import { addPost, getPosts } from "./utils/api";
import { IPost, Tfilter, IApiRequest } from "./types";

export default function App() {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [nextPage, setNextPage] = useState<number | null>(0);
	const [filter, setFilter] = useState<Tfilter>("all");
	const [showNewPost, setShowNewPost] = useState(false);
	const [visibleRange, setVisibleRange] = useState(0);
	const virtuosoRef = useRef<VirtuosoHandle | null>(null);
	const totalPosts = useRef(0);

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
		if (sessionStorage.getItem("visibleRange") !== null) {
			const previousVisible = JSON.parse(
				sessionStorage.getItem("visibleRange") || ""
			);
			setVisibleRange(previousVisible);
			if (virtuosoRef.current) {
				virtuosoRef.current.scrollToIndex({
					index: previousVisible + 2,
					behavior: "smooth",
				});
			}
		}
	}, []);

	useEffect(() => {
		if (nextPage !== 0) {
			sessionStorage.setItem("visibleRange", JSON.stringify(visibleRange));
		}
	}, [visibleRange]);

	const loadMore = useCallback(() => {
		return setTimeout(async () => {
			try {
				if (nextPage === null) return;
				const data = await getPosts(nextPage, "all");
				if (data) {
					const newNextPage = data?.next_page;
					setNextPage(newNextPage);
					setPosts((oldPosts) => [...oldPosts, ...data?.posts]);
					totalPosts.current = data.total;
				}
			} catch (error) {
				console.info("error", error);
				console.info("----------------");
			}
		}, 200);
	}, [setPosts, nextPage]);

	useEffect(() => {
		const timeout = loadMore();
		return () => clearTimeout(timeout);
	}, []);

	const sendNewPost = async () => {
		try {
			const newData = await addPost(createNewPost);
			const newPost = newData.posts;
			setPosts([...posts, newPost]);
			if (virtuosoRef.current) {
				virtuosoRef.current.scrollToIndex({
					index:
						posts.length < totalPosts.current
							? totalPosts.current + 1
							: posts.length + 1,
					behavior: "smooth",
				});
			}
			setShowNewPost(false);
			setCreateNewPost({ ...createNewPost, comment: "" });
		} catch (error) {
			console.info("error", error);
			console.info("----------------");
		}
	};

	return (
		<>
			<header className="sticky">
				<h1>Discussion to the infinity</h1>
				<p>👁‍🗨 {visibleRange}</p>
				<Actions setFilter={setFilter}></Actions>
			</header>

			<section className="posts__container">
				<h2>Comments</h2>
				<PostList
					filter={filter}
					nextPage={nextPage}
					posts={posts}
					virtuosoRef={virtuosoRef}
					setVisibleRange={setVisibleRange}
					loadMore={loadMore}
				></PostList>
			</section>

			<NewPost
				createNewPost={createNewPost}
				sendNewPost={sendNewPost}
				setCreateNewPost={setCreateNewPost}
				setShowNewPost={setShowNewPost}
				showNewPost={showNewPost}
			></NewPost>
		</>
	);
}
