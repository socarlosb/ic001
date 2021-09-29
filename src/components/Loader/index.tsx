import "./styles.css";

export const Loader: React.FC = () => {
	const x = new Array(20);
	return (
		<>
			<section className="post-container">
				{[...Array(15)].map((_, index) => {
					return (
						<article key={index} className="post-container">
							<div className="post">
								<img alt="" className="user--image skeleton skeleton-image" />
								<div className="post--content">
									<div className="post--header">
										<p className="user--name skeleton skeleton-text skeleton-name"></p>
										<p className="post--date skeleton skeleton-text skeleton-date"></p>
									</div>
									<p className="user--comment skeleton skeleton-text"></p>
									<p className="user--comment skeleton skeleton-text"></p>
									<p className="user--comment skeleton skeleton-text"></p>
								</div>
							</div>
							<div className="skeleton--social"></div>
							<div className="line"></div>
						</article>
					);
				})}
			</section>
		</>
	);
};
