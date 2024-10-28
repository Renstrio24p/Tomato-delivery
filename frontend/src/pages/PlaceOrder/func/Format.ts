import { StoreContextValue } from "@/context/types/Context";

export const formatted = (context: StoreContextValue) => {
    const { getTotalCartAmount, token, foodList, cartItems } = context!;

    let initialSubtotal = getTotalCartAmount();
    let initialDeliveryFee = initialSubtotal * 0.35;
    let initialTotal = initialSubtotal + initialDeliveryFee;
    const formatNumber = (num: number) => {
        return num.toLocaleString("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
        });
    };

    const subtotal = formatNumber(initialSubtotal);
    const deliveryFee = formatNumber(initialDeliveryFee);
    const total = formatNumber(initialTotal);

    return {
        subtotal,
        deliveryFee,
        total,
        token,
        foodList,
        cartItems,
        initialTotal
    };
};
