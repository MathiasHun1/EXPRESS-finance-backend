import fs from 'fs';
import type { BudgetModel, PotModel, TransactionModel } from './models/index.js';

interface Database {
  budgets: BudgetModel[];
  pots: PotModel[];
  transactions: TransactionModel[];
}

export const db = {
  data: JSON.parse(fs.readFileSync('data/data.json', 'utf-8')) as Database,

  // ---- POTS ----
  savePot(pot: PotModel) {
    this.data.pots.push(pot);
  },

  findPotById(id: string) {
    return this.data.pots.find((p) => p.id === id);
  },

  updatePot(updatedPot: PotModel) {
    const potIndex = this.data.pots.findIndex((p) => p.id === updatedPot.id);
    this.data.pots[potIndex] = updatedPot;
  },

  deletePot(id: string) {
    const potIndex = db.data.pots.findIndex((p: any) => p.id === id);
    if (potIndex === -1) {
      return false;
    }
    this.data.pots.splice(potIndex, 1);

    return true;
  },

  // ---- BUDGETS ----
  saveBudget(budget: BudgetModel) {
    this.data.budgets.push(budget);
  },

  findBudgetById(id: string) {
    return this.data.budgets.find((b) => b.id === id);
  },

  deleteBudget(id: string) {
    const budgetIndex = db.data.budgets.findIndex((b) => b.id === id);
    if (budgetIndex === -1) {
      return false;
    }
    this.data.budgets.splice(budgetIndex, 1);

    return true;
  },

  updateBudget(updatedBudget: BudgetModel) {
    const budgetIndex = this.data.budgets.findIndex((b) => b.id === updatedBudget.id);

    if (budgetIndex === -1) {
      return false;
    }
    this.data.budgets[budgetIndex] = updatedBudget;

    return true;
  },
};
