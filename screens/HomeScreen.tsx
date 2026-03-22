import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useExpenseStore } from '../lib/store';
import ExpenseRow from '../components/ExpenseRow';
import LogSheet, { LogSheetRef } from '../components/LogSheet';
import { COLORS } from '../constants/theme';

function getMonthName(): string {
  return new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' });
}

export default function HomeScreen() {
  const logSheetRef = useRef<LogSheetRef>(null);
  const { todayExpenses, monthTotal, loadToday } = useExpenseStore();

  useEffect(() => {
    loadToday();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.monthName}>{getMonthName()}</Text>
        <Text style={styles.totalLabel}>Spent so far</Text>
        <Text style={styles.totalAmount}>₹{monthTotal.toLocaleString('en-IN')}</Text>
      </View>

      {/* Today's list */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Today</Text>
        {todayExpenses.length === 0 && (
          <Text style={styles.emptyHint}>No expenses yet — tap + to log one</Text>
        )}
      </View>

      <FlatList
        data={todayExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseRow expense={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => logSheetRef.current?.open()}
        activeOpacity={0.8}
        accessibilityLabel="Add expense"
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>

      {/* Log Sheet */}
      <LogSheet ref={logSheetRef} onSaved={loadToday} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
    alignItems: 'flex-start',
  },
  monthName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 42,
    fontWeight: '800',
    color: COLORS.text,
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  listHeader: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  emptyHint: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 120, // clearance for FAB
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },
  fabIcon: {
    fontSize: 30,
    color: COLORS.bg,
    fontWeight: '300',
    lineHeight: 34,
  },
});
