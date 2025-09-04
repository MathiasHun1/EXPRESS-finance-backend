# Step 1 - Define Resources

- Transactions ✅
- Budgets ✅
- Pots ✅

* Budgets will be derived from Transactions ✅

# Step 2 - Define API endpoints

Transactions

- GET /transactions ✅
- GET /transactions/:id
- POST /transactions ✅
- PUT /transactions/:id
- DELETE /transactions/:id

Budgets

- GET /budgets ✅
- GET /budgets/:id ✅
- POST /budgets ✅
- PUT /budgets/:id ✅
- DELETE /budgets/:id ✅

Pots

- GET /pots ✅
- GET /pots/:id ✅
- POST /pots ✅
- PUT /pots/:id ✅
- DELETE /pots/:id ✅

Balance

- GET /balance --> backend calculates on the fly from transactions and pots ✅
  `code`
  {
  "current": 3000,
  "income":5000,
  "expenses":2000
  }
  `code`

# Step 3 - Possible Enhancements

- Filtering & aggregation:
  /transactions?from=2024-08-01&to=2024-08-31
- /budgets/summary → show used vs. max per category
- /pots/summary → show progress toward goals
- Recurring transactions: automatically generate upcoming items

### Actual tasks

- Check if a transaction / pot can be made (sufficient funds)
- Type requests and responses
- Add error handling
- Add logging
- Add integration tests
