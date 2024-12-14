// import { Post } from "./post";

// export interface User {
//     themes: string[];
//     posts: Post[];
//     _id: string;
//     tel: string;
//     email: string;
//     username: string;
//     password: string;
//     created_at: string;
//     updatedAt: string;
//     __v: number;
// }

export interface UserForAuth {
    accessToken?: string;
    nickName: string;
    email: string;
    image: string;
    height: number,
    password?: string;
    _id?: string;
}

export interface ProfileDetails {
    nickName: string;
    email: string;
    image: string;
    height: number,
}