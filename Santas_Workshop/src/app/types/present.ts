import { Reservation } from "./reservation";

export interface Present {
    reservations: Reservation[];
    itemName: string;
    itemDescription: string;
    itemImage: string;
    itemCategory: string;
    itemStatus: string,
    owner: string,
    _id: string;
}

export interface UpdatePresent {
    itemName: string;
    itemDescription: string;
    itemImage: string;
    itemCategory: string;
    itemStatus: string,
}