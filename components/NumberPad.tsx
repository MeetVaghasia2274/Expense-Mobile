import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface NumberPadProps {
  onPress: (key: string) => void;
}

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', '⌫'],
];

export default function NumberPad({ onPress }: NumberPadProps) {
  return (
    <View style={styles.container}>
      {KEYS.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={[styles.key, key === '⌫' && styles.backspaceKey]}
              onPress={() => onPress(key)}
              activeOpacity={0.6}
            >
              <Text style={[styles.keyText, key === '⌫' && styles.backspaceText]}>
                {key}
              </Text>
            </TouchableOpacity>
          ))}
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
  key: {
    flex: 1,
    marginHorizontal: 4,
    height: 60,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backspaceKey: {
    backgroundColor: COLORS.surfaceAlt,
  },
  keyText: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.text,
  },
  backspaceText: {
    color: COLORS.accent,
    fontSize: 20,
  },
});
