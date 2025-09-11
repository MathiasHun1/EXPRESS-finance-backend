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

- user management: multi-user support ‼️
- Authentication & Authorization: secure endpoints ‼️
- Filtering & aggregation:
  /transactions?from=2024-08-01&to=2024-08-31
- /budgets/summary → show used vs. max per category
- /pots/summary → show progress toward goals
- Recurring transactions: automatically generate upcoming items

### Actual tasks

- Check if a pot addition can be made (insufficient funds) ✅
- Type requests and responses ✅
- Add error handling ✅
- Add validation ✅
- Add logging ✅
- Integration tests for budgets route ✅
- Integration tests for transactions route ✅
- Integration tests for pots route ✅
- Integration tests for balance route
- implement token based authentication for all routes: budgts, pots, transactions ✅
- implement auth guard middleware to protect routes ✅
- Work on banalce route, its not done yet ‼️

‼️ Tesztekben ellenőrizni az error üzeneteteket is ??

# Helyzet:

A fő route-ok kész vannak, token auth is megvan rajtuk, védettek.
Be kell fejezni a budgets route-ot, kijavítani a teszteket a transactions és a budgets route-hoz. Regisztrációt implementálni.
Eldönteni hogy aggregált adatot használjunk a frontenden, vagy külön-külön fetcheljük a pots, budgets és transactions adatokat.
