
type Item = {
    id: string
    name: string
    price: number,
    quantity: number
}

export type Order = {
    id: string
    userId: string
    items: Item[]
    amount: number
    address: string
}

export type VerifyOrder = {
    orderId: string,
    success: boolean
}