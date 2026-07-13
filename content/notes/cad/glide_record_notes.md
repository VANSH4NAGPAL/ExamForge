---
title: "GlideRecord & GlideQuery"
icon: "Database"
---

# GlideRecord & GlideQuery

The **GlideRecord** API is the primary tool used in ServiceNow for database operations (Create, Read, Update, Delete - CRUD). It contains both records and fields, and any row from any table can become a GlideRecord. GlideRecord executes on the server side. 

*(Note: While it can technically be called from the client side, doing so is heavily discouraged and should be avoided due to severe performance impacts).*

---

## 4 Steps to a GlideRecord Query

Creating your GlideRecord queries is very simple, and follows four distinct steps:

### 1. Create the Object
Instantiate the GlideRecord object and pass the name of the table as the single parameter. If you're familiar with SQL, this is basically saying `SELECT * FROM table_name`.
```javascript
var gr = new GlideRecord('change_request');
```

### 2. Add Query Conditions
Build your query conditions (the `WHERE` clause in SQL) using the `addQuery` method. The `addQuery` continues building the SQL statement behind the scenes (which you never see).
- **Syntax**: `gr.addQuery('field_name', 'operator', 'value');`
- **Operators**: `=`, `!=`, `>`, `>=`, `<`, `<=`, `STARTSWITH`, `ENDSWITH`. 
- **Implicit Equality**: If you do not include an operator between the field and the value, the system assumes you want to test for equality (`=`). 
  - `gr.addQuery('category', 'Hardware');` means the exact same thing as `gr.addQuery('category', '=', 'Hardware');`.
- **Strings**: If you choose to use string values for operators, they **must be in all capital letters**. Example: `gr.addQuery('work_notes', 'CONTAINS', 'Fixed');`.
- **Types**: Always wrap field names and string values in quotes. For integers, like checking if priority is 1, do not wrap the number 1 in quotes: `gr.addQuery('priority', '!=', 1);`.

**AND / OR Conditions**:
- Secondary `addQuery` statements automatically act as an **AND** condition.
- You can use the **`addOrCondition`** method to create an **OR** statement relative to the previous query (e.g., `gr.addOrCondition('priority', '!=', 1);`).
- **Grouping**: You can combine your ANDs and ORs to create "groups." For example, finding records where state is less than 3 OR greater than 5, AND where priority is 1 OR impact is 1.

### 3. Execute the Query
This is the **most important step** of writing your GlideRecord. If you forget the `query()` method, nothing goes out to the database and nothing gets returned. 
```javascript
gr.query();
```
When you run this method, it will return 0 or more records from the table, and each record is returned as a GlideRecord object.

### 4. Process the Records
Once the records are returned, you process through them using a looping or condition statement:
- **`next()`**: Moves to the next record in your GlideRecord object.
  - Use `while (gr.next()) { ... }` to iterate through *all* returned records.
  - Use `if (gr.next()) { ... }` to only process the *first* returned record.
- **`hasNext()`**: Returns `true` if a next record simply exists, but it **does not load the record** or loop through the records.
  - *DANGER*: **Never** use `while (gr.hasNext())`! Because it does not load the next record or move forward, using `hasNext()` inside a while loop will cause an **infinite loop**. Only use it inside an `if` statement when you just need to know if a record exists but don't need its data.

---

## Modifying Records (Update, Insert, Delete)

- **`gr.update()`**: Saves changes to the record in your GlideRecord. If the record does not exist in the database, the `update()` method will actually *insert* it into the table.
- You can query and modify records on **another table**. For example, from a Business Rule on the `problem` table, you can instantiate a new GlideRecord on the `incident` table, get those records, and update them.

---

## Shortcuts and Advanced Queries

### The `get()` Method
A shortcut method used to query and return a specified record in the instantiated GlideRecord object. 
- `gr.get('sys_id')`: If you enter only one parameter, it assumes you are searching for the Sys ID or display value.
- `gr.get('column_name', 'value')`: If you provide two parameters, the first is the column name to search, and the second is the value.

### Encoded Queries
For complex queries (especially those involving dates or items from reference fields), you can use the **`addEncodedQuery('string')`** method. It passes all query WHERE clauses as a single argument and is the best option when you are absolutely in a hurry.
- *Tip*: You do not need to write these manually! Go to the list view of any table, build your query using the Condition Builder, right-click the breadcrumb, select **"Copy Query"**, and paste it directly into your script inside quotes!

---

## Counting Records (Performance Warning)

If you need to know how many rows were returned, you have two options:
1. **`getRowCount()`**: Requires a lot less code to write, but it retrieves the rows one-by-one to increment a counter. This has a **significantly larger performance impact** and is not recommended for tables with large amounts of data.
2. **`GlideAggregate`**: This requires more work as a developer, but results in **faster execution**. You should absolutely use this method when returning more than 100 records and for tables that grow continuously. *If in doubt, definitely use GlideAggregate!*

---

## GlideRecordSecure

**GlideRecordSecure** inherits from GlideRecord and performs the same functions, but it also **enforces Access Controls (ACLs)**.
- If a user doesn't have read access, a null value gets created in memory. You do not have to manually check for read access; the `next()` method simply moves to the next record.
- The `canCreate` method on columns is replaced with `canWrite`. If it returns false, the column value is set to null when writing to the database, preventing unauthorized writes.
- *Warning*: Using GlideRecordSecure means checks must be performed every time data is queried, and this strategy is **not considered best practice**. While it restricts data, fully restricting data properly requires the use of GlideSystem methods in conjunction with queries. 

---

## GlideQuery (The Modern Alternative)

**GlideQuery** is the latest technology for working with data. It proposes an additional layer on top of GlideRecord to reduce errors and make usage clearer and easier. It is written in 100% JavaScript and uses GlideRecord behind the scenes. It can be used in both scoped and global server-side scripts.

GlideQuery was built on three core principles:

### 1. Fail Fast
Queries should run into errors as soon as possible and offer a quick feedback loop.
- **Field Checking**: If a field does not exist, it throws an error: "field is not known". (GlideRecord would run silently and fail).
- **Choice Checking**: If you pass an invalid choice value, it throws a "NiceError" showing the invalid choice and listing the allowed values. 
- **Type Checking**: If you pass a string where it expects an integer, it fails immediately. (GlideRecord would just silently return nothing).

### 2. Be JavaScript
It was designed to behave like a standard JavaScript library. 
- With GlideRecord, you often get confusing Java objects (e.g., `first_name` acts like a Java object, or `GlideAggregate` returns a String). GlideQuery solves this by returning a true JavaScript object where the key is the field name and the value is the actual JavaScript value (e.g., returning proper Numbers).
- It replaces confusing Java stack trace errors with a **NiceError** that provides the problem (e.g., unknown field) and a possible solution (e.g., known fields). The raw Java stack trace is still available to view if needed.

### 3. Be Expressive (Do more with less code)
Reading data uses two primary classes:
- **`stream`**: Used when reading multiple records (e.g. using `.select()`). It returns a stream object (similar to a JS array). You can use `.forEach()` to loop through records and `.limit()` to restrict results.
- **`optional`**: Used for a single record (e.g. using `.selectOne()`). You then use `.get()` to display the single record. `selectOne` is much more efficient than `select` if you only need one record or just want to test if a record exists.
- **CRUD Operations**: You can create (`insert()`), read (`select()`), update (`update()` after a `.where()`), and delete (`deleteMultiple()` based on a `.where()`).

**Performance Note**: GlideQuery has a minor **4% to 6% overhead** due to the conversion from Java to standard JavaScript objects. To reduce performance issues, avoid creating loops over very large numbers of records. However, because its syntax inherently gears you to use efficient code, it often helps you avoid poorly written GlideRecord queries despite the small overhead.

---

## Best Practices
- Use the correct object method based on the scope you are developing in (e.g., scoped APIs for scoped apps).
- Do not forget about GlideQuery as a modern alternative.
- Use `GlideAggregate` instead of `getRowCount` for counting rows.
- Try to do all of your record queries inside server-side scripts.
- When scripting inserts, updates, or deletes, **practice by writing to the logs first** (e.g. `gs.info`) so you do not accidentally modify or delete records you still need, because there is no undo capability!

*(Lab references: You will find 3 labs working with the GlideRecord object, and 1 remaining database requirement lab for Cloud Dimensions using GlideQuery).*
