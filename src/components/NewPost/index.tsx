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
			<div className="options">
				<button
					type="button"
					className="button button--cta"
					onClick={sendNewPost}
				>
					Send
				</button>
				<button
					type="button"
					className="button"
					onClick={() => setShowNewPost(!showNewPost)}
				>
					Cancel
				</button>
			</div>
		</section>
	);
};
