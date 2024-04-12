import { Listing, Reservation, User } from "@prisma/client";

export type safeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string;
}

export type safeReservation = Omit<
    Reservation,
    "createdAt" | "startdate" | "endDate" | "listing"
> & {
    createdAt: string;
    startdate: string;
    endDate: string;
    listing: safeListing;
}

export type safeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};