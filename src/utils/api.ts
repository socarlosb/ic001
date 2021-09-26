import { IApiResponse, IApiRequest } from "../types";

export const getPosts = async () => {
    const response = await fetch("/api/posts");
    const data: IApiResponse = await response.json();
    return data;
};

export const addPost = async (data: IApiRequest) => {
    console.log("post", JSON.stringify(data));
    const request = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const newData = await request.json();
    return newData;
};
