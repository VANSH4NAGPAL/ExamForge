---
title: "Script Includes & GlideAjax"
icon: "FileCode"
---

# Script Includes & GlideAjax

A **Script Include** stores reusable JavaScript for execution on the server. They are fundamentally records on a table that allow us to store a function or an entire class that we can call from anywhere server-side JavaScript is acceptable. 

**"Write once, use many."** If you find yourself writing a function over and over (e.g., calculating seconds in a day), you can write it once in a Script Include and call it whenever needed.

Unlike Business Rules, Script Includes do not have complicated triggers (no table or condition builder). They only run when we ask them to. Consequently, **there is no access to the `current` or `previous` objects** automatically, because they are not tied to a specific table event. If we want to access fields on a particular record, we have to utilize other strategies, like GlideRecord or passing values in.

---

## 3 Types of Script Includes

When you name your Script Include, the name of your function or class in the script **must exactly match** the name you provide in the Script Include form's "Name" field.

### 1. Classless (On-Demand) Functions
Used when you just want a single, reusable function that does one thing really well (like a "masterless samurai"), instead of defining a whole class.
- **Configuration**: ServiceNow assumes you are writing a custom class, so it provides template code in the script field. You must politely decline and erase it all by hand, then define your standard `function name(...) { ... }` block. 
- **Usage**: You cannot make this client-callable. Once active, it can be called from anywhere server-side JavaScript is accepted (Business Rules, Advanced Reference Qualifiers, Events, Notifications).
- **Example**: Creating a server-side equivalent of `g_user.hasRoleExactly()`. You write a `hasRoleExactly()` function in a classless script include. When you call it from a Business Rule, the name magically becomes **bold and italicized**, which you can right-click!
- *(Lab References: Lab 7.1.1A creates a logging method that loops through all properties of a record using bracket notation. Lab 7.1.1B creates a server-side `hasRoleExactly` method).*

### 2. Defining an Entire Class (Utils)
This is the default template ServiceNow provides. It is used to store multiple related functions together (often referred to as a "library" or suite of functionality). You will notice that ServiceNow commonly names these `SomethingUtils` (e.g., `UserProfileUtils`).
- **Properties & Methods**: You define properties inside your class separated by commas. Usually, properties are mapped to function calls (methods). E.g. `getUserFullName: function() { ... },`
- **The `initialize` Function**: This method runs automatically the moment an object of this class is instantiated (i.e. the moment you call it). It is a great place to fetch a record *once*. For example, querying the user record and saving it to `this.userRecord`. Then, all subsequent methods in your class can use `this.userRecord` without having to query the database again. The `this` keyword makes the value reusable throughout all properties of the class.
- **Example Use Case**: Injecting JavaScript into an Advanced Reference Qualifier. E.g., filtering a 'Printers' reference field dynamically based on a user's role. You would use `javascript:new LocationsByRole().forCMDB()` to instantiate your class and call a method to return an encoded query string. *(Lab 7.2.1 covers this real-world scenario).*

### 3. Extending an Existing Class
You can extend an existing class using `Object.extendsObject`. This allows you to inherit all the functionality of a base class and add new functions to it, without modifying the original.
- **Why?** Upgradability! ServiceNow provides some script includes ending in `SNC` that are sacred/sacrosanct. You extend them so you can safely create customizations without risking your code getting skipped on upgrade and without destroying functionality that already works. (E.g. LDAP Utils, Catalog classes).
- **The Most Common Extension**: The `AbstractAjaxProcessor` class.

---

## GlideAjax (Client-Callable Script Includes)

While Script Includes execute server-side, they can be made available to client-side scripts (like Client Scripts and UI Policies) via asynchronous calls using **GlideAjax** (Asynchronous JavaScript and XML). 

This is the best of both worlds: it gives you the instantaneous UI reaction of client scripts combined with the database-traversing, server-side exhaustive knowledge of GlideRecord (something that is extremely expensive or impossible to do on the client alone).

### Server-Side Setup
1. Check the **Client Callable** (or *Glide AJAX enabled*) checkbox on the form. This also automatically creates an ACL (e.g., granting access to the `admin` role).
2. The Script Include **must** extend the `AbstractAjaxProcessor` class:
   ```javascript
   var HelloWorld = Class.create();
   HelloWorld.prototype = Object.extendsObject(AbstractAjaxProcessor, { ...
   ```
3. Inside your method, you read parameters passed by the client using **`this.getParameter('sysparm_name')`**. Note that all custom parameters must start with the prefix `sysparm_`.
4. The method processes data (like dot-walking a CI record to find the support group email) and `returns` a value.

### Client-Side Setup (The GlideAjax Recipe)
To call that Script Include from the client, you must follow this specific asynchronous workflow:

1. **Instantiate**: `var gaDesc = new GlideAjax('HelloWorld');` (Creates an object of the GlideAjax class and selects the Script Include).
2. **Select Method**: `gaDesc.addParam('sysparm_name', 'alertGreeting');` (`sysparm_name` is a **reserved** parameter. It specifically tells the server which method inside the class to run).
3. **Pass Custom Variables**: `gaDesc.addParam('sysparm_user_name', 'Ruth');` (Passes any arguments the server is expecting. You can dynamically pass field values using `g_form.getValue('field')`).
4. **Execute Callback**: `gaDesc.getXML(HelloWorldParse);` (Sends the request to the server asynchronously and names the callback function that will handle the response).

### The Callback Function
When the server finishes, it sends an XML payload back to the client. The callback function snips out the specific attribute called `"answer"` from that XML hierarchy.
```javascript
function HelloWorldParse(response) {
    // Treat this exact syntax as sacred/inviolate:
    var answerFromXML = response.responseXML.documentElement.getAttribute("answer");
    
    // Now you can do something with the answer (e.g. g_form.showFieldMsg())
}
```

---

## Returning Multiple Values

### The Delimiter Trick
If you need to return exactly two values from the server (e.g. a support group's email and manager's phone number), you can concatenate them on the server using a delimiter like a colon (`email + ':' + phone`). When the client receives the answer, it uses `answerFromXML.split(':')` to create a JavaScript array (e.g., `[email, phone]`), allowing you to place them dynamically beneath fields using `g_form.showFieldMsg()`.

### JSON (JavaScript Object Notation)
If you need to return complex data structures—like an entire list of Incident records, where you need the Number, Priority, and Short Description for *each* record—the delimiter trick will not cut it. 

Instead, you use **JSON**. JSON is a low-overhead data exchange format alternative to XML. The response still comes back in an XML payload, but the `answer` attribute is now formatted as a JSON array of objects (a "data sandwich"). 

For example, your answer might look like:
```json
[
  {"number": "INC14", "priority": 2, "short_description": "Missing my home directory"},
  {"number": "INC16", "priority": 4, "short_description": "Rain is linking on main DNS"}
]
```
The client script can easily parse this string natively into a JavaScript array of objects, and you can loop through it without writing messy parsing or delimiter logic.

*(Lab References: Lab 7.3.1 covers a simple Hello World GlideAjax. Lab 7.3.2 returns the number of group members. Lab 7.4.1 builds directly on 7.3.2, so do not skip it!)*
