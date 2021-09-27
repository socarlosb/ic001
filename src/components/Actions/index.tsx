import "./styles.css";
import { Tfilter } from "../../types";

interface Props {
	filter: Tfilter;
	setFilter: (value: React.SetStateAction<Tfilter>) => void;
	showNewPost: boolean;
	setShowNewPost: (value: React.SetStateAction<boolean>) => void;
}

export const Actions: React.FC<Props> = ({
	filter,
	setFilter,
	showNewPost,
	setShowNewPost,
}) => {
	return (
		<section className="actions">
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
				className={`button ${filter == "validated" ? "button--active" : ""}`}
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
	);
};
