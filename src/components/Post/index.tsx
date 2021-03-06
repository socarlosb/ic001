import "./styles.css";
import { Social } from "../Social";
import { parseDate } from "../../utils/helper";
import { IPost } from "../../types";

interface Props {
	info: IPost;
}

export const Post: React.FC<Props> = ({ info }) => {
	return (
		<article
			className={`post-container${!info.validated ? " post__invalid" : ""}`}
		>
			<div className="post">
				<img src={info.userProfileImgUrl} alt="" className="user--image" />
				<div className="post--content">
					<div className="post--header">
						<p className="user--name">
							{info.userName} ({info.id})
						</p>
						<p className="post--date">{parseDate(info.postedOn)}</p>
					</div>
					<p className="user--comment">{info.comment}</p>
				</div>
			</div>
			<Social />
			<div className="line"></div>
		</article>
	);
};
