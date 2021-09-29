import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { Post } from "../Post";
import { IPost, Tfilter } from "../../types";

interface Props {
	virtuosoRef: React.MutableRefObject<VirtuosoHandle | null>;
	posts: IPost[];
	filter: Tfilter;
	nextPage: number | null;
	onLoadMore: () => Promise<void>;
	setVisibleRange: (value: React.SetStateAction<number>) => void;
}

export const PostList: React.FC<Props> = ({
	virtuosoRef,
	posts,
	filter,
	nextPage,
	onLoadMore,
	setVisibleRange,
}) => {
	return (
		<>
			<Virtuoso
				ref={virtuosoRef}
				data={posts.filter((item: IPost) =>
					filter === "validated" ? item.validated === true : item
				)}
				endReached={onLoadMore}
				overscan={5}
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
										if (virtuosoRef.current) {
											virtuosoRef.current.scrollToIndex({
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
		</>
	);
};
