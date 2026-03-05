//import { AirlineModel } from "./airline.model"

export interface OrderModel {
    id: number;
    movieId: number;
    movieTitle: string;
    movieRating: number | null| undefined;
    reservationDate: Date | null;
    reservationTime: string;
    ticketVolume: number;
    ticketPrice: number;
    totalPrice: number;
    status: 'ordered' | 'paid' | 'canceled';
    shortUrl: string;
}