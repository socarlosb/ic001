import { IApiResponse, IApiRequest, Tfilter } from "../types";

export const getPosts = async (page: number, filter: Tfilter) => {
	try {
		const response = await fetch(`/api/posts?page=${page || 0}&filter=${filter || "all"}`);
		const data: IApiResponse = await response.json();
		return data;
	} catch (error) {
		console.info('error', error)
		console.info('----------------')
	}
};

export const addPost = async (data: IApiRequest) => {
	try {
		const request = await fetch("/api/posts", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});
		const newData = await request.json();
		return newData;
	} catch (error) {
		console.info('error', error)
		console.info('----------------')
	}
};
