# 📥 ServiceNow – Import Sets (Study Notes)

---

## 1. Import Sets – Key Components

| Component | Role |
|-----------|------|
| **Data Source** | Where data comes from (Excel, network, database) |
| **Import Set Table** | Staging area — data sits here temporarily before transformation |
| **Transform Map** | Maps staging fields → target table fields |
| **Target Table** | Final destination (e.g. Incidents, Users, CIs) |

> 💡 Think of it as: **Source → Staging → Transform → Target**

---

## 2. Data Sources

- **Local files** (e.g. Excel spreadsheets)
- **Network-based sources**
- **Directory imports**
- **Database connections**

Specify the **path + authentication details** to pull data in.

---

## 3. Before You Import – Key Considerations

| Consideration | What to do |
|--------------|-----------|
| **Data size** | Avoid huge single imports — break into smaller batches |
| **Table naming** | Import set table name is based on the imported file name |
| **Recurring imports** | Schedule imports to automate regular updates |
| **Reusing tables** | Reuse existing import set tables for same-source data — new columns added automatically |

---

## 4. Transform Maps

- Define how **import set fields map → target table fields**
- Can map **one source field → multiple destination fields**
- Can be **reused** for future imports
- Supports **simple mappings AND advanced scripting**

### Setting Up a Transform Map:
1. **Specify target table** (current scope, global, or tables with write access)
2. Name & source table → **auto-set** from import set label
3. Use **Automap Matching Fields** → auto-matches field names (review for accuracy!)
4. Use **Mapping Assist** → visual drag-and-drop to fix/refine mappings
5. Select **Transform** in Related Links → moves data to target table ✅

---

## 5. Coalesce – Preventing Duplicate Records

> ⚠️ Without Coalesce, **every imported row = new record** — even if it already exists!

### How it works:
- Define one or more fields as **Coalesce keys** (e.g. Employee ID, Email)
- During import, system checks if a matching record exists:
  - **Match found** → **Update** existing record
  - **No match** → **Create** new record

### Classic Example:
| Scenario | Without Coalesce | With Coalesce |
|----------|-----------------|---------------|
| 1st import: 200 records | 200 records ✅ | 200 records ✅ |
| 2nd import: 200 old + 300 new | ❌ 700 records (duplicates!) | ✅ 500 records (200 updated + 300 new) |

---

## 6. Quick Process Flow

```
External Data (Excel/DB)
        ↓
   Data Source defined
        ↓
  Import Set Table (Staging)
        ↓
   Transform Map applied
   (Automap / Mapping Assist)
        ↓
  Coalesce check
  (Update existing OR create new)
        ↓
   Target Table (Final destination)
```

---

> **Key Exam Points:**
> - Import Set Table = **staging area** (temporary)
> - Transform Map = **bridge** between staging and target
> - **Automap** = auto-matches fields by name (always review!)
> - **Coalesce** = prevents duplicates by matching on a key field
> - Without Coalesce → every import row treated as **new record**
> - Large imports should be broken into **smaller batches**
> - Transform maps can be **reused** for recurring imports
