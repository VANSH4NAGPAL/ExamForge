---
title: "UI Policies"
icon: "Shield"
---

# UI Policies

In addition to Client Scripts, **UI Policies** are client-side logic tools used to enforce company policies directly on the browser. They dynamically control the visibility and behavior of fields—such as making them **mandatory**, **read-only**, or **visible/hidden**—often without needing to write a single line of script. This guides users as they complete forms, ensuring a positive user experience.

> **Key Rule of Execution**: UI Policies evaluate their conditions and execute **after** Client Scripts execute.

---

## Core Concepts & Form Fields

UI Policies take action based on whether their defined conditions evaluate to `true`. They can be created for tables that are in the same scope. The UI Policy form includes several critical fields:

- **Short description**: UI Policies do not have a standard "Name" field. Instead, you use the *Short description* (which holds up to 255 characters). It is best practice to provide a very robust, descriptive explanation of what the UI Policy does when triggered (e.g., *"If category is software, then subcategory is mandatory"*).
- **Condition**: Uses the standard ServiceNow Condition Builder to determine when the UI Policy applies (e.g., `Priority is Critical`).
- **Global**: If checked, the UI Policy applies to all form views. If unchecked, you must specify the exact form view name it should execute against.
- **On load**: If checked, the UI Policy will evaluate and execute immediately when the form loads and is displayed to the user. If this is not a requirement, it is best practice to uncheck it to improve page load times.
- **Inherit**: If checked, the UI Policy applies to the selected table and any tables that extend from it.
- **Reverse if false**: Extremely important! When checked, if the condition evaluates to `false`, the UI Policy Actions are automatically reversed, and the "Execute if false" script block is executed. If this is *not* checked, the "Execute if false" section will **never** execute.

### UI Policy Actions
UI Policy Actions define what actually happens when the condition is met (e.g., setting the Subcategory field to mandatory). 
*Note: The UI Policy Actions related list does not appear on the form until you save the UI Policy for the first time.*

---

## Scripting in UI Policies

While UI Policies are primarily designed to be configuration-driven (using the Condition Builder), you can still write complex JavaScript by checking the **Run scripts** checkbox. This reveals two script blocks:

1. **Execute if true**: Runs when the condition evaluates to `true`. For example, a script here might make the description field mandatory and show a message: *"Please describe your critical problem here."*
2. **Execute if false**: Runs when the condition evaluates to `false` (provided **Reverse if false** is checked). Here you might reverse the logic, make the description not mandatory, and hide the message.

**What Scripting Can Do in UI Policies:**
While the standard UI Policy Actions handle basic field states, you *must* use scripting within a UI Policy if you want to:
- Show or hide entire form sections (you cannot do this in the UI Policy Actions yourself, but you can with script).
- Remove, add, change, or validate data within fields.

**APIs Available in UI Policy Scripts:**
You have access to any variables declared in your script, plus:
- `g_form` (GlideForm): To manage the form and fields.
- `g_user` (GlideUser): To get information about the currently logged-in user and their roles.
- **`g_scratchpad`**: An object that provides a mechanism for passing information from the server-side back to the client-side. *(Note: This object is only populated via **Display Business Rules** before the form loads).*

---

## Catalog UI Policies

Catalog UI Policies control the behavior of Service Catalog Items and Variables.
- **Applies to**: A specific Catalog Item or a Variable Set used inside your catalog.
- **Configuration**: Uses the Condition Builder and requires a descriptive Short description, exactly like standard UI Policies.
- **Key Differences**: The form is almost identical, except it includes four additional checkboxes that dictate where the policy applies:
  1. Catalog Item views
  2. Catalog Tasks
  3. Requested Items
  4. Target Record

---

## Client Scripts vs. UI Policies

This is one of the most universally accepted rules in ServiceNow development:
> **If you can accomplish the same requirement using either a UI Policy or a Client Script, you should ALWAYS use a UI Policy.**

**Why use a UI Policy?**
- There are no performance issues/differences between the two.
- The main reason is that UI Policies are usually unscripted and rely on the Condition Builder.
- They are far easier to maintain. For less technical administrators who inherit the system after you and may not know how to script, it is much simpler to read a Condition Builder setup than to decipher syntax, classes, methods, and properties in a script.

**When MUST you use a Client Script instead?**
You must use a Client Script when you need functionality that a UI Policy simply cannot provide:
- You need something to execute specifically when the form is saved, submitted, or updated (i.e., `onSubmit`).
- You need access to what was in a field before it was changed (i.e., the `oldValue` parameter in `onChange`).
- You need to strictly control the order of execution, since UI Policies always execute *after* Client Scripts.

---

## Debugging UI Policies

- **Debug UI Policy Module**: ServiceNow provides a specific module called "Debug UI Policy". When activated, you use your browser's console to see exactly how the UI Policy condition evaluated (e.g., evaluating to `True` or `False`) and what actions were taken.
- **Form Messages**: You can also use `g_form.addInfoMessage()` or `g_form.addErrorMessage()` directly inside your UI Policy scripts. These functions output debug text onto the form and come in very handy to debug your UI Policies during development.

---

## Best Practices

1. **Always use UI Policies over Client Scripts** whenever possible.
2. **Limit the number of UI Policies**: Having too many UI Policies on a single form can lead to long page load times.
3. **Write robust Short Descriptions**, and if necessary, add the "Description" field to the UI Policy form to provide even more detail about what the policy is doing.
4. **Uncheck "On load"** if the policy does not need to execute immediately when the form opens, which improves performance.
5. **Use the Condition Builder** instead of scripting conditions whenever possible.
6. **Always comment your scripts**: If you haven't looked at a script in a long time, comments make it significantly easier to maintain later on down the road.

---

## Course Lab

- **Lab**: Write, test, and debug a UI Policy to complete the final UI requirements for the Cloud Dimensions application.
