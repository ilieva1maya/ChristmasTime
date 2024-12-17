import { Reservation } from "./reservation";

export interface User {
    // presents: string[];
    reservations: Reservation[];
    _id: string;
    nickName: string;
    image: string;
}

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