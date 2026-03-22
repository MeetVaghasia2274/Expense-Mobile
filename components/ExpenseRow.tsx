import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Expense } from '../types/expense';
import { CATEGORIES } from '../types/expense';
import { COLORS } from '../constants/theme';

interface ExpenseRowProps {
  expense: Expense;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m} ${ampm}`;
}

export default function ExpenseRow({ expense }: ExpenseRowProps) {
  const catMeta = CATEGORIES.find((c) => c.key === expense.category);
  const payLabel = expense.paymentMethod.toUpperCase();

  return (
    <View style={styles.row}>
      <View style={styles.iconWrap}>
        <Text style={styles.emoji}>{catMeta?.emoji ?? '⋯'}</Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.category}>{catMeta?.label ?? 'Other'}</Text>
        {expense.note ? (
          <Text style={styles.note} numberOfLines={1}>
            {expense.note}
          </Text>
        ) : (
          <Text style={styles.time}>{formatTime(expense.createdAt)}</Text>
        )}
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>₹{expense.amount.toFixed(0)}</Text>
        <View style={styles.payChip}>
          <Text style={styles.payLabel}>{payLabel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginBottom: 8,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 22,
  },
  center: {
    flex: 1,
  },
  category: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  note: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  time: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    fontVariant: ['tabular-nums'],
    marginBottom: 4,
  },
  payChip: {
    backgroundColor: COLORS.accentDim,
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  payLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.accent,
    letterSpacing: 0.5,
  },
});
