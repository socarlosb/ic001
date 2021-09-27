import "./styles.css";
import { IPages, Tfilter } from "../../types";

interface Props {
	// filter: Tfilter;
	setFilter: (value: React.SetStateAction<Tfilter>) => void;
	page: IPages;
	setPage: (value: React.SetStateAction<IPages>) => void;
}

export const Actions: React.FC<Props> = ({
	// filter,
	setFilter,
	page,
	setPage,
}) => {
	const handleFilterSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
		switch (e.target.value) {
			case "all":
				setFilter("all");
				break;
			case "validated":
				setFilter("validated");
				break;
			default:
				setFilter("all");
				break;
		}
	};
	const handlePageSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPage({ ...page, current: Number(e.target.value) });
	};
	return (
		<section className="actions">
			<label htmlFor="selectedFilter">Show:</label>
			<select
				onChange={handleFilterSelection}
				className="dropdown"
				title="Filter type"
				id="selectedFilter"
			>
				<option selected value="all">
					All
				</option>
				<option value="validated">Validated</option>
			</select>
			<label htmlFor="selectedPage">Page:</label>
			<select
				onChange={handlePageSelection}
				defaultValue={page.current}
				className="dropdown"
				title="Page number"
				id="selectedPage"
			>
				{[...Array(page.total)].map((_, idx: number) => {
					return (
						<option key={idx} value={idx + 1}>
							{idx + 1}
						</option>
					);
				})}
			</select>

			{/* <button
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
			<label htmlFor="page number">Page:</label>
			<select className="button" title="Page Number" name="page number">
				<option>1</option>
				<option>2</option>
				<option>3</option>
			</select> */}
		</section>
	);
};
