import React, { useCallback, useState, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import NumberPad from './NumberPad';
import CategoryGrid from './CategoryGrid';
import PaymentChips from './PaymentChips';
import { Category, PaymentMethod } from '../types/expense';
import { useExpenseStore } from '../lib/store';
import { COLORS } from '../constants/theme';

export interface LogSheetRef {
  open: () => void;
  close: () => void;
}

interface LogSheetProps {
  onSaved?: () => void;
}

const LogSheet = forwardRef<LogSheetRef, LogSheetProps>(({ onSaved }, ref) => {
  const [visible, setVisible] = useState(false);

  const { lastCategory, lastPaymentMethod, addExpense } = useExpenseStore();

  const [rawAmount, setRawAmount] = useState('');
  const [category, setCategory] = useState<Category>(lastCategory);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(lastPaymentMethod);

  useImperativeHandle(ref, () => ({
    open: () => {
      setRawAmount('');
      setCategory(lastCategory);
      setPaymentMethod(lastPaymentMethod);
      setVisible(true);
    },
    close: () => {
      setVisible(false);
    },
  }));

  const handleKeyPress = useCallback((key: string) => {
    if (key === '⌫') {
      setRawAmount((prev) => prev.slice(0, -1));
      return;
    }
    if (key === '.' && rawAmount.includes('.')) return;
    if (rawAmount.length >= 7) return;
    setRawAmount((prev) => prev + key);
  }, [rawAmount]);

  const displayAmount = rawAmount === '' ? '0' : rawAmount;

  const handleSave = useCallback(() => {
    const amount = parseFloat(rawAmount);
    if (!amount || amount <= 0) return;

    addExpense({ amount, category, paymentMethod });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => null);
    setVisible(false);
    onSaved?.();
  }, [rawAmount, category, paymentMethod, addExpense, onSaved]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={() => setVisible(false)} activeOpacity={1} />
        <SafeAreaView style={styles.sheetBg}>
          <View style={styles.content}>
            <View style={styles.handleWrap}>
              <View style={styles.handle} />
            </View>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Log Expense</Text>
            </View>

            {/* Amount display */}
            <View style={styles.amountRow}>
              <Text style={styles.currency}>₹</Text>
              <Text style={styles.amountText}>{displayAmount}</Text>
            </View>

            <View style={styles.divider} />

            {/* Category */}
            <Text style={styles.sectionLabel}>Category</Text>
            <CategoryGrid selected={category} onSelect={setCategory} />

            <View style={styles.spacer} />

            {/* Payment method */}
            <Text style={styles.sectionLabel}>Pay with</Text>
            <PaymentChips selected={paymentMethod} onSelect={setPaymentMethod} />

            <View style={styles.spacer} />

            {/* Number pad */}
            <NumberPad onPress={handleKeyPress} />

            <View style={styles.spacer} />

            {/* Save button */}
            <TouchableOpacity
              style={[styles.saveBtn, !rawAmount && styles.saveBtnDisabled]}
              onPress={handleSave}
              activeOpacity={0.8}
              disabled={!rawAmount}
            >
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
});

LogSheet.displayName = 'LogSheet';
export default LogSheet;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheetBg: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: '85%',
  },
  handleWrap: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    backgroundColor: COLORS.textMuted,
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  currency: {
    fontSize: 36,
    fontWeight: '300',
    color: COLORS.textMuted,
    marginBottom: 4,
    marginRight: 4,
  },
  amountText: {
    fontSize: 56,
    fontWeight: '700',
    color: COLORS.text,
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.surfaceAlt,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  spacer: {
    height: 16,
  },
  saveBtn: {
    marginHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: COLORS.surfaceAlt,
  },
  saveBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.bg,
    letterSpacing: 0.3,
  },
});
