export type Car = {
    id: number;
    name: string;
    brand: string;
    image_url: string;
    price: number;
    description: string;
    is_available: boolean;
}

export type User = {
    id: string;
    username: string;
    is_admin: boolean;
}