import { food_list } from "@/assets/main";

type UserType = {
    _id?: string;
    name: string;
    email: string;
    profile: File
}

export type FoodItem = {
    _id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    quantity?: number;
}


export interface StoreContextValue {

    foodList: FoodItem[];

    cartItems: { [key: string]: number };

    addToCart: (itemId: string) => void;

    removeFromCart: (itemId: string) => void;

    showLinks: boolean;

    setShowLinks: (show: boolean) => void;

    getTotalCartAmount: () => number;

    token: string | null;

    setToken: (token: string | null) => void;

    userData: any;

    setUserData: (data: any) => void;

}


export type Props = {
    children: ReactNode;
};