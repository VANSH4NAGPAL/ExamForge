# 🔔 ServiceNow – Notifications (Study Notes)

---

## 1. What are Notifications?

- Alert users when **relevant events occur**
- Delivery methods:
  - 📧 **Email** (most common)
  - 📱 **SMS** (Short Messaging Service)
  - 📅 **Meeting Invitations**

---

## 2. Email Notification Dashboard

Gives admins a comprehensive view of notification performance:

| Feature | What it shows |
|---------|--------------|
| **Key metrics** | Overall notification performance insights |
| **Active notifications** | Currently ongoing issues/updates |
| **Trends over time** | Patterns in notification activity |
| **Usage metrics** | Most frequently used & impactful notifications |

---

## 3. Creating Notifications — 3 Key Parameters

Admins must define:

| Parameter | What to configure |
|-----------|------------------|
| **When** | What event triggers the notification |
| **Who** | Which users and/or groups receive it |
| **What** | Content/message of the notification |

> ⚠️ Notifications sent to users with **inactive records** in the User table will **NOT be delivered** — only active users receive notifications.

---

## 4. Managing Notifications (User Side)

Users manage their own preferences via the **Notifications page in Settings**:
- Define **notification channels** (e.g. SMS)
- Manage **subscriptions** — choose which notifications to receive
- Customize preferences to focus on most relevant updates

---

## 5. Force Delivery vs Mandatory

| Field | Effect |
|-------|--------|
| **Force Delivery** | Notification is **always sent** regardless of user preferences |
| **Mandatory** | Users **cannot opt out** of receiving it |

> 💡 Use these for **critical notifications** that must always reach recipients.

---

> **Key Exam Points:**
> - 3 notification methods: **Email, SMS, Meeting Invitations**
> - 3 things to configure: **When, Who, What**
> - Inactive user = notification **not delivered**
> - Users manage subscriptions via **Notifications page in Settings**
> - **Force Delivery** = always sent | **Mandatory** = can't opt out
> - Email Notification Dashboard tracks: metrics, active notifications, trends, usage
