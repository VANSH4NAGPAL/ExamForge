# 🛠️ ServiceNow – Module 7: ServiceNow Utilities (Study Notes)

---

## 1. Client vs Server Architecture

| | Client | Server |
|-|--------|--------|
| **What it is** | Web browser | Data center (app server + database) |
| **Requires install?** | ❌ No | N/A |
| **Handles** | User interactions, UI updates | Backend logic, database operations |
| **Script type** | Client scripts | Server scripts / Business rules |

> ⚡ **Client-to-server round trips** = latency. Minimize them for better performance!

- ServiceNow uses **JavaScript** on both client AND server side

---

## 2. Scripting Tools Overview

| Tool | Runs on | Best for |
|------|---------|---------|
| **Client Scripts** | Browser | Dynamic field updates, alerts, form interactions |
| **Business Rules** | Server | Backend automation, database logic |
| **UI Policies** | Browser | Control field visibility/mandatory/read-only — no scripting needed |
| **Data Policies** | Server | Enforce mandatory/read-only during data import & UI submission |
| **UI Actions** | Client or Server | Custom buttons/links in the UI |
| **Catalog Client Scripts** | Browser | Same as client scripts but for Service Catalog items |

---

## 3. UI Policies

- Quick way to control **field behavior** on forms & lists — **no scripts needed**
- Can make fields: **mandatory, read-only, or hidden** based on conditions
- Applied dynamically based on user input/conditions

---

## 4. Data Policies

- Enforce **mandatory** and **read-only** fields during:
  - UI record submission
  - Data imported via **import sets**
- Can be **opted out** for web services and import sets
- ⚠️ **NOT for security** — purely for **data integrity**
- Once defined, rules enforced on every record submission — **cannot be changed**

### Key Features:
| Feature | Effect |
|---------|--------|
| **Mandatory** | Field must be filled before saving |
| **Read-only** | Blocks edits; prevents updates to critical fields |
| **Import enforcement** | Ensures imported data meets org standards |

---

## 5. UI Actions

- Custom functionalities added to the UI via **scripts**
- Run on **client OR server** side (controlled by the Client checkbox)
- **Order value** controls display sequence:
  - Order > 100 → appears **after** current UI action
  - Order < 100 → appears **before** current UI action
- ✅ **Active checkbox must be selected** for the UI action to be visible to users

---

## 6. Client Scripts

- Run in the **browser**
- Used for: showing/hiding fields, alerts, dynamic field manipulation, database lookups
- Example: If assignment group changes → auto-clear "Assigned to" field
- ⚠️ If DB info needed on **every form load** → consider using **hidden fields** instead (better performance)

### Catalog Client Scripts:
- Same as client scripts but for **Service Catalog items**
- Access via **Related Lists** tab on the catalog item
- Can: make fields visible/mandatory, display alerts, prefill values

---

## 7. Business Rules

- Most **powerful** tool for customizing platform behavior
- Run on the **server** (not real-time like client scripts)
- Loaded & initialized at the **start of every user-platform interaction**
- Applied consistently whether record accessed via **forms, lists, or web services**
- Can be scoped to an **application scope** or **global**

### Example:
> Parent incident modified → business rule auto-updates all **child incidents**

### Display Business Rule (Special type):
- Uses a **shared scratchpad object**
- Sent to the client as part of the form
- Useful for client scripts that need **server-side data** not in the displayed record

---

## 8. Key Differences – Quick Comparison

| | UI Policy | Data Policy | Client Script | Business Rule |
|-|-----------|-------------|---------------|---------------|
| **Runs on** | Client | Server | Client | Server |
| **Real-time?** | ✅ Yes | ❌ No | ✅ Yes | ❌ No |
| **No script needed?** | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| **For security?** | ❌ No | ❌ No | ❌ No | ❌ No |
| **Affects imports?** | ❌ No | ✅ Yes | ❌ No | ✅ Yes |

---

> **Key Exam Points:**
> - Client scripts = browser | Business rules = server
> - UI Policies = **no scripting** needed, real-time field control
> - Data Policies = **NOT for security**, only data integrity
> - Data Policies can be **opted out** for web services/import sets
> - UI Action **Active checkbox** must be selected to be visible
> - UI Action order > 100 = after | < 100 = before
> - Business rules are **not real-time** — monitor on insert/update
> - **Display business rule** uses a scratchpad object to pass server data to client
> - JavaScript used on **both** client and server in ServiceNow
