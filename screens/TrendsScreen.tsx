import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/theme';

export default function TrendsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.emoji}>📊</Text>
        <Text style={styles.title}>Trends</Text>
        <Text style={styles.subtitle}>
          Charts and monthly breakdowns coming in Phase 2.{'\n'}
          Log some expenses on the Home tab first!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
