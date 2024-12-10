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

    accessToken: string;
    userData: {
        nickName: string;
        email: string;
        image: string;
        height: number,
        password: string;
        id: string;
    };

    // nickName: string;
    // email: string;
    // image: string;
    // height: number,
    // password: string;
    // id: string;
}

export interface ProfileDetails {
    nickName: string;
    email: string;
    image: string;
    height: number,
}