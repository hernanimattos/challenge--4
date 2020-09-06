import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO

    const outcome = this.transactions.reduce((acc, val) => {
      return val.type === 'income' ? acc : acc + val.value;
    }, 0);
    const income = this.transactions.reduce((acc, val) => {
      return val.type === 'outcome' ? acc : acc + val.value;
    }, 0);

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const trans = new Transaction({ title, value, type });
    this.transactions.push(trans);
    return trans;
    // TODO
  }
}

export default TransactionsRepository;
