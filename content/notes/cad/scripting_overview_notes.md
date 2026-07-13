---
title: "SSNF - Scripting Overview"
icon: "BookOpen"
---

# Scripting Overview in ServiceNow

This module covers the foundational concepts of utilizing JavaScript in ServiceNow, exploring the "Five Ws and One H" of scripting: What platform scripting is, When you should (and shouldn't) script, Where these scripts execute, Who can execute them, and How to write them using built-in tools.

---

## 1. The 5 Ws and 1 H of Scripting

### What is Platform Scripting?
Platform scripting is the ability to make changes to your instance. While the **Condition Builder** allows us to create filters and rules via a simple UI, platform scripting involves writing actual **JavaScript** to handle advanced requirements that go beyond the capabilities of the Condition Builder.

### Why Should You NOT Script?
ServiceNow releases family updates twice a year, constantly evolving and adding features. 
- **Upgradability Issues**: Something you custom-scripted in one release might be delivered out-of-the-box in the next. Custom scripts can be difficult to debug and fix after an upgrade.
- **Maintenance Effort**: Always ask: How critical is this script versus the effort to build and maintain it?
- **Alternatives**: Can an Access Control Rule (ACL) or a simple configuration change achieve the same result? **If a no-code solution works, use it!**

### When Should You Script?
- **New Functionality**: When you need to add brand new features to meet a specific requirement.
- **Extend Existing Functionality**: When a feature exists but you need to tweak or tune it slightly.
- **Guide Users**: Using messaging (e.g., "You have not completely filled out this record") to lower the instances of bad data or user errors.
- **Automate Processes**: Replacing human elements with automated scripting logic.
- **Integrations**: Interacting with third-party applications (fetching or supplying data).

### Where Do Scripts Execute?
Scripts are interpreted in one of three primary areas:
1. **Client-Side (Web Browser)**: Executes on the user's laptop (in Chrome, Edge, Firefox, etc.) to modify the UI (e.g., hiding fields, making them mandatory).
2. **Server-Side (ServiceNow Instance)**: Executes in the ServiceNow data center itself. Generally deals with database access (e.g., Business Rules querying, inserting, or modifying records on the Incident table).
3. **MID Server (Remote Component)**: A local component installed in your own data center or cloud region that allows ServiceNow to gather data or perform activities securely behind your firewall.

### Who Can Script?
Scripting is generally restricted to users with administrative functions:
- **System Administrator (`admin`)**: Manages everything. They have the "keys to the kingdom."
- **System Definition Administrator**: Can manage a specific subset of functionality (e.g., only Business Rules or Client Scripts).
- **Application Administrator**: Granted administrative rights *only* for a specific, siloed Application Scope. They cannot touch global system settings.

### How Do You Script?
ServiceNow provides a built-in **Syntax Editor** that acts as an IDE inside the browser. It allows you to script in modern JavaScript (ECMAScript 2021) and provides features to enhance readability and speed up development.

---

## 2. The Syntax Editor: Your Best Friend

The Syntax Editor provides numerous tools to make scripting easier. If you turn it off (via the toggle), you just get raw text with no features (though you can still type a line number to jump to it).

### Code Formatting & Coloring
- **Syntax Coloring**: 
  - **Blue**: Reserved words (e.g., `var`, `if`, `return`).
  - **Teal**: Function and variable names you or others have created.
  - **Red**: Standard text or strings (including table names).
  - **Bold/Italics (Red)**: Context menu items (e.g., right-clicking a table name like `sys_user_grmember`).
  - **Green**: Comments (preceded by `//`).
- **Matching Braces**: Hovering your cursor over a quote, parenthesis, or brace will highlight its matching partner, which is infinitely useful for debugging nested code.
- **Code Formatting**: An icon at the top that automatically indents nested code blocks (like `for` or `if` statements). *This will save your sanity by making your code logically readable.*

### Context-Sensitive Help & References
- **Code Completion (Ctrl + Spacebar)**: Brings up a list of available classes or elements. You can start typing to narrow the list down, then hit Enter to insert it.
- **Method Discovery**: Typing a class name followed by a period (`.`) brings up a list of valid methods for that class.
- **Argument Discovery**: Opening a parenthesis `(` after a function displays the expected parameters/arguments.
- **Local Context**: It even remembers variables you created in the same script! If you declare an object `myObj` with three properties, typing `myObj.` will list those exact three properties.
- **Find References**: You can right-click an element (like a table name) and select "Find References". It will show you a list of every other script (Business Rules, Script Includes, etc.) that uses that table, allowing you to learn from existing examples.

### Powerful Toolbar Tools
- **Comment/Uncomment**: Highlight a block of text (like an English outline of what you want your script to do) and hit this button to instantly turn it into `//` comments. You can also use this to temporarily disable offending code during debugging.
- **Replace vs. Replace All**: 
  - *Replace*: Finds the first instance and asks for confirmation.
  - *Replace All*: Instantly replaces *all* instances in the script without confirmation. (e.g., fixing a typo like `g_from` to `g_form`).
- **Magnifying Glass (Search)**: Supports searching for strings or even Regular Expressions (e.g., searching for all server names starting with "DEV").
- **Full-Screen Editing**: Hides the trigger/configuration section of the form to give you maximum screen real estate for your code.
- **Minimap**: Located in the top right. For massive scripts, it shows a zoomed-out visual representation of the entire script and highlights the specific chunk you are currently viewing.

### Syntax Editor Macros
Macros are "mini-scripts" that act as shortcuts for code structures you write frequently. 
- *Example*: You create an Editor Macro record named "object". You type `object` in the editor, hit **Tab**, and it instantly replaces the word with a full `var objNameHere = { property1: value };` template. 
- You can type `help` and hit Tab to see a list of all available macros.

### Syntax Checker
The Syntax Checker validates your syntax, but **it does not check your logic**. 
- It checks for missing semicolons, incomplete arguments, or misspelled API components. 
- **Yellow Underlines / Orange Circles**: Warnings. It's unsure about something, but will let you save.
- **Red Squiggly Lines**: Hard errors. You cannot even save the script until you fix it.

---

## 3. Application Scopes

Application scoping siloes your application to protect it from outside interference and to protect the rest of the instance from your application.

- **Global Scope**: Everything that doesn't have a private scope. Artifacts here interact freely.
- **Private Scopes**: When you build an app, its tables, scripts, and menus are locked inside a private scope. 
  - By default, external scripts cannot interact with scoped scripts.
  - **The `x_` Prefix**: Every privately scoped artifact is prefixed with `x_`, followed by the vendor prefix (e.g., `cld` for Cloud Dimensions), the app name (e.g., `travel`), and the script name. Example: `x_cld_travel_ExpensesReqBy`.
  - **Cross-Scope Access**: To call a scoped script from the Global scope, you must first explicitly open the permissions on the application level, and then use the full absolute path (`x_cld_...`).

**Temporary Scope Switching:**
If you are working in the Global scope and try to edit a script that belongs to the HR scope, the UI will warn you: *"This record is in scope HR, but you are in scope Global."* You can click a link in the warning message to temporarily switch your scope just for the duration of the edit, putting you back in Global when you leave.

---

## 4. Scripting APIs & ECMAScript

ServiceNow provides both Client and Server APIs to interact with the platform.

### Common Client-Side APIs
- `GlideAjax`: Used to asynchronously move data from the server side back to the client side.
- `GlideForm` (`g_form`): Work with and modify the form UI.
- `GlideList`: Modify a list UI.
- `GlideUser` (`g_user`): Information about the currently logged-in user.
- `spModal`: Used when working with the Service Portal.

### Common Server-Side APIs
- `GlideRecord` / `GlideQuery`: Interface to query, get, and sort data from tables.
- `GlideAggregate`: Used to sum or aggregate data efficiently.
- `GlideDate` / `GlideDateTime`: Date manipulation based on time zones.
- `GlideSystem` (`gs`): Information about the system environment.

### JavaScript Modes
By default, scripts use **ES5 Standards Mode**. However, you can toggle **ECMAScript 2021** on or off directly on the script form (via a slide bar). This allows scoped applications to use modern JavaScript features like `let` declarations and default function parameters. There is also a "Compatibility Mode" mostly used for legacy scripts prior to the Helsinki release.

---

## 5. Scripting Resources & Best Practices

When you need help with an API, your go-to destination should be **developer.servicenow.com**. It contains the exact methods, arguments, and return types for every class. Other excellent resources include the Now Community (where you can ask questions to the ecosphere), ServiceNow User Groups (SNUGs), and standard JavaScript sites like W3Schools or MDN.

### Summary of Good Practices:
1. **Don't Script if You Don't Have To**: Use the Condition Builder whenever possible. It generates highly efficient JavaScript behind the scenes automatically.
2. **Use Macros**: Save time on syntax you use often.
3. **Use Full Screen**: Once your triggers are set, hide the form to focus on code.
4. **Use Private Scopes**: Always use privately scoped apps unless there is a strict business need not to.
5. **Use Developer Docs**: Always refer to `developer.servicenow.com` to verify API syntax.

*(Lab 1.3.1 & 1.3.2 will give you hands-on practice using the Syntax Editor's features and Syntax Checker, while Lab 1.6.1 will explore external scripting help resources).*
