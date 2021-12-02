
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Customer {
    orders: Order[];
}

export interface Location {
    orders: Order[];
}

export interface Order {
    location: Location;
    customer: Customer;
    locationId: string;
    customerId: string;
}

export interface IQuery {
}

type Nullable<T> = T | null;
