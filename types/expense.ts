export type Category =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'groceries'
  | 'health'
  | 'other';

export type PaymentMethod = 'cash' | 'upi' | 'card';

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  paymentMethod: PaymentMethod;
  note?: string;
  createdAt: string; // ISO 8601
  synced: boolean;
}

export interface CategoryMeta {
  key: Category;
  label: string;
  emoji: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { key: 'food',      label: 'Food & Chai', emoji: '🍵' },
  { key: 'transport', label: 'Transport',   emoji: '🚗' },
  { key: 'shopping',  label: 'Shopping',    emoji: '🛍️' },
  { key: 'groceries', label: 'Groceries',   emoji: '🛒' },
  { key: 'health',    label: 'Health',      emoji: '💊' },
  { key: 'other',     label: 'Other',       emoji: '⋯'  },
];

export const PAYMENT_METHODS: { key: PaymentMethod; label: string }[] = [
  { key: 'cash', label: 'Cash' },
  { key: 'upi',  label: 'UPI'  },
  { key: 'card', label: 'Card' },
];
