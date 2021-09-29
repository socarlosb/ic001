import "./styles.css";
import { Tfilter } from "../../types";

interface Props {
	setFilter: (value: React.SetStateAction<Tfilter>) => void;
}

export const Actions: React.FC<Props> = ({ setFilter }) => {
	const handleFilterSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// FIX: can we resolve this?
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

	return (
		<section className="actions">
			<label htmlFor="selectedFilter">Show:</label>
			<select
				onChange={handleFilterSelection}
				className="dropdown"
				title="Filter type"
				id="selectedFilter"
				defaultValue="all"
			>
				<option value="all">All</option>
				<option value="validated">Validated</option>
			</select>
		</section>
	);
};
