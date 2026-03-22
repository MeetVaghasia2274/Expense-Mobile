import { Expense, Category, PaymentMethod } from '../types/expense';

export function parseVoiceInput(transcript: string): Partial<Expense> {
  const result: Partial<Expense> = {};
  const text = transcript.toLowerCase();

  // Extract amount — first number found
  const amountMatch = text.match(/\d+(\.\d+)?/);
  if (amountMatch) result.amount = parseFloat(amountMatch[0]);

  // Category keywords
  if (/chai|tea|coffee|food|eat|lunch|dinner|breakfast|restaurant|swiggy|zomato/.test(text))
    result.category = 'food';
  else if (/auto|cab|uber|ola|metro|bus|train|transport|rick|rickshaw|rapido/.test(text))
    result.category = 'transport';
  else if (/shop|cloth|buy|purchase|mall|amazon|flipkart|myntra/.test(text))
    result.category = 'shopping';
  else if (/grocery|groceries|sabzi|kirana|vegetable|blinkit|zepto/.test(text))
    result.category = 'groceries';
  else if (/medical|medicine|doctor|pharmacy|health|hospital/.test(text))
    result.category = 'health';

  // Payment method keywords
  if (/cash/.test(text)) result.paymentMethod = 'cash';
  else if (/card|credit|debit/.test(text)) result.paymentMethod = 'card';
  else if (/upi|gpay|phonepe|paytm|neft/.test(text)) result.paymentMethod = 'upi';

  return result;
}
