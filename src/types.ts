export interface IApiResponse {
	page: number;
	per_page: number;
	prev_page: number | null;
	next_page: number | null;
	total: number;
	total_pages: number;
	posts: IPost[];
}

export interface IPost {
	id: string;
	userName: string;
	userProfileImgUrl: string;
	comment: string;
	validated: boolean;
	postedOn: string;
}

export interface IApiRequest {
	userName: string;
	userProfileImgUrl: string;
	comment: string;
	validated: boolean;
}

export interface IPages {
	current: number,
	total: number
}

export type Tfilter = "validated" | "all";