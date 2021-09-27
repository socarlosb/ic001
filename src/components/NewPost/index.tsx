import "./styles.css";
import { IApiRequest } from "../../types";

interface Props {
	showNewPost: boolean;
	setShowNewPost: (value: React.SetStateAction<boolean>) => void;
	createNewPost: IApiRequest;
	setCreateNewPost: (value: React.SetStateAction<IApiRequest>) => void;
	sendNewPost: () => Promise<void>;
}

export const NewPost: React.FC<Props> = ({
	showNewPost,
	setShowNewPost,
	createNewPost,
	setCreateNewPost,
	sendNewPost,
}) => {
	return (
		<section className={`new-post ${!showNewPost ? "new-post--closed" : ""}`}>
			{!showNewPost ? (
				<header
					className="new-post__header"
					onClick={() => setShowNewPost(!showNewPost)}
				>
					<button type="button" className="button--light">
						Reply
					</button>
					<button type="button" className="button--light">
						&#9650;
					</button>
				</header>
			) : (
				<header
					className="new-post__header"
					onClick={() => setShowNewPost(!showNewPost)}
				>
					<h5>The most amazing post title!</h5>
					<button type="button" className="button--light">
						&#x25bc;
					</button>
				</header>
			)}
			<form
				onSubmit={(e: React.SyntheticEvent) => {
					e.preventDefault();
					sendNewPost();
				}}
			>
				<textarea
					autoFocus
					spellCheck
					placeholder="Write a message here..."
					name="new-post"
					rows={6}
					onChange={(e) =>
						setCreateNewPost({ ...createNewPost, comment: e?.target?.value })
					}
					value={createNewPost?.comment}
				></textarea>
				<div className="actions">
					<button type="submit" className="button">
						Send
					</button>
				</div>
			</form>
		</section>
	);
};
