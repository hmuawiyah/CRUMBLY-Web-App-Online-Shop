interface RootObject {
    id: string;
    userId: string;
    status: string;
    totalAmount: number;
    midtransOrderId: string;
    address: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
    items: Item[];
    payment: Payment;
}

interface Payment {
    id: string;
    orderId: string;
    transactionStatus: string;
    paymentType: string;
    transactionId: string;
    fraudStatus: string;
    createdAt: string;
}

interface Item {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    product: Product;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export const orders =
    [
        {
            "id": "order-uuid-001",
            "userId": "c7e21a10-55fc-4ce0-9f0b-123456789aaa",
            "status": "PAID",
            "totalAmount": 180,
            "midtransOrderId": "MID-12345-XYZ",
            "address": "1600 Amphitheatre Parkway, Mountain View, CA 94043",
            "notes": "Leave at front door",
            "createdAt": "2025-02-01T10:00:00.000Z",
            "updatedAt": "2025-02-01T10:01:00.000Z",

            "items": [
                {
                    "id": "order-item-001",
                    "orderId": "order-uuid-001",
                    "productId": "prod-uuid-001",
                    "quantity": 2,
                    "unitPrice": 50,
                    "subtotal": 100,

                    "product": {
                        "id": "prod-uuid-001",
                        "name": "Wireless Headphones",
                        "description": "Noise cancelling",
                        "price": 50,
                        "stock": 30,
                        "imageUrl": "https://example.com/headphones.jpg",
                        "createdAt": "2025-01-05T09:00:00.000Z",
                        "updatedAt": "2025-01-18T07:00:00.000Z"
                    }
                },
                {
                    "id": "order-item-002",
                    "orderId": "order-uuid-001",
                    "productId": "prod-uuid-002",
                    "quantity": 1,
                    "unitPrice": 80,
                    "subtotal": 80,

                    "product": {
                        "id": "prod-uuid-002",
                        "name": "Mechanical Keyboard",
                        "description": "RGB, blue switches",
                        "price": 80,
                        "stock": 15,
                        "imageUrl": "https://example.com/keyboard.jpg",
                        "createdAt": "2025-01-06T09:00:00.000Z",
                        "updatedAt": "2025-01-15T07:00:00.000Z"
                    }
                }
            ],

            "payment": {
                "id": "payment-uuid-001",
                "orderId": "order-uuid-001",
                "transactionStatus": "settlement",
                "paymentType": "credit_card",
                "transactionId": "trans-xyz-55",
                "fraudStatus": "accept",
                "createdAt": "2025-02-01T10:00:30.000Z"
            }
        }
    ]