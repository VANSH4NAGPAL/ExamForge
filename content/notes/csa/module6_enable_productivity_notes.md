# 📊 ServiceNow – Module 6: Enable Productivity (Study Notes)

---

## 1. Platform Analytics Suite

| Tool | Purpose |
|------|---------|
| **Visualization Designer** | Create & customize charts and reports |
| **Performance Analytics** | Track metrics over time, set targets & alerts |
| **User Experience Analytics** | Analyze how users interact with the platform |
| **Process Mining** | Discover and optimize process flows |

- Accessible via **core UI** or **Platform Analytics experience**
- Visualizations can be run **manually** or **scheduled automatically**

---

## 2. Visualization Types (20+)

Bar charts, pie charts, dials, speedometers, single score, pivot tables, donuts, lists, and more.

> 💡 **Best Practice:** Duplicate an existing visualization → edit the copy. Never modify the original!

---

## 3. Visualization Designer – Key Sections

| Section | What it does |
|---------|-------------|
| **Type** | Choose chart format (bar, pie, dial, etc.) |
| **Data Sources** | Define where data comes from (ServiceNow tables or predefined datasets) |
| **Presentation** | Customize look & feel |
| **Conditions** | Filter data using predefined OR custom conditions |

### Useful Actions:
- **Add to Dashboard** → save visualization directly to a dashboard
- **Save** → preserve changes as you work
- **More Options** → advanced configuration settings
- **Toggle Config Panel** → focus on specific elements
- **Details Side Panel** → set name, description, owners, groups, access, creation/update history

### Filtering Data:
- Use **predefined conditions** (platform-provided filters)
- OR create **custom conditions** for specific needs
- Predefined conditions may not always be available depending on the table
- Select **"Add this Source"** when done filtering

---

## 4. Data Visualizations Library

- Pre-built visualizations available out-of-the-box
- May include custom ones created by reporting admins
- Use as starting point → run as-is OR modify
- Start from: **filtered list** or **existing visualization** (faster than scratch)

---

## 5. Dashboards

- Share analytics & visualizations across **workspaces and classic dashboards**
- Create/edit **Platform Analytics widgets** directly from the dashboard

### Key Features:
| Feature | Purpose |
|---------|---------|
| **Add Widgets pane** | Search & preview widgets before adding |
| **Integrated Sharing pane** | Share dashboards with other users/teams |
| **Quick Layouts** | Snap widgets into predefined structure |
| **Set as Homepage** | Quick access on login |

### Adding a Visualization to Dashboard — 2 Ways:
1. Create dashboard first → add visualization as element
2. Create/save visualization → select **"Add to Dashboard"**

---

## 6. Performance Analytics

- Tracks **metrics over time** (not just one-time snapshots)
- Ongoing, iterative process — continuously refined
- Captures **regular data snapshots** → generates accurate **historical trends**

### Answers two questions:
| Question | Tool |
|----------|------|
| Where are we **today**? | Standard visualizations |
| What is happening **over time**? | Performance Analytics |

### Advanced Capabilities:
- 📈 Track performance **against targets**
- 🔔 **Alerts** when thresholds are met (proactive response)
- 🔮 **Forecast** future performance
- 🔁 **Compare** performance at different points in time

---

> **Key Exam Points:**
> - Platform Analytics = 4 tools: Visualization Designer, Performance Analytics, UX Analytics, Process Mining
> - Always **duplicate** existing visualizations before editing
> - 20+ visualization types available
> - Performance Analytics = **ongoing** process (not one-time)
> - Performance Analytics captures **historical trends** via regular snapshots
> - Dashboards can be set as **homepage**
> - Two ways to add visualization to dashboard: create dashboard first OR use "Add to Dashboard" button
> - Custom conditions always available even when predefined ones aren't
