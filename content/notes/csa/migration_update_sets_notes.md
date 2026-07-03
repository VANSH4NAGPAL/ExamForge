# 📦 ServiceNow – Migration & Update Sets (Study Notes)

---

## 1. Application Scope

- Ensures apps operate **independently and securely**
- App can access/modify **its own tables & logic** by default
- Cannot interact with other apps **unless explicitly permitted**
- Prevents: naming conflicts, disruptions to core services
- Adds a **namespace identifier** to tables, scripts & config records (unique IDs)
- Enables **contextual development** — specify what changes are allowed per scope

### Global Scope:
- For apps **developed before scoping** or those needing **broad access**
- Allows **unrestricted interaction** between applications
- Used for legacy apps or broadly integrated apps

---

## 2. What is an Update Set?

- An **XML file** that tracks configuration changes to apps & platform features
- Acts as a **point-in-time snapshot** of process records
- Writes changes to the **Customer Update table**
- Used to **promote changes** from dev → test → production

### Key Components:
| Component | Description |
|-----------|-------------|
| **Unique identifier** | Identifies the update set |
| **List of config changes** | All customizations included |
| **State** | Determines if changes can be retrieved/applied to another instance |

---

## 3. What IS and IS NOT Captured

| ✅ Captured | ❌ NOT Captured |
|------------|---------------|
| Customizations & config changes | Actual data records (incidents, changes, etc.) |
| UI policies, business rules, client scripts | Beta records (new incidents, change records) |
| Workflows & flows | Portal pages related to dashboard tabs |
| Report definitions (data source, viz type, style, sharing) | Actual report output/data |

### Workarounds for excluded items:
- **Data records** → use **Export XML** function
- **Dashboard pages** → use **Unload Dashboard** function (unloads entire dashboard + tabs + portal pages)

---

## 4. Batch Update Sets

- Group **multiple update sets** together
- Preview & commit them **in bulk**
- Avoids:
  - Committing in wrong order
  - Accidentally omitting an update set

---

## 5. Update Set Best Practices

| Rule | Why |
|------|-----|
| ❌ Don't use the **default update set** | Captures ALL changes without user association — messy |
| ✅ Use a **named update set** | Better organization & control |
| ✅ Mark complete **only when fully ready** | Cannot revert back to In-Progress once complete |
| ✅ Create a **new update set** for additional changes | Don't reopen completed sets |
| ✅ Commit in **order they were created** | Avoids conflicts |

---

## 6. Naming Conventions

A good update set name should include:
- 👤 **Your initials** (who created it)
- 🎫 **Story/task number** (traceability)
- 📝 **Descriptive keywords** (purpose)

**Example:** `VK-INC-4521-Incident-Form-Customizations`

For sequenced sets:
- `Performance Enhancements`
- `Performance Enhancements Version 2`

---

## 7. Update Set Lifecycle

```
Development Instance
      ↓
  Mark as Complete
      ↓
  Transfer to Test Instance
      ↓
  Preview → Commit
      ↓
  Production Instance
```

---

> **Key Exam Points:**
> - Update set = **XML file** → tracks config changes, NOT data records
> - Changes written to **Customer Update table**
> - Scoped apps use **namespace identifiers** to avoid naming conflicts
> - Global scope = **unrestricted access** (legacy/broad-access apps)
> - Data records NOT included → use **Export XML**
> - Dashboard portal pages NOT included → use **Unload Dashboard**
> - ❌ Never use the **default update set** for migrations
> - Once marked **Complete** → do NOT revert to In-Progress
> - When merging update sets → **most recent change wins**
> - Commit update sets in **chronological order**

---

## 8. Applying an Update Set — Retrieve, Preview, Commit

### 3 Steps:
| Step | What happens |
|------|-------------|
| **1. Retrieve** | Pull the update set from the source instance |
| **2. Preview** | Compare update set vs local instance — detect conflicts/incompatibilities |
| **3. Commit** | Apply changes to the target instance |

> 💡 For **remote instances** → preview happens **automatically during retrieval**

---

### Compatibility Warnings:
| Scenario | Risk |
|----------|------|
| Older release → newer instance | ⚠️ Additional testing required |
| Newer release → older instance | ⚠️ Extensive testing required |

### SYS ID Alignment:
- Some platform records created post-provisioning may **not match** between instances
- Fix: **Clone production → sub-production** to align SYS ID fields

---

### Remote Instance Connection Setup (first time only):
Configure these fields:
- Name, Type, Active, **URL**, Username, Password, Short Description
- Click **Test Connection** to verify
- Save the remote instance record

---

> **Additional Exam Points:**
> - 3 steps to apply an update set: **Retrieve → Preview → Commit**
> - Remote instances = preview is **automatic during retrieval**
> - Merge: **newest change always overwrites** older changes
> - Mismatched SYS IDs → fix by **cloning production onto sub-production**

