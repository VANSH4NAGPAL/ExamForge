# 🗺️ ServiceNow – CMDB, Discovery & Service Mapping (Study Notes)

---

## 1. What is the CMDB?

- **Configuration Management Database** = centralized repository of all IT infrastructure components
- Originates from the **ITIL framework**
- Enabled by default via the **Configuration Management Database plugin**
- Core to IT Service Management (ITSM)

### Key Uses:
| Use Case | How CMDB Helps |
|----------|---------------|
| **Root cause analysis** | Identify affected components when issues arise |
| **Change impact** | Assess risk before implementing changes |
| **Problem management** | Spot recurring trends across CIs |
| **Incident management** | Faster resolution via CI details |

---

## 2. Key CMDB Tables

| Table | Purpose |
|-------|---------|
| **Base Configuration Item** | Stores attributes, status & relationships of each CI |
| **CI Relationship** | Captures how CIs interact with each other |

---

## 3. Configuration Items (CIs)

- A CI = **anything that needs to be managed** (hardware, software, business apps, system components)
- Each CI has: name, version, description, ownership, status, relationships
- CIs follow a **hierarchical class structure** (like table inheritance)

---

## 4. CI Relationships

- Managed via the **Configuration Item Relationship Editor**
- Accessed from the **Related Items toolbar** on a CI form
- The CI you start from = **base CI** → becomes parent OR child depending on relationship type
- **Relationship rules** define how base classes interact with dependent classes
- Extended tables **automatically inherit** relationship rules from parent

---

## 5. Dependency Views Map

- Visual tool showing **upstream & downstream dependencies** between CIs
- Root CI = darker frame + pulsing effect 🎯
- Default: **3 levels** of relationships in both directions (configurable)
- Clusters **collapsed by default** — expand for detail
- Shows active/pending issues via **icons & glyphs** (alerts, incidents, problems, changes)
- **Auto-refreshes** to reflect CMDB changes
- Relationships can be created **automatically** (via Discovery) or **manually**

---

## 6. CI Class Manager

A tree-view tool showing the **full CMDB class hierarchy**

### What you can do:
- View/modify/extend class definitions
- Create **derived classes** (extend existing ones)
- Access metadata per class:
  - Reconciliation rules
  - Mandatory & recommended fields
  - Audit templates
  - Database health settings
  - Identification & reconciliation rules
  - Orphan scorecards
  - Certificate templates

> 💡 Use CI Class Manager to find the **correct class table** before manually adding a CI

---

## 7. CMDB Workspace

Central hub for administrators to:
- Administer **policies**
- Manage **CI lifecycles**
- View **analytics**
- Approve/reject **assigned tasks**
- Access **dependency map, attributes, activity & infrastructure relationships**

---

## 8. Common Service Data Model (CSDM)

- A **standardized framework** for mapping IT services to ServiceNow
- Ensures consistency in how data is organized in the CMDB
- Built on two concepts:

| Concept | Meaning |
|---------|---------|
| **Common Service** | Shared service definitions for consistent reporting |
| **Data Model** | Database framework supporting diverse config strategies |

### CSDM helps you:
- Perform **service modeling** activities
- Define **scope** (in-scope vs out-of-scope)
- Identify correct **tables & CIs** per use case
- Track **asset lifecycles**
- Enable **true service-level reporting**

---

## 9. Discovery

- Uses **MID Server** (Management, Instrumentation & Discovery Server)
  - Lightweight Java process — runs on Linux, Windows, or cloud
- MID Server **scans the network** for devices/apps → sends results to ServiceNow
- Can communicate through a **proxy server**
- Captures: OS, software, memory, attributes, relationships between devices/apps
- Traditional = **Horizontal Discovery** (treats devices as standalone objects)
  - ⚠️ Doesn't show how things are **connected or dependent**

---

## 10. Service Mapping

- Takes a **top-down approach** → maps service-specific dependencies
- Shows all components delivering a **specific service** (e.g. Financial Reporting app)
  - Web server, app server, database, middleware, network infrastructure
- **Overlays service maps** onto existing CI data
- Shows **impact of failures** on the full service chain

### Example:
```
Disk Drive Fails
      ↓
  Database affected
      ↓
  Requisition Service fails
      ↓
  HR can't order equipment for new employees
```

- Automatically **populates CMDB** with discovered relationships & dependencies

---

## Discovery vs Service Mapping

| | Discovery | Service Mapping |
|-|-----------|----------------|
| **Approach** | Horizontal (bottom-up) | Top-down (service-focused) |
| **Focus** | Individual devices & apps | Full service dependency chains |
| **Relationships** | Device ↔ App | Service → all dependent components |
| **CMDB impact** | Populates CI data | Populates relationships & dependencies |

---

> **Key Exam Points:**
> - CMDB originates from **ITIL**
> - CI = anything that needs to be managed
> - Dependency view default = **3 levels** upstream & downstream
> - CI Class Manager = **tree view** of full CMDB hierarchy
> - CSDM = standardized framework for service data mapping
> - MID Server = lightweight Java process used by Discovery
> - Discovery = horizontal | Service Mapping = top-down/service-focused
> - Service Mapping auto-populates CMDB with relationships
