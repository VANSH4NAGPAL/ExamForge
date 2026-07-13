---
title: "GlideSystem API"
icon: "Code"
---

# GlideSystem API (`gs`)

The **GlideSystem** Application Programming Interface (API) is the "kitchen sink" or potpourri class of useful **server-side** JavaScript in ServiceNow. 

It can be used anywhere server-side JavaScript is accepted in the platform, not just in Business Rules (e.g., UI Actions, Script Includes). *Note: In Lab 5.1.1 and 5.1.2, you will get practice adding GlideSystem methods to a UI Action.*

---

## Accessing User Information

GlideSystem provides server-side equivalents to the client-side `g_user` class to get information about the currently logged-in user.

- **`gs.getUser()`**: Returns the complete user object. You can concatenate additional utility functions to it (e.g., `gs.getUser().`). *Tip: Search the Business Rule table for `contains gs.getUser().` to see real-world examples.*
- **`gs.getUserID()`**: Returns the 32-character Sys ID of the currently logged-in user.
- **`gs.getUserName()`**: Returns the login name the user uses to log in.
- **`gs.getUserDisplayName()`**: Returns a human-friendly concatenation of the user's first and last name, saving you from making two separate calls and gluing them together.
- **`gs.hasRole('role_name')`**: Checks if the logged-in user has a specific role (e.g., `gs.hasRole('itil')`).

*Mnemonic Example from the slides:* You can test these methods by wrapping them in a server-side message, e.g., `if (gs.hasRole('itil')) { gs.addInfoMessage(gs.getUserDisplayName()); }`

---

## Form and System Methods

GlideSystem contains miscellaneous system methods for dealing with forms, tables, properties, and logs.

### Messaging
- **`gs.addInfoMessage('msg')`** / **`gs.addErrorMessage('msg')`**: Writes an info or error message to the top of the form, just like `GlideForm` does on the client-side.

### Data Validation
- **`gs.nil(value)`**: ServiceNow's specialized method for checking if a value is empty or null. 
  - *Example*: `gs.nil(current.location)`.
  - *Why use this instead of standard JavaScript `nil`?* Because `gs.nil()` is tailored to handle ServiceNow's underlying database data types slightly differently and more gracefully than plain vanilla JavaScript.

### System Data & Properties
- **`gs.getProperty('property_name')`**: Retrieves the value of a system property from the `sys_properties` table. 
  - *Example*: `gs.getProperty('glide.email.test.user')`. Can be used to find out what goes in the "From" field of inbound emails (e.g., retrieving "IT Service Desk").
- **`gs.eventQueue()`**: Fires a system event, commonly used to trigger email notifications.
- **`gs.getDisplayColumn()`**: Figures out a table's display column when a record from that table is stored in a reference field.
- **`gs.getPreference('preference_name')`**: Retrieves a user's preference setting from the User Preferences table.

---

## Server-Side Syntax & Concepts

"Everything in ServiceNow is a record in a table, and every record in ServiceNow is a JavaScript object." 

- **The `current` object**: When in a business rule, you access the current record via the `current` object, and every field is a property. Example: `current.location`.
- **Assignment without `.setValue()`**: You don't always need to use `.setValue()`. Server-side, you can use the standard JavaScript assignment operator (single equals). Example: `current.u_last_date = '';` (zeros out the field).
- **Dot-walking**: You can walk to related records. Example: `current.caller_id.location` fetches the location of the caller.
- **Aborting Transactions**: To reject a record update before it goes to the database, use:
  ```javascript
  current.setAbortAction(true);
  ```

---

## Working with Dates and Times

Working with dates and times is a common head-scratcher. ServiceNow provides tailored methods and classes for this.

### GlideSystem Date Methods
- **`gs.beginningOfLastWeek()`**: Calculates the date/time of the beginning of last week (presumes GMT/UTC time zone).
- **`gs.minutesAgo()`**, **`gs.quartersAgo()`**: Perform basic arithmetic to figure out how old something is.
- **`gs.dateDiff(date1, date2, returnNumeric)`**: Calculates the length of time between two dates. 
  - *Tip*: If you pass `true` as the third argument, it returns the value as an integer rather than a date string, allowing for basic arithmetic (e.g., `< 0`).

*Example of Server-Side Date Validation:*
```javascript
// Validate that the lastDay doesn't come before the firstDay (hire date)
if (firstDay && lastDay) {
    if (gs.dateDiff(firstDay, lastDay, true) < 0) {
        gs.addErrorMessage('lastDay worked must be after the hire date');
        current.u_last_date = ''; // Zero out the invalid value
        current.setAbortAction(true); // Reject the database update
    }
}
```

### GlideDate & GlideDateTime Classes
Always prefer these classes over plain vanilla JavaScript date objects, as they play nice with ServiceNow's database data types.
- **`var gDate = new GlideDate();`**: Creates a date object for today without regard for the timestamp. You can use `gDate.setValue('YYYY-MM-DD');` with an integer-based string format to set it.
- **`var gDT = new GlideDateTime();`**: Creates an object with today's date AND the exact current timestamp ("right meow").
- *Note:* You can pass a `GlideDate` object into a `GlideDateTime` constructor (e.g., `new GlideDateTime(gDate)`). This adds the dimension of a timestamp, defaulting it to midnight (all zeros).

---

## Scoped vs. Global GlideSystem (Logging)

When developing applications in ServiceNow, you are working either in a Global scope or a Private Application Scope.

- **`gs.log('msg')`**: This method ONLY works in global scope. It writes to the system log without regard for the severity level. If you try to use it in a privately scoped application, ServiceNow throws an error: "Use gs.debug or gs.info instead."
- **Scoped Logging**: These methods have scoped "twins" that assign a level of severity:
  - `gs.info()`
  - `gs.warn()`
  - `gs.error()`
  - `gs.debug()`

*Best Practice*: Develop the habit of always using `gs.info()` instead of `gs.log()`, even in global scope. This way, your logging code will always be successful regardless of which scope you are working in.

---

## Error Handling

Use JavaScript `try/catch` blocks to gracefully handle runtime errors and aid in debugging.

*Example:* Catching a typo in a method name.
```javascript
try {
    if (current.description.nil()) {
        // Typo: setValuv instead of setValue
        current.short_description.setValuv(current.description);
    }
} catch (e) {
    // Catches the typo and logs: "cannot find function setValuv without the letter E in our object"
    gs.error(e);
}
```

---

## Scripting Assistance Tip

ServiceNow's built-in Syntax Editor is context-aware and will not set you up to fail. 
- In a server-side JavaScript field, it will **not** suggest client-side classes like `g_form` or `g_user`. 
- Conversely, in a client-side script, it will act like `GlideSystem` (`gs.`) does not exist. 
Always pay attention to the scripting assistance to gain intuition about whether you are in a client or server environment!
