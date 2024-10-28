// Revised Types
export type Orders = {
    _id: string;
    userId: string;
    items: FoodItem[];
    amount: number;
    address: string;
    status: string;
    date: Date;
    payment: boolean;
};

export type FoodItem = {
    _id: string; // Changed to string if that's the actual type from your database
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    quantity?: number;
};

// This type represents an array of orders
export type MyOrdersType = Orders[];
