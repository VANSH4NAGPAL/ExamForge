# 🗄️ ServiceNow – Module 4: Table Administration (Study Notes)

---

## 1. Database Core Concepts

| Term | Definition |
|------|-----------|
| **Table** | Fundamental data structure; contains records |
| **Record** | Individual data entry within a table |
| **Field** | Specific piece of info within a record (text, number, date, etc.) |
| **Value** | Actual data stored in a field |
| **sys_id** | 32-character globally unique identifier for every record |

> 💡 Every record in ServiceNow is uniquely identified by its **sys_id** — no two records share one.

---

## 2. Admin Tools for Managing Tables

| Tool | Purpose |
|------|---------|
| **System Dictionary** | Defines every table and field in the system |
| **Tables module** | Lists all tables in the database |
| **Tables & Columns module** | Detailed view of tables, columns, attributes & indexes |
| **Schema Map** | Visual/graphical view of table relationships |
| **Number Maintenance App** | Customize record number prefixes (e.g. `PRB` → `PRBLM`) |

---

## 3. Field Types

| Field Type | Use |
|-----------|-----|
| **Choice** | Select from predefined list of values |
| **Date/Time** | Date and time entries only |
| **Journal** | Free-form text/notes |
| **Reference** | Links to a record in another specific table |
| **Document ID** | Links to a record from **any** table (most flexible) |
| **Glide List** | Select **multiple** records from a specific table |

> ⚠️ Reference fields can only point to **one specific table**.  
> Use **Document ID** if the source table may vary.

---

## 4. Table Relationships

### 🔹 One-to-Many
Three field types handle this:

| Field | Description | Example |
|-------|-------------|---------|
| **Reference field** | Select ONE record from a specific table | Caller field → User table |
| **Glide List** | Select MULTIPLE records from a specific table | Watchlist → User table |
| **Document ID** | Select ONE record from ANY table | Translated text table |

### 🔹 Many-to-Many
- Two tables related **bidirectionally**
- Related records visible from **both sides**
- Example: Students ↔ Classes (a student can have many classes; a class can have many students)
- Managed via **Related Lists**

### 🔹 Database Views
- Used for **reporting** — joins multiple tables
- Doesn't alter underlying data
- Example: Incident + Metric Definition + Metric Instance tables

### 🔹 Extensions (Parent-Child)
- Child table **inherits** all fields, rules, policies from parent
- Child can also add its **own unique fields**
- Example: `Task` (parent) → `Incident`, `Problem`, `Change Request` (children)

---

## 5. Table Roles

| Role | Meaning | Example |
|------|---------|---------|
| **Core Table** | Pre-installed with ServiceNow | Task, Incident, User |
| **Base Table** | Doesn't extend any other table (root of hierarchy) | Task table |
| **Parent Table** | Has child tables extending from it | Task → Incident, Problem |
| **Child Table** | Extends a parent and inherits its fields | Incident, Problem, Change |

> 📌 The **Task table** is simultaneously a **Core + Base + Parent** table — it's a cornerstone of ServiceNow's data model.

---

## 6. Core vs. Custom Tables

| | Core Tables | Custom Tables |
|-|------------|---------------|
| **Origin** | Pre-installed | Admin-created |
| **Examples** | Task, Incident, User | Team Celebrations, Holiday Party |
| **Name prefix** | None | `u_` (global) or `ex_` (scoped) |
| **API access** | Full | Scoped = restricted; Global = full (higher risk) |
| **Can interact?** | ✅ Yes | ✅ Yes — via reference fields |

---

## 7. Schema Map – Reading It

| Colour | Meaning |
|--------|---------|
| 🟡 **Yellow** | The focused/selected table |
| 🔵 **Blue bar** | Tables that **extend** the focused table (children) |
| 🔴 **Red bar** | Tables that are **referenced by** the focused table |

> Example: Task table (yellow) → Problem & Change have blue bars (they extend Task) → Location & User have red bars (Task references them)

---

## 8. Table Inheritance – What Gets Inherited?

When a child extends a parent table, it inherits:
- ✅ All fields
- ✅ Mandatory field rules
- ✅ Business Rules
- ✅ Access Controls (ACLs)
- ✅ UI Policies
- ✅ Client Scripts

---

> **Key Exam Points:**
> - **sys_id** = 32-char unique ID for every record
> - **Reference field** = one table only | **Document ID** = any table
> - **Glide List** = multiple records from one table
> - Task table = Core + Base + Parent (all three roles)
> - Blue bars on Schema Map = child/extended tables; Red = referenced tables
> - Custom global tables prefix: `u_` | Scoped: `ex_`
