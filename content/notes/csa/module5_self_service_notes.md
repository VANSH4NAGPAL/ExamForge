# 🙋 ServiceNow – Module 5: Configure Self-Service (Study Notes)

---

## 1. Key Self-Service Portals

| Portal | Purpose |
|--------|---------|
| **Employee Center** | Unified hub — tasks, requests, KB, catalogs, live agent chat |
| **Service Portal** | Search KBs, browse catalogs, create/view incidents, check approvals |
| **Knowledge Portal** | Manage & search Knowledge Bases and articles |
| **CAB Workbench** | CAB managers schedule/plan/manage Change Advisory Board meetings |
| **Security Center** | Monitor security controls, view event metrics, configure security settings |

---

## 2. Knowledge Management Overview

- Organizations can create **multiple Knowledge Bases** (each with its own manager)
- Articles organized by **categories** and **category groups**
- Users can **browse, search, sort** (by relevancy, most recent, views)
- Users can **comment or flag** articles → flagged articles go to KB admin
- **Contextual search** integrates with Incident Management → suggests articles while troubleshooting
- Add articles via:
  - 📄 **Import Word document** (Import Articles button)
  - ✍️ **Create an Article** from scratch (HTML editor with spell check & formatting)

---

## 3. Knowledge Base Setup

- Use **Knowledge Management Guided Setup** for structured configuration
- Gather requirements from **stakeholder meetings/workshops** first
- Tasks can be **delegated** via Assign Task feature
- Some tasks may be **locked** if required plugins aren't activated → link provided to activate

### Per Knowledge Base, admins can define:
- Unique **lifecycle workflows**
- **User Criteria** (who can read/contribute)
- **Category structures**
- **Manager assignments**

---

## 4. User Criteria – Access Control for KBs

| List | Controls |
|------|---------|
| **Can Read** | Who can view articles |
| **Can Contribute** | Who can write/edit articles |
| **Cannot Read** | Explicitly excludes users from viewing *(overrides Can Read)* |
| **Cannot Contribute** | Explicitly excludes from contributing *(overrides Can Contribute)* |

### Match All Checkbox:
| Setting | Behaviour |
|---------|-----------|
| ✅ **Checked** | User must meet **ALL** criteria fields |
| ☐ **Unchecked** (default) | User must meet **at least one** criteria |

> ⚠️ If **no User Criteria** set on Can Read → KB is **public to all users**
> Use the system property to restrict to **logged-in users only**

---

## 5. Knowledge Base Default Workflows (Flows)

| Flow | What it does |
|------|-------------|
| **Knowledge Approval Publish** | Requests manager approval → publishes if approved; stays draft if rejected |
| **Knowledge Approval Retire** | Requests manager approval → retires if approved; stays published if rejected |
| **Knowledge Instant Publish** | Bypasses approval → **immediately publishes** draft |
| **Knowledge Instant Retire** | Bypasses approval → **immediately retires** published article |
| **Knowledge – Publish Knowledge** | Subflow that moves article to Published state (used in custom flows) |
| **Knowledge – Retire Knowledge** | Subflow that moves article to Retired state (used in custom flows) |

---

## 6. Now Mobile App – Knowledge Access

- Global search bar → find people, articles, catalog items instantly
- Browse by category via the **ℹ️ info icon** in footer
- View article details: number, author, publish date, views
- Leave **feedback & comments** on articles
- Admins control which KBs appear in the app via **Mobile Employee Service Portal**

---

## 7. Module 5 – What You'll Configure

- ✅ Portals (Employee Center, Service Portal, etc.)
- ✅ Knowledge Base (create, import docs, approve & publish articles)
- ✅ User Criteria (define, apply & test access control)
- ✅ Service Catalog items (using **Catalog Builder**)
- ✅ Workflow Studio (use existing flows + create new ones)

---

> **Key Exam Points:**
> - **Cannot Read/Contribute** lists **override** Can Read/Contribute
> - Default: Match All = **unchecked** (only one criteria needs to match)
> - No User Criteria on Can Read = **publicly accessible**
> - **Instant Publish/Retire** = no approval needed
> - **Approval Publish/Retire** = rejected by any manager → article stays in current state
> - CAB Workbench = Change Advisory Board tool (not for KB)
> - Contextual search = articles suggested **inside Incident Management**
