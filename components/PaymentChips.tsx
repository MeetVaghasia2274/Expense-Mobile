import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { PaymentMethod, PAYMENT_METHODS } from '../types/expense';
import { COLORS } from '../constants/theme';

interface PaymentChipsProps {
  selected: PaymentMethod;
  onSelect: (m: PaymentMethod) => void;
}

export default function PaymentChips({ selected, onSelect }: PaymentChipsProps) {
  return (
    <View style={styles.container}>
      {PAYMENT_METHODS.map((method) => {
        const isSelected = selected === method.key;
        return (
          <TouchableOpacity
            key={method.key}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(method.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {method.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    gap: 8,
  },
  chip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: COLORS.accentDim,
    borderColor: COLORS.accent,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  labelSelected: {
    color: COLORS.accent,
  },
});
