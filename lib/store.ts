import { create } from 'zustand';
import { Expense, Category, PaymentMethod } from '../types/expense';
import {
  insertExpense,
  getExpensesForDate,
} from './db';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface ExpenseStore {
  // Today's expenses
  todayExpenses: Expense[];
  monthTotal: number;

  // Smart defaults (persist last used)
  lastCategory: Category;
  lastPaymentMethod: PaymentMethod;

  // Actions
  loadToday: () => void;
  addExpense: (data: {
    amount: number;
    category: Category;
    paymentMethod: PaymentMethod;
    note?: string;
  }) => void;
  setLastCategory: (c: Category) => void;
  setLastPaymentMethod: (m: PaymentMethod) => void;
}

export const useExpenseStore = create<ExpenseStore>((set, get) => ({
  todayExpenses: [],
  monthTotal: 0,
  lastCategory: 'food',
  lastPaymentMethod: 'upi',

  loadToday: () => {
    const today = new Date().toISOString().split('T')[0];
    const expenses = getExpensesForDate(today);
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    set({ todayExpenses: expenses, monthTotal: total });
  },

  addExpense: ({ amount, category, paymentMethod, note }) => {
    const expense: Expense = {
      id: uuidv4(),
      amount,
      category,
      paymentMethod,
      note,
      createdAt: new Date().toISOString(),
      synced: false,
    };
    insertExpense(expense);
    set((state) => ({
      todayExpenses: [expense, ...state.todayExpenses],
      monthTotal: state.monthTotal + amount,
      lastCategory: category,
      lastPaymentMethod: paymentMethod,
    }));
  },

  setLastCategory: (c) => set({ lastCategory: c }),
  setLastPaymentMethod: (m) => set({ lastPaymentMethod: m }),
}));
