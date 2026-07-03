# 🛒 ServiceNow – Service Catalog (Study Notes)

---

## 1. What is the Service Catalog?

- A curated list of **IT products & services** (and more) users can request
- Items have rich details: descriptions, photos, pricing
- Items organized into **categories** (with parent-child relationships)
  - Example: IT (parent) → Laptops (child)
- Supports **multiple catalogs** for different teams/departments
- Catalog items can be **shared across multiple catalogs**
- Managed by users with **admin** or **catalog admin** roles

> 💡 Catalog items = things ordered **individually** (e.g. a laptop, NOT a laptop's CPU)

---

## 2. Core Catalog Components

| Component | Purpose |
|-----------|---------|
| **Catalog Item** | Orderable product/service (generates a requested item record) |
| **Record Producer** | Creates **task-based records** (e.g. Incidents) from the catalog |
| **Order Guide** | Groups multiple related items into a **single request** |
| **Variable** | Questions/options on a catalog item form (e.g. screen size, OS) |
| **Variable Set** | Reusable group of variables applied to multiple catalog items |
| **Flow** | Automates fulfillment process (managed in **Workflow Studio**) |
| **Flow Stage** | Visual representation of where a request is in the fulfillment process |

---

## 3. Variables

- Added to catalog items to **gather user input** during ordering
- Can affect **order price**
- Default: **global** → appear in all execution tasks for a requested item
- Defined once → **reused across multiple catalog items**

### Variable Sets:
- Group variables together → apply to multiple items at once
- Update the set once → **auto-updates all associated items** ✅

---

## 4. Record Producers

- Look like catalog items but work differently
- Create **task-based records** (e.g. Incident) instead of requested item records
- Ideal for: submitting requests or reporting issues intuitively
- ⚠️ Use **only** for task-based records — use **catalog items** for requested item records
- Can be created for tables in same scope OR tables that allow cross-scope create access

---

## 5. Order Guides

- Allow users to order **multiple related items** in one request
- Proactively suggests related items (e.g. order laptop → suggests docking station, monitor)
- Simplifies decision-making and prevents users from missing needed items

---

## 6. Order Field

- Controls the **sequence** in which variables/items are displayed on the form
- Lower order value = appears **first**
- Example: Order 100 appears before Order 200

---

## 7. Request & Task Structure

When a user places an order:
```
Request created
    ↓
Catalog Item 1 → Tasks (e.g. Order Equipment, Configure Equipment)
Catalog Item 2 → Tasks (e.g. Order Equipment, Configure Equipment)
```
- Each item generates its **own set of tasks** — tracked independently
- Tasks with same name can have **different steps** per item

---

## 8. Flow Stages

- Visual progress tracker for fulfillment
- Shows current state of request as it moves through the process
- Can have **multiple approval rounds** — each with same or different stage
- **Stage Sets** = group related stages together for consistency
- Fully configurable in **Workflow Studio** (custom names, labels, durations, import from stage sets table)

---

## 9. User Criteria in Service Catalog

- Controls who can **view or contribute** to specific catalog items or categories
- Applied from: item form, category form, or User Criteria form
- Same concept as Knowledge Base User Criteria (Can Read / Can Contribute)

---

## 10. Catalog Builder

- Visual, guided tool for creating/editing catalog items
- Accessible to **business users** (no technical expertise needed)
- Allows **delegation** of catalog creation to teams

### Templates in Catalog Builder:
- Predefine: catalogs, categories, variable types, portal configs
- Ensure items meet **organizational standards**
- ⚠️ Designed for **common/simple use cases** — complex scenarios need catalog admin + traditional platform methods

---

## 11. Virtual Agent

- AI-powered conversational assistant
- Uses **natural language understanding** to interpret queries
- Available **24/7** — no human intervention needed
- Handles routine issues & common questions
- Integrates with **Slack & Microsoft Teams** via ServiceNow adapters
- Supports **flows** for process automation

---

> **Key Exam Points:**
> - Catalog Item → generates **requested item** record
> - Record Producer → generates **task-based** record (e.g. Incident)
> - Variables default = **global** (appear in all execution tasks)
> - Variable Sets = update once → updates **all associated items**
> - Order field: **lower value = appears first**
> - Order Guide = multiple items in **one request**
> - Flow Stages managed in **Workflow Studio**
> - Catalog Builder = for **business users**, not complex scenarios
> - Virtual Agent integrates with **Slack & Microsoft Teams**
