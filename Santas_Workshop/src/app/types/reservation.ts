import { Present } from "./present";
import { User } from "./user";

export interface Reservation {
reservationComment: any;
    _id: string;
    comment: string;
    userId: User;
    presentId: Present;
}

