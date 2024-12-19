import { Present } from "./present";
import { User } from "./user";

export interface Reservation {
    nickName: string;
    reservationComment: string;
    _id: string;
    comment: string;
    userId: User;
    presentId: Present;
}

