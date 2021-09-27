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
		<section className={`new-post ${!showNewPost ? "new-post--close" : ""}`}>
			<header className="new-post__header">
				<h5>&#10554; Invest in local food and susainability</h5>
				<button
					type="button"
					className="button--close"
					onClick={() => setShowNewPost(!showNewPost)}
				>
					&#x25bc;
				</button>
			</header>
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
				<button type="button" className="button" onClick={sendNewPost}>
					Send
				</button>
			</div>
		</section>
	);
};
