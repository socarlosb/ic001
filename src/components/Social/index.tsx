import "./social.css";
import { ReactComponent as Thumbs } from "./thumbs.svg";
import { ReactComponent as Share } from "./share.svg";
import { ReactComponent as Dots } from "./dots.svg";

export const Social: React.FC = () => {
  return (
    <>
      <div className="post__social">
        <span>
          <Thumbs />
        </span>
        <span>
          <Share />
        </span>
        <span>
          <Dots />
        </span>
      </div>
      <div className="line"></div>
    </>
  );
};
