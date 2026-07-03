# 🔐 ServiceNow – Application & Access Control (Study Notes)

---

## 1. Three Layers of Security

| Layer | What it controls |
|-------|----------------|
| **1. Users, Groups & Roles** | Who can log in and what permissions they have |
| **2. Application & Module Access** | Which apps/modules a user can see and use |
| **3. ACLs & System Properties** | Table and field-level CRUD permissions |

> 📌 System properties **deny access by default** — you must explicitly grant permissions.

---

## 2. Roles Basics

- **Roles** define specific permissions
- Roles are assigned to **users** or **groups**
- Restricting an app/module = assign a role to it → only users with that role can see it
- **Admin role** = full access, can override ACLs and bypass role checks
  - ⚠️ Cannot impersonate a security admin to elevate privileges

---

## 3. Elevated Privileges (Security Admin Role)

- Used for **higher security tasks** like modifying ACLs
- Indicated by a **⬆️ upward arrow next to avatar** (top right)
- **Not all admins** should have the security admin role
- By default, only the **default system administrator** has it
- Must be **explicitly granted** to other admin users
- Use **responsibly and only when necessary**

---

## 4. Access Control Operations (Beyond CRUD)

| Operation | What it restricts |
|-----------|------------------|
| **Create / Read / Write / Delete** | Standard CRUD on records |
| **Execute** | Running scripts on records or UI pages |
| **Save As Template** | Which fields can be saved in templates |
| **Report On** | Generating reports on certain objects |
| **Personalized Choices** | Right-clicking a choice field to configure options |

---

## 5. ACL Types — Table vs Field

| ACL Type | Scope | Analogy |
|---------|-------|---------|
| `table.none` | Entire table, no field-specific rules | Securing the whole house |
| `table.field` | One specific field (e.g. Asset Tag) | Securing one room |
| `table.*` | All fields NOT covered by a `table.field` rule | Securing all remaining rooms |

> 💡 `table.*` (wildcard) reduces the number of ACLs needed — acts as a catch-all.

> ⚠️ Adding a specific `table.field` ACL can **unintentionally remove** wildcard access for some roles. Plan carefully!

---

## 6. ACL Evaluation — Deny vs Allow

### Two-Step Process:
```
Step 1 → Evaluate DENY rules first
          ↓ Any deny condition NOT met? → Access DENIED immediately
          ↓ All deny conditions met? → Move to Step 2

Step 2 → Evaluate ALLOW rules
          ↓ No deny ACLs exist → Check allow rules directly
          ↓ Deny ACLs exist but all satisfied → Check allow rules
```

> 📌 **Deny rules always take priority over allow rules.**

---

## 7. ACL Evaluation Order (Processing Order)

1. **Table-level** ACLs evaluated first (specific → general)
2. **Field-level** ACLs evaluated second (specific → general)

Order of specificity:
```
table.field  →  table.*  →  table.none
(most specific)          (most general)
```

> User must have **table access confirmed** before field-level permissions are even checked.

---

## 8. Auto-Generated ACLs

- When a **new table is created**, ServiceNow **automatically generates** access controls for it
- Rare to find a table with NO ACL rules
- Example: Creating a table also creates an associated **user role** for that table

---

## Quick Reference — ACL Rule Names

| Rule Name | Meaning |
|-----------|---------|
| `incident.none` | Applies to entire incident table |
| `incident.asset_tag` | Applies only to Asset Tag field |
| `incident.*` | Applies to all fields not explicitly defined |

---

> **Key Exam Points:**
> - 3 security layers: Users/Roles → App/Module → ACLs
> - Elevated role = ⬆️ arrow shown next to avatar
> - `table.none` = whole table | `table.field` = specific field | `table.*` = all other fields
> - **Deny rules evaluated FIRST** — if any condition fails, access denied immediately
> - ACLs are **auto-generated** when a new table is created
> - Admin role can't impersonate security admin to self-elevate
