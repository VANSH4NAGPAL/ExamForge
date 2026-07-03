# 🔐 ServiceNow – Module 8: Securing a ServiceNow Instance (Study Notes)

---

## 1. Shared Responsibility Model

| Party | Responsible for |
|-------|----------------|
| **ServiceNow** | Infrastructure security, platform updates, compliance |
| **Colocation Providers** | Physical infrastructure security |
| **Customer (You)** | Configure & manage security settings, user access, permissions, data |

### Customer's Key Responsibilities:
- Manage **user access** & enforce **role-based security**
- Protect **sensitive data**
- Apply **updates & patches**
- Monitor for **vulnerabilities**
- Review **security configurations** regularly
- Manage how data is: **collected, stored, used, shared, archived, destroyed**
- Ensure **accuracy & confidentiality** of data

---

## 2. Data Encryption

### At Rest:
| Option | Coverage |
|--------|---------|
| **Column-based encryption** | Application-centric, specific fields |
| **Volume-based encryption** | Full backend, broader protection |

- Supports **customer-managed encryption keys**
- Customers can **withdraw keys** (renders instance unusable) or **resupply** them

### In Transit:
- **TLS (Transport Layer Security)** — enabled by default
- Negotiated during initial handshake if email system supports it

### Key Management:
- Customers responsible for **segregation of duties** — dedicated roles for:
  - Cryptographic management
  - Operations
  - Auditing
  - Integration
- Customers using **customer-supplied keys** must **generate & transfer** keys to their instance

---

## 3. Logging — Two Levels

| | Infrastructure Logs | Customer Application Logs |
|-|--------------------|--------------------------|
| **Source** | Network & server devices | Individual customer instances |
| **Visible to customer?** | ❌ No (ServiceNow staff only) | ✅ Yes (downloadable) |
| **Retention** | **90 days** (high-volume = shorter) | Customer managed |
| **Examples** | Unusual behavior, environment events | User logins, failed logins, privilege escalations |

### Most Detailed: **Transaction Logs**
- Record every **click, view & action**
- Customer's responsibility to **monitor regularly**

---

## 4. Patching & Upgrades

| Type | Frequency |
|------|----------|
| **Patches** | Monthly — address bugs, performance, security |
| **Major releases** | **2 per year** — new features & capabilities |
| **Hotfixes** | Continuous throughout supported lifetime of a release |

- Customers **schedule** their own patching/upgrades
- Patches rolled into code base → included in next platform version

---

## 5. Security Contacts

- ServiceNow contacts your org via **Named Security Contacts** in the **Now Support portal**
- Used for: **security-related communications only**
- Must be:
  - ✅ **Authorized** to handle sensitive security matters
  - ✅ **Always reachable**
  - ✅ **Kept up to date**
- Best practice: Include **both** an email distribution list AND an individual contact

---

## 6. Security Center

- Included with Now Platform at **no additional cost**
- Helps admins: manage & monitor instance security proactively
- Tools for: applying updates/patches, configuring security settings, addressing vulnerabilities
- Reduces burden of manually tracking security configurations

---

> **Key Exam Points:**
> - Shared responsibility: **Customer = configure/manage** | **ServiceNow = infrastructure**
> - 2 encryption at rest options: **column-based** (specific fields) & **volume-based** (full backend)
> - In transit = **TLS** by default
> - Infrastructure logs = **NOT visible to customers**, retained **90 days**
> - Transaction logs = most detailed — record every click/view/action
> - Patches = **monthly** | Major releases = **2 per year**
> - Security contacts must include **distribution list + individual**
> - Security Center = **included at no extra cost**
> - Customer can **withdraw encryption keys** → renders instance unusable
