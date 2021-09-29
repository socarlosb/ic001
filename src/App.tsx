import "./styles.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { addPost, getPosts } from "./utils/api";
import { IPost, Tfilter, IApiRequest } from "./types";
import { Post } from "./components/Post";
import { NewPost } from "./components/NewPost";
import { Actions } from "./components/Actions";

export default function App() {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [nextPage, setNextPage] = useState<number | null>(0);
	const [filter, setFilter] = useState<Tfilter>("all");
	const [showNewPost, setShowNewPost] = useState(false);
	const [visibleRange, setVisibleRange] = useState(0);
	const virtuoso = useRef<VirtuosoHandle | null>(null);
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
			if (virtuoso.current) {
				virtuoso.current.scrollToIndex({
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

	const fetchData = async (pageToFetch: number) => {
		try {
			const data = await getPosts(pageToFetch, "all");
			return data;
		} catch (error) {
			console.info("error", error);
			console.info("----------------");
		}
	};

	const loadMore = useCallback(() => {
		return setTimeout(async () => {
			try {
				if (nextPage === null) return;
				const data = await fetchData(nextPage);
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
			if (virtuoso.current) {
				virtuoso.current.scrollToIndex({
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
				<p>{visibleRange}</p>
				<Actions setFilter={setFilter}></Actions>
			</header>

			<section className="posts__container">
				<h2>Comments</h2>
				<Virtuoso
					ref={virtuoso}
					data={posts.filter((item: IPost) =>
						filter === "validated" ? item.validated === true : item
					)}
					endReached={loadMore}
					overscan={10}
					itemContent={(_, post) => {
						return <Post key={post.id} info={post} />;
					}}
					rangeChanged={({ startIndex }) => {
						setVisibleRange(startIndex);
					}}
					useWindowScroll
					components={{
						Footer: () => {
							return nextPage ? (
								<article className="scroll-footer">🚀 Getting more...</article>
							) : (
								<article className="scroll-footer">
									<p>🤷‍♂️ I guess we don't have more data!</p>
									<button
										type="button"
										className="button--clean"
										onClick={() => {
											if (virtuoso.current) {
												virtuoso.current.scrollToIndex({
													index: 0,
													behavior: "smooth",
												});
											}
										}}
									>
										Back to top
									</button>
								</article>
							);
						},
					}}
				/>
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
