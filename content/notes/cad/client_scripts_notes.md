---
title: "Client Scripts & Client-Side APIs"
icon: "Monitor"
---

# Client Scripts & Client-Side APIs

Client Scripts manage the behavior of forms, fields, and lists in real-time, executing on the browser (client-side). They are primarily used to enhance the end-user experience. Because they run on the browser, their behavior can occasionally vary depending on the specific browser your employees or clients are using, so it is a good practice to test across multiple browsers.

Client Scripts can be used to:
- Make fields mandatory based on conditions (e.g., dynamically requiring a field instead of it always being mandatory).
- Set one field's value in response to another (e.g., changing the Category modifies the Subcategory or other fields).
- Modify, add, or clear choice list options (e.g., offering additional state or impact choices for an ITIL admin compared to a regular user).
- Hide or show form sections.
- Display alerts, confirmations, or platform-specific form/field messages.
- Prohibit specific list editing actions.

---

## The Client Script Form

When configuring a Client Script, you define its triggers and behavior. Key fields include:
- **Table**: The table the script executes against (e.g., `Incident`).
- **Inherited**: If checked, the script executes against the selected table and all of its child tables. For example, if you create a script on the `Task` table and check Inherited, it could potentially execute against the `Incident`, `Problem`, or `Change Request` tables.
- **Type**: Defines *when* the script executes (`onLoad`, `onSubmit`, `onChange`, `onCellEdit`).
- **Active**: Determines if the script is currently running. ServiceNow delivers thousands of Client Scripts—many active, but some inactive (often prefixed with "sample") which you can use as templates during implementation.
- **Global / View**: If `Global` is checked, it runs on all views. If unchecked, you must specify the exact view(s) (e.g., `ess` for self-service) separated by commas.
- **Order**: Specifies the order of execution when multiple Client Scripts of the same type run on the same table. Scripts execute from lowest number to highest number.
  - *Analogy*: Think of it like going to a deli counter and grabbing a number; the lower the number, the sooner you get served.
  - *Note*: The Order field sits on the underlying table but does not appear on the Client Script form baseline; it must be added using Form Layout or Form Design.

---

## The 4 Types of Client Scripts

### 1. onLoad()
- **When it runs**: Executes when a form loads (after retrieving data from the server) and *before* control is given to the user.
- **Use Case**: Used for manipulating the form appearance immediately as the user opens the record. Some forms take longer to load due to related lists, so you might use a script to alert the user: *"The form has finished loading, and is ready for input."*
- **Function**: Selecting this type automatically inserts the `function onLoad() { }` template with no arguments passed.

### 2. onSubmit()
- **When it runs**: Executes when you try to create or update a record. This includes clicking any UI Action that saves data, such as Save, Update, Submit, Insert, or Insert and Stay.
- **Use Case**: Typically used for field validation. For example, presenting a standard JavaScript `confirm()` dialog asking, *"The CIO is notified of all P1 incidents. Are you sure that you want to submit this as a P1 for 'the number 7 key is stuck'?"* If the user clicks Cancel, they can go back and make a change.
- **Function**: Automatically inserts the `function onSubmit() { }` template with no arguments passed.

### 3. onChange()
- **When it runs**: Executes when a specific field's value changes. You must specify the **Field name** that acts as the trigger (e.g., `Caller`).
- **Use Case**: Often used to highlight information (like alerting if the Caller is a VIP) or to automatically assign the incident to a specific network group based on the Configuration Item selected.
- **Function**: Passes five critical arguments to the `onChange(control, oldValue, newValue, isLoading, isTemplate)` function:
  1. `control`: The name of the object or field whose value just changed (e.g., `caller_id` or `Configuration item`).
  2. `oldValue`: The value of the field when the form initially loaded, prior to you changing it. *(Note: The minute you save the record and the form flashes, the `newValue` automatically becomes the new `oldValue` for subsequent changes).*
  3. `newValue`: The value of the control field after the change.
  4. `isLoading`: A Boolean indicating `true` if the change is occurring because the form is loading. When you click "New" to create a record, the form actually loads blank and then changes fields to their default values. You usually don't want the script to run here, handled by: `if (isLoading || newValue === '') return;`
  5. `isTemplate`: A Boolean indicating `true` if the change occurred due to a Template being applied (e.g., an agent applying a "Major Incident" template that populates all sorts of fields at once).

### 4. onCellEdit()
- **When it runs**: Executes when a field value is modified directly from a list view (inline editing), rather than inside the form. Users can double-click a field in a list to change multiple rows at once.
- **Use Case**: Enforcing rules for list edits. For example, a lab in this course prevents users from changing an incident state from "New" or "In Progress" directly to "Resolved" or "Closed" from a list, because they need to fill out resolution codes and descriptions on the actual form.
- **Function**: Passes several arguments to the `onCellEdit(sysIDs, table, oldValue, newValue, callback)` function:
  - `sysIDs`: The sys_id(s) of the edited item(s) in the list.
  - `table`: The table name of the edited list.
  - `oldValue` & `newValue`.
  - `callback`: A callback function that *must* be executed at the end of the script (e.g., `callback(saveAndClose);`) to continue the execution of other cell edit scripts or accept the change.

---

## Catalog Client Scripts

Catalog Client Scripts require a different underlying table because the Service Catalog structure relies on Catalog Items and Variables rather than standard Tables and Fields.
- **Applies To**: Can be applied to a specific **Catalog Item** (e.g., Service Catalog Request, iPhone 16, external monitor) or a **Variable** (a question that might be part of a variable set shared across many items).
- **Supported Types**: Supports `onLoad`, `onSubmit`, and `onChange`.
- **Not Supported**: `onCellEdit` is not supported for Catalog Client Scripts.
- **Example Use Case**: An `onChange` script on a "Department or Group" radio button variable. If the user selects "Department" (where `newValue == 'department'`), the script uses `g_form.setValue('department', g_user.getDepartmentID())` to automatically fill in their department. If not, it leaves it blank.

---

## Client-Side APIs

ServiceNow provides predefined client-side classes and methods to control platform appearance and behavior in the web browser. The full list of APIs is available on the Developer Portal (developer.servicenow.com under Reference > Client), which provides detailed explanations, parameters, returns, and helpful code snippets for every method.

### 1. GlideForm (`g_form`)
Provides methods to customize the form, manage fields, and modify their data.

**Field Names vs. Labels:**
Always use the backend field name, not the UI label. You can find this by right-clicking the field label and selecting "Show [field_name]" (e.g., the label is `Caller` but the name is `caller_id`, which references the `sys_user` table). You can also view this in the table's dictionary columns.

**Common Methods:**
- **Form Messages:**
  - `g_form.addInfoMessage('message')`: Adds a blue informational message at the top of the form. Can be closed by clicking the X.
  - `g_form.addErrorMessage('message')`: Adds a red error message at the top. The error must be resolved before the user can save or submit.
- **Field Messages:**
  - `g_form.showFieldMessage('field_name', 'message', 'type')`: Displays a message directly underneath a specific field to help guide the user. Types can be `info` (blue), `error` (red), or `warning`.
- **Getting Values (`g_form.getValue`)**:
  - Retrieves a field value, but you must pay strict attention to data types!
  - **String fields**: Returns the exact string (e.g., `getValue('number')` returns the incident number).
  - **Choice lists**: Returns the backend value, not the label. E.g., `getValue('priority')` returns `1`, not `1 - Critical`.
  - **Reference fields**: Returns the 32-character alphanumeric `sys_id` stored in the database, not the display value (e.g., returns a `sys_id` instead of `Joe Employee`).
- **Other Methods**:
  - `g_form.setValue('field', 'value')` / `g_form.clearValue('field')`
  - `g_form.addOption()` / `g_form.clearOptions()` (e.g., giving an ITIL admin additional impact choices)
  - `g_form.flash()` (flashes a color on a field to draw attention)
  - `g_form.getSectionNames()` (get form information in sections)

### 2. GlideUser (`g_user`)
Provides properties and methods to access information about the currently logged-in user.

**Properties:**
- `g_user.firstName`
- `g_user.lastName`
- `g_user.userName`
- `g_user.userID`

**Common Methods:**
- `g_user.getFullName()`
- `g_user.hasRole('role_name')`: Returns `true` if the user has the specified role **OR** if they have the `admin` role.
- `g_user.hasRoleExactly('role_name')`: Returns `true` **only** if the logged-in user possesses that specific role, explicitly ignoring the `admin` override.
- *Example usage*: `alert("Good morning, " + g_user.firstName);` or `alert("Logged in user: " + g_user.userName);`

---

## Client-Side Debugging Strategies

When Client Scripts don't work as expected (e.g., a simple typo completely throws it off), utilize these debugging strategies:

1. **Form Messages (`addInfoMessage` / `addErrorMessage`)**:
   - *Pros*: Very convenient; output variables directly onto the form you are testing. Since they are not restricted to field values, you can write any debugging information.
   - *Cons*: Other users (colleagues, customers) working in the same shared dev, QA, or test environment will see these messages. You *must* remember to remove these statements before migrating to Production.
2. **Response Time Indicator**:
   - A small stopwatch icon located at the bottom right of forms, enabled by default via the system property `glide.ui.response_time` (can be set to false to hide).
   - Clicking it reveals times in milliseconds for Network, Server, and Browser.
   - Crucially, it displays the specific execution load times for every individual UI Policy and Client Script On Load, helping you identify exactly which script is causing a form to take longer than expected to load.
3. **Try/Catch Blocks**:
   - Standard JavaScript `try { ... } catch(err) { ... }` blocks used to trap unexpected runtime errors. If an error occurs, you can handle it gracefully. Example: `try { g_form.addInfoMessage("The value of caller_id is " + g_form.getValue('caller_id')); } catch(err) {}`
4. **Third-Party / Browser Tools**:
   - Using the developer console (e.g., in Chrome) to run JavaScript debugging tools and track client-side execution.

---

## Versioning & Course Labs

When managing scripts, you can compare different versions of your scripts and revert to a previous version if needed. 

**Module Labs:**
- **Lab 2.1.1**: Build two simple client scripts focusing on the top portion of the form, utilizing standard JavaScript `alert()` and `confirm()` functions.
- **Lab 2.2.1**: Add on to the basics by creating a script that uses ServiceNow's `GlideForm` and `GlideUser` APIs to introduce new functionality.
- **Lab 2.3.1**: Practice applying the various debugging capabilities covered in the module.
