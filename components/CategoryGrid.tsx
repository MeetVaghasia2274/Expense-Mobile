import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Category, CategoryMeta, CATEGORIES } from '../types/expense';
import { COLORS } from '../constants/theme';

interface CategoryGridProps {
  selected: Category;
  onSelect: (c: Category) => void;
}

export default function CategoryGrid({ selected, onSelect }: CategoryGridProps) {
  const rows: CategoryMeta[][] = [];
  for (let i = 0; i < CATEGORIES.length; i += 3) {
    rows.push(CATEGORIES.slice(i, i + 3));
  }

  return (
    <View style={styles.container}>
      {rows.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map((cat) => {
            const isSelected = selected === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[styles.cell, isSelected && styles.cellSelected]}
                onPress={() => onSelect(cat.key)}
                activeOpacity={0.7}
              >
                <Text style={styles.emoji}>{cat.emoji}</Text>
                <Text style={[styles.label, isSelected && styles.labelSelected]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  cellSelected: {
    backgroundColor: COLORS.accentDim,
    borderColor: COLORS.accent,
  },
  emoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
    textAlign: 'center',
  },
  labelSelected: {
    color: COLORS.accent,
    fontWeight: '700',
  },
});
