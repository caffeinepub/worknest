import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    hours: bigint;
    user: Principal;
    totalPaid: bigint;
    bookingTime: Time;
    workspaceId: bigint;
}
export interface Workspace {
    id: bigint;
    owner: Principal;
    name: string;
    hourlyRate: bigint;
    amenities: Array<string>;
    location: string;
    photos: Array<string>;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addWorkspace(name: string, hourlyRate: bigint, location: string, amenities: Array<string>, photos: Array<string>): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookWorkspace(workspaceId: bigint, hours: bigint): Promise<bigint>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyBookings(): Promise<Array<Booking>>;
    getMyListings(): Promise<Array<Workspace>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
