import { Reservation } from "./reservation";

export interface UserForAuth {
    accessToken?: string;
    nickName: string;
    email: string;
    image: string;
    height: number,
    password?: string;
    reservations?: Reservation[];
    _id?: string;
}

export interface ProfileDetails {
    nickName: string;
    email: string;
    image: string;
    height: number,
}

export interface User {
    reservations: Reservation[];
    nickName: string;
    image: string;
    _id: string;
}