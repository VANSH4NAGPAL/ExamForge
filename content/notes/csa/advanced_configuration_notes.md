# ⚙️ ServiceNow – Advanced Configuration (Study Notes)

---

## 1. Choice Lists vs. Reference Fields

| Feature | Choice List | Reference Field |
|--------|------------|----------------|
| **Icon** | 🔽 Dropdown arrow | 🔍 Magnifying glass |
| **Data stored** | Within the **same table** | In a **separate linked table** |
| **Examples** | Category, Priority (Incident table) | Service field → Service table; CI field → CI table |
| **Use case** | Predefined static options | Dynamic data from related tables |

---

## 2. Managing Categories (Choice Lists)

### ➕ Adding Categories/Subcategories
- Update the **Choice List** for the Category field directly
- Ensures options align with workflows & org requirements

### ➖ Deleting Categories/Subcategories
1. **Right-click** the Category field name
2. Select **Configure Dictionary**
3. Manage/remove choices from there

> ⚠️ **Governance Warning:** Changes to categories can affect:
> - Workflows
> - Reporting
> - Data consistency across the instance
>
> Always **plan, communicate, and get stakeholder approval** before making changes.

---

## 3. The Service Reference Field

- Links records to specific **services or service offerings**
- More **granular** than categories alone
- Especially useful when categories don't provide enough detail

### ✅ Benefits of Using It
- Structured classification of records
- Better visibility into service-related data
- Aligns workflows with specific service offerings
- Easier service performance reporting

### ⚠️ Before Making Changes
Changes to services/service offerings can impact:
- Workflows
- Reporting
- Data relationships across the platform

> 📌 Always make service changes as part of a **formal change management process**

---

## Quick Comparison Summary

| | Choice List | Reference Field |
|--|------------|----------------|
| **Config method** | Configure Dictionary | Links to external table |
| **Flexibility** | Fixed options | Dynamic, table-driven |
| **Change impact** | Workflows & reports | Platform-wide data relationships |
| **Governance needed** | ✅ Yes | ✅ Yes (formal change process) |

---

> **Key Exam Points:**
> - Choice lists = dropdown arrow = data in **same table**
> - Reference fields = magnifying glass = data in **another table**
> - Delete choices via **right-click → Configure Dictionary**
> - Both field types require **governance before modification**
