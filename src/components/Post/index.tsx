import "./post.css";
import { IPost } from "../../types";
import { parseDate } from "../../utils/helper";
import { Social } from "../Social";

interface Props {
	info: IPost;
}

export const Post: React.FC<Props> = ({ info }) => {
	return (
		<article className={!info.validated ? "post__invalid" : ""}>
			<div className="post">
				<img src={info.userProfileImgUrl} alt="" className="user--image" />
				<div className="post--content">
					<div className="post--header">
						<p className="user--name">{info.userName}</p>
						<p className="post--date">{parseDate(info.postedOn)}</p>
					</div>
					<p className="user--comment">{info.comment.substr(0, 200) + "..."}</p>
				</div>
			</div>
			<Social />
			<div className="line"></div>
		</article>
	);
};
