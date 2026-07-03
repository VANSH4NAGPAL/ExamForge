# 📋 ServiceNow – Form Configuration (Study Notes)

---

## 1. Data Structure Basics

| Concept | What it is |
|--------|-----------|
| **Table** | Blueprint/container for a type of data (e.g. Incidents, Users) |
| **Record** | A single entry inside a table |
| **Field** | Individual piece of data within a record (e.g. Name, Email) |

---

## 2. What is a Form?

- Displays **one record** at a time for viewing/editing
- Accessed via **Global Search** (by record number) or by clicking a record in a **List View**
- Layout may differ between **Core Platform** and **Workspace**

---

## 3. Form Elements

| Element | Purpose |
|--------|---------|
| **Sections** | Group related fields together |
| **Formatters** | Show non-stored info (e.g. Activity Stream, Process Flow) |
| **UI Actions** | Buttons/links (Save, Update, Delete) |
| **Related Lists** | Show linked records from other tables *(only visible after saving)* |

---

## 4. Common Field Types

- **Reference** – links to another record
- **String** – plain text
- **Choice** – dropdown
- **Date & Time** – timestamp
- **True/False** – boolean checkbox

> 💡 Tip: Switch form views via the **Additional Actions menu**. Save mandatory fields first before switching.

---

## 5. Modifying Forms – 3 Methods

| Method | Access |
|--------|--------|
| **Form Builder** | Record → Configure → Form Builder |
| **Form Design** | Similar UI, table-level |
| **Form Layout** | Basic drag-and-drop layout tool |

### Form Builder Capabilities
- Add/move/delete **fields, formatters, embedded lists**
- Choose which **view** the layout applies to
- Configure **Policies & Rules** (UI Policies, ACLs, Client Scripts, Business Rules)
- **Preview** before saving

> ⚠️ **Don't add the same editable field to multiple sections** — causes data loss!

---

## 6. Dot-Walking

- Adds **related fields from connected tables** to your form
- In Form Builder → *"Add a related field"* → drag to section → select field → **Add to View**

---

## 7. Related Lists

- Use **Edit** to link existing records; **New** to create records inline
- Customize with **⚙️ Gear** (columns) or **🔽 Funnel** (filters)
- Changes are **view-specific**

---

## 8. Personalizing Forms

- Click the **Personalize Form** icon on any record
- Toggle field visibility (clear checkbox = hidden)
- **Mandatory fields cannot be hidden**
- Customizations persist until manually reset

---

## 9. Templates

- **Pre-fill** common fields to save time & ensure consistency
- Create: Toggle Template Bar → **+** → fill fields → save
- Applied fields show a **✔ checkmark** next to the label
- Best for: **Incident, Problem, Change** forms
- ⚠️ Can bypass mandatory fields/UI policies — restrict who can create them
- ❌ Deleted templates **cannot be recovered**

---

## 10. Workspace vs Core Platform

| Feature | Core Platform | Workspace |
|--------|--------------|-----------|
| Form location | Main view | Under **Details** tab |
| Sections | Standard | **Bold**, collapsible |
| Activity Stream | Inline formatter | Separate panel |
| Templates | Standard | Share with groups via 🔍 Magnifying Glass |

---

> **Key Exam Points:**
> - Related lists appear **only after record is saved**
> - Never duplicate editable fields across sections
> - Form Builder is the most powerful modification tool
> - Templates can bypass critical processes — manage carefully
