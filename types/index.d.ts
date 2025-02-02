declare global {
  type ReceiptData = {
    store?: {
      name?: string;
      address?: string;
      phone?: string;
    };
    transaction?: {
      date?: string; // e.g., "2024-02-01"
      time?: string; // e.g., "14:30"
      paymentMethod?: string; // e.g., "Visa, Cash, Apple Pay"
    };
    items?: {
      name: string;
      price: number;
      quantity: number;
      category?: string; // e.g., "Food", "Beverage"
      discount?: number; // Discount applied on item
    }[];
    subtotal?: number;
    tax?: number;
    serviceCharge?: number;
    tip?: number;
    total?: number;
    currency?: string; // e.g., "USD", "EUR"
    error?: string; // Handle any errors in extraction
  };
}
export {};
