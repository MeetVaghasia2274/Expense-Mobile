import * as SQLite from 'expo-sqlite';
import { Expense, Category, PaymentMethod } from '../types/expense';

const db = SQLite.openDatabaseSync('expenses.db');

export function initDB(): void {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS expenses (
      id            TEXT PRIMARY KEY,
      amount        REAL NOT NULL,
      category      TEXT NOT NULL,
      paymentMethod TEXT NOT NULL,
      note          TEXT,
      createdAt     TEXT NOT NULL,
      synced        INTEGER NOT NULL DEFAULT 0
    );
  `);
}

// Auto-init DB on start
initDB();

export function insertExpense(expense: Expense): void {
  db.runSync(
    `INSERT INTO expenses (id, amount, category, paymentMethod, note, createdAt, synced)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      expense.id,
      expense.amount,
      expense.category,
      expense.paymentMethod,
      expense.note ?? null,
      expense.createdAt,
      expense.synced ? 1 : 0,
    ]
  );
}

export function getExpensesForDate(dateStr: string): Expense[] {
  // dateStr format: 'YYYY-MM-DD'
  const rows = db.getAllSync<{
    id: string;
    amount: number;
    category: string;
    paymentMethod: string;
    note: string | null;
    createdAt: string;
    synced: number;
  }>(
    `SELECT * FROM expenses WHERE createdAt LIKE ? ORDER BY createdAt DESC`,
    [`${dateStr}%`]
  );
  return rows.map(rowToExpense);
}

export function getExpensesForMonth(year: number, month: number): Expense[] {
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  const rows = db.getAllSync<{
    id: string;
    amount: number;
    category: string;
    paymentMethod: string;
    note: string | null;
    createdAt: string;
    synced: number;
  }>(
    `SELECT * FROM expenses WHERE createdAt LIKE ? ORDER BY createdAt DESC`,
    [`${prefix}%`]
  );
  return rows.map(rowToExpense);
}

export function getMonthlyTotals(): { month: string; total: number }[] {
  const rows = db.getAllSync<{ month: string; total: number }>(
    `SELECT strftime('%Y-%m', createdAt) as month, SUM(amount) as total
     FROM expenses
     GROUP BY month
     ORDER BY month DESC
     LIMIT 6`
  );
  return rows;
}

export function getUnsyncedExpenses(): Expense[] {
  const rows = db.getAllSync<{
    id: string;
    amount: number;
    category: string;
    paymentMethod: string;
    note: string | null;
    createdAt: string;
    synced: number;
  }>(`SELECT * FROM expenses WHERE synced = 0`);
  return rows.map(rowToExpense);
}

export function markSynced(ids: string[]): void {
  if (ids.length === 0) return;
  const placeholders = ids.map(() => '?').join(', ');
  db.runSync(`UPDATE expenses SET synced = 1 WHERE id IN (${placeholders})`, ids);
}

function rowToExpense(row: {
  id: string;
  amount: number;
  category: string;
  paymentMethod: string;
  note: string | null;
  createdAt: string;
  synced: number;
}): Expense {
  return {
    id: row.id,
    amount: row.amount,
    category: row.category as Category,
    paymentMethod: row.paymentMethod as PaymentMethod,
    note: row.note ?? undefined,
    createdAt: row.createdAt,
    synced: row.synced === 1,
  };
}
