# 🛡️ ServiceNow – Security Center (Study Notes)

---

## 1. What is the Security Center?

- **Included application** (no extra cost) for system admins
- Consolidates security tools into **one centralized location**
- Purpose: manage, monitor & improve instance security
- Helps: apply patches, configure encryption, review access controls, address vulnerabilities

---

## 2. Security Center – Key Pages & Features

| Page / Feature | Purpose |
|----------------|---------|
| **Home page** | Dashboard — current security status, reports, key metrics |
| **Hub Overview** | Centralized security tasks, hardening compliance score, basic configs |
| **Hardening** | Compare settings to ServiceNow recommendations |
| **Scanner** | Scan instance for misconfigurations & vulnerabilities |
| **Customer Actions** | Proactive nudges for deprecated/unnecessary settings |
| **Best Practices** | Setup guide for foundational security configurations |
| **Notifications** | Alerting policies for security events/thresholds |
| **Metrics** | Monitor security KPIs, detect threats & patterns |
| **Learning** | White papers, eBooks, KB articles, docs, community discussions |

---

## 3. Hardening Compliance Score

- A **whole number percentage (0–100%)** reflecting adherence to ServiceNow's recommended configs
- **Dynamically updates** whenever a configuration changes
- Each setting has an **impact score between 0 and 1**
- Start by reviewing **critical and high non-compliance settings**

### Security Posture Dashboard:
- Access via: Security Center → Security Posture console banner link
- OR: All menu → All Security Center → Security Posture Dashboard

### Hardening Section tabs:
| Tab | Shows |
|-----|-------|
| **Score Comparison** | Current vs recommended settings |
| **Score Trends** | How score evolved over time |
| **All Settings** | Full list of hardening configurations |
| **Impact by Priority** | Areas needing attention by importance |
| **Impact by Security Area** | Areas needing attention by category |

---

## 4. Scanner

- Scans instance for: **misconfigurations, overprovisioned access, insecure behaviors**
- Access: Select **Scanner** in top banner

### Scanner Sections:
| Section | Purpose |
|---------|---------|
| **Comparison** | Overview of current security suites |
| **Checks** | Individual security checks |
| **Suites** | Groups of checks — can create custom suites |
| **Results** | Output of completed scans |
| **Findings** | Detailed scan results for analysis |

### Creating a Custom Suite:
1. Go to **Suites → New**
2. Provide title & description
3. Go to **Check section** → select specific checks
4. Execute scan → review **Scan Findings tab**

---

## 5. Customer Actions

- Proactive list of issues needing attention (deprecated configs, unnecessary settings)
- Access: **Security Customer Actions** in banner
- Count-in graph shows actions by status:
  - Available | Overdue | Due Soon | In Progress | Complete
- Each action has **detailed steps & workflow** to resolve

---

## 6. Best Practices

- Starting point for **foundational security setup**
- Features:
  - **Completed Settings widget** — tracks configured settings
  - **Bar chart** — progress by step
  - **Detailed settings list** — click into each to modify
- Multi-task settings: left pane = step list | right pane = expanded instructions
- Must complete **all task steps** to fully implement a best practice

---

## 7. Notifications (Security Center)

- Set up **alerting policies** for when thresholds/events are met
- Use existing policies OR create **custom policies**
- Configure in **Policy Settings**:
  - When triggered event occurs
  - Conditional logic
  - Roles that trigger notification
  - Who receives the notification (groups or individuals)

---

## 8. Metrics

- Monitor **security KPIs** — detect threats, risky behaviors, patterns
- Access: **Metrics** in top banner
- Use default OR **custom dashboard**
- Supports **widgets** for data visualization
- Drill into detailed reports for all related records
- Set **thresholds** → auto-alerts when exceeded
- Example: spike in failed logins = potential unauthorized access

---

## 9. Review Cadence (Recommended)

| Frequency | Purpose |
|-----------|---------|
| **Monthly** | Address questions, evaluate pending configurations |
| **Quarterly** | Minimum — full security review |

- Capture detailed notes on configurations under review
- Include: account teams, ServiceNow Security team, partners
- Always perform **UAT in sub-production** before applying updates to production

---

## 10. Security Center Updates

- Released **twice a year** (+ regular family releases)
- Before updating: **test in sub-production first**
- To check for updates: All menu → Search "Security Center" → Sync apps → Install → Refresh browser

---

## 11. Key Security Resources

| Resource | Purpose |
|----------|---------|
| **Cloud Security Resource page** | Add security contacts, key guidance |
| **Shared Responsibility Model doc** | Outlines customer vs ServiceNow duties |
| **Security Center Docs site** | Best practices & admin guidance |
| **Securing the Now Platform white paper** | Overview of ServiceNow security program |
| **Security Best Practices Guide** | Key considerations for securing instances |

---

> **Key Exam Points:**
> - Security Center = **included**, no extra cost
> - Hardening Compliance Score = **0–100%, whole number, dynamically updates**
> - Each setting has impact score **between 0 and 1**
> - Scanner detects: **misconfigurations, overprovisioned access, insecure behaviors**
> - Customer Actions = proactive **nudges** for deprecated/unnecessary configs
> - Metrics: spike in **failed logins** = potential hack/unauthorized access
> - Security Center updates released **twice a year**
> - Always test in **sub-production** before applying to production
> - Quarterly review = **minimum**, monthly = **recommended**
