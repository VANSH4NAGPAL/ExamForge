---
title: "Business Rules"
icon: "Server"
---

# Business Rules

**Business Rules** contain server-side JavaScript designed to execute when a database action occurs. They interact directly with tables in the ServiceNow instance rather than the user interface (forms/lists). 

Because they run on the server side, they are faster and are the preferred method for making automated database changes, performing integrations, or executing logic that does not depend on a user interacting with a UI.

---

## When Do Business Rules Execute?

A Business Rule is a record associated with a specific table. Under the **When to run** tab, you define the database operations that act as the trigger:
- Displaying a record
- Inserting a record
- Updating an existing record
- Deleting a record
- Querying the table

You can also use the **Condition Builder** for filter conditions to narrow down exactly when the rule should run (e.g., `Problem state is resolved or closed` AND `Active is false`). Building conditions without scripting prevents the rule from loading and executing unnecessarily, saving system resources and improving efficiency.

### Timing of Execution

Business rules execute at very specific moments relative to a database transaction:

1. **Before Query**: Runs *before* a database query is actually executed. 
   - *Use Case*: Restricting visibility. For example, preventing users from one location from seeing CIs from another location (e.g., London CIs restricted from non-London users).
2. **Display**: Runs after the data is read from the table, but *before* the form is presented to the user.
   - *Use Case*: Commonly used to populate the **`g_scratchpad`** object, allowing you to pass server-side data over to client-side scripts. Generally used for data not on the queried table.
3. **Before**: Runs after the user submits, saves, or updates the record, but *before* the data is actually written/saved to the database.
   - *Use Case*: Calculating or populating fields that are not populated by the user before the final save.
4. **After**: Runs *after* the record has been successfully written to the database.
   - *Use Case*: Updating related records, making changes to attached records, or cleaning up associated data on another table based on the update.
5. **Async (Asynchronous)**: Runs in the background as a scheduled job entry at the next available moment. 
   - *Use Case*: Used when the action is not time-sensitive. Because it runs asynchronously, it immediately returns control of the UI back to the user, meaning they do not have to wait for the script to finish executing.

---

## Defining Actions (No-Code vs. Scripting)

You do not always need to write JavaScript in a Business Rule.
- **Actions Tab**: You can define what field values to set (e.g., set `Active` to `true`) and display a message (e.g., "Incident reopen successful") upon execution without any scripting.
- **Advanced Checkbox**: Checking the "Advanced" box reveals the Advanced tab and Script editor, allowing you to write complex JavaScript logic inside the `executeRule(current, previous)` function. You can also specify script conditions here.

---

## Server-Side Global Variables

When scripting in a Business Rule, you have access to several global variables automatically:
- **`current`**: An object containing the current values of the record being processed.
- **`previous`**: An object containing the values of the record *before* the current update was made. Useful for comparing values in `if` statements to detect state changes.
- **`g_scratchpad`**: A temporary object used exclusively in **Display** Business Rules to send server data to the client browser. 
  - *Example*: `g_scratchpad.createdBy = current.sys_created_by;` and `g_scratchpad.caller = current.caller_id;`. These variables can then be utilized by client-side scripts.

---

## Dot-walking (Table Hopping)

**Dot-walking** allows you to navigate from table to table to field to access data on completely different tables without needing complex queries.

*Example*: To find the name of the Caller's Department:
`current.caller_id.department.name`
*(Current Table -> User Table -> Department Table -> Name field)*

**Tip**: You do not have to memorize dot-walking paths! The Syntax Editor includes a **Script Tree** that allows you to click through referenced tables (e.g., `assigned_to.building.contact.city`) and automatically builds the dot-walking address path for you.

---

## Server-Side Debugging

ServiceNow provides a wide variety of tools for server-side debugging:

### GlideSystem (`gs`) Logging
These methods log messages to the System Log (`syslog`):
- `gs.info()`: Informational events.
- `gs.error()`: Critical errors.
- `gs.warn()`: Warnings or potential issues.
- `gs.debug()`: Only processed when the system is in debug mode.
- `gs.log()`: An older version of `gs.info()` (logs the message, but less ideal).

To display a message directly on the user's form on the client side:
- `gs.addInfoMessage('msg')`
- `gs.addErrorMessage('msg')`

### The Script Debugger
A dedicated debugging environment accessible via **System Diagnostics -> Script Debugger** or the bug icon in the Syntax Editor.
- **Breakpoints**: Allows you to pause script execution at a specific line of code to zero in on issues. Breakpoints are unique to your individual, user-specific session (you won't step on other developers' toes). You can use this while impersonating another user, as long as they have Script Debugger access.
- **Controls**: Includes a Power button to start, and buttons to pause, resume, step over, step into, or step out of functions.
- **Limitation**: You **cannot** step through **Async** Business Rules using the Script Debugger, as they execute asynchronously via the scheduled job queue.
- **Call Stack**: Shows the list of executed items (business rules, anonymous functions, UI actions) and transaction details (network info, user and session ID).
- **Console**: While paused, evaluate expressions (e.g., `current.short_description`) in real-time. Note: You must be an admin or have the Script Debugger role. The `This` keyword and `gs.print()`/`gs.info()` are **not supported** in the console. Shows if variables are undefined.
- **Variables**: Inspect local-scope, closure-scope, and global-scope variable names and values (e.g., `current`, `active`, `activity_due`).

### The Script Tracer
Narrows down your debugging search by showing specific lines in the script that caused a `GlideRecord` change during execution. It saves time and improves productivity by showing the state differences between old vs. new scripts. Includes a "Debug Script" button to directly open the Script Debugger. It clearly identifies error lines (e.g., "line 5: Log property values is not defined").

### `try/catch` Blocks
Standard JavaScript `try { ... } catch(e) { ... }` blocks can be used to trap runtime errors. You can try a block of code, catch an error, and log it or display it gracefully.

---

## Labs Overview
During this module, you'll complete three labs for hands-on practice:
- **Lab 4.1.1 (25-30 mins)**: Debugging business rules using several different strategies.
- **Lab 4.1.2 (15-20 mins)**: Working with `current` and `previous` global variables, creating two new form fields for a business rule, and debugging.
- **Lab 4.1.3 (15-20 mins)**: Using a display business rule with `g_scratchpad` to transfer data from the server-side to the client-side, and practicing dot-walking.

*(Note: These build towards overall Cloud Dimensions requirements, following the completion of RCA documentation, confirming major incidents, and enforcing mandatory incident requirements).*

---

## Best Practices

1. **Use Async Business Rules when possible**: If the functionality isn't time-sensitive, make it Async. It drastically improves efficiency by not leaving the user waiting for the script to finish before they get their UI back.
2. **Use Display rules with `g_scratchpad`**: The best way to pass data from the server-side to the client-side.
3. **Use the Condition Builder**: Always write condition statements for your field editor when possible. If the functionality can be managed by the condition builder, use it instead of scripting to save time and increase efficiency.
4. **Document your Rules**: Add the Description field to the Business Rule form and use it to document what the rule does and its purpose.
5. **Comment your Scripts**: Write an outline of what the script needs to do prior to scripting, and use those comments as a roadmap for each section of your code.
