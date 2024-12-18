import { Present } from "./present";
import { User } from "./user";

export interface Reservation {
    _id: string;
    comment: string;
    userId: User;
    // userId: string;
    // userNickname: string;
    presentId: Present;
}

