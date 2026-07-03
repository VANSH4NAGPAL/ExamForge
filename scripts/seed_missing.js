const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const rawText = `
Q468 What enables you to trace the connection from an infrastructure item, like a Server, to the Services that are
dependent on that Server?
A. Service Tracer
B. Automapping Utility
C. Transform Map
D. Relationships
Answer: D
Explanation:
- Relationships are the direct links that define how different parts of an IT setup connect and rely on each
other. This lets you follow the connections from a server to the services it supports. For example, a server can
"host" an application, showing that the application depends on that server.

Q469
What does ServiceNow recommend as a best practice regarding data imports?
A. Monitor data quality and clean imported data, using the Data Scrub Workspace.
B. Plan time before your import to remove obsolete or inaccurate data.
C. Adjust your Transform maps, after the data is loaded into the target table.
D. Create a new Import set table for each new data load.
E. Use extremely large Import Sets, instead of multiple large Import Sets.
Answer: B
Explanation:
- The correct answer is **B. Plan time before your import to remove obsolete or inaccurate data.**

Q470
In what order are Access Controls evaluated?
A. Table-level - most specific to most general; then Field-level - most specific to most general
B. Table-level - most specific to most general; then Row-level - most specific to most general
C. Field-level - most general to most specific; then Row-level - most specific to most general
D. Field-level - most specific to most general; then Table-level - most specific to most general
Answer: A
Explanation:
A. Table-level – most specific to most general; then Field-level – most specific to most general.

Q471
An Administrator wants to remove privileged users who have never accessed the platform.
Which Security Center section is checked for these users?
A. Security metrics
B. Security posture dashboard
C. Security scanner
D. Security hardening
Answer: B
Explanation:
B. Security posture dashboard
Correct. The Security posture dashboard provides visibility into user activity, access patterns, and privilege
usage, helping administrators identify privileged users who have never accessed the platform.

Q472
Choose 2 options.
Which events are used for monitoring and logging in the the Security Center?
A. Failed login
B. Table creation
C. Impersonation
D. User deletion
Answer: A,C
Explanation:
A. Failed login Correct.
C. Impersonation Correct.

Q473
Where can Administrators check the release being used within a ServiceNow instance?
A. Memory Stats module
B. Transactions log
C. Stats module
D. System.upgraded table
Answer: D
Explanation:
D. System.upgraded table
Correct. The system.upgraded table stores records of platform upgrades and identifies the ServiceNow
release currently running in the instance.

Q474
An Administrator wants to remove privileged users who have never accessed the platform.
Which Security Center section is checked for these users?
A. Security metrics
B. Security posture dashboard
C. Security scanner
D. Security hardening
Answer: B
Explanation:
B. Security posture dashboard
Correct. The Security posture dashboard gives visibility into user activity, privilege usage, and access history,
allowing administrators to identify privileged users who have never logged into the platform.

Q475
Which feature automates business logic like approvals, tasks, notifications, and record operations for an
application or process?
A. Flows and Subflows
B. Action Sequences
C. Flow Diagrams
D. Task Flows
Answer: A
Explanation:
A. Flows and Subflows Correct.
Flows (including subflows) are Salesforce’s primary automation tool for implementing business logic such as
approvals, tasks, notifications, and record operations across applications and processes.

Q476
A customer wants to implement a phone ordering mechanism for employees that triggers a notification for the
requester and approver at each approval level.
Which feature is used to achieve this?
A. Flows and Subflows
B. Parent-Child Approvers
C. Approver Delegates
D. Approval Criteria
Answer: D
Explanation:
D. Approval Criteria Correct.
Approval criteria define when and how records enter an approval process, and within an approval process,
notifications are automatically triggered at each approval step for both requester and approvers.

Q477
Choose 4 options.
What are the options that can be set to determine when a Business Rule executes?
A. Change
B. Submit
C. Async
D. After
E. Load
F. Display
G. Before
Answer: C,D,F,G
Explanation:
C. Async Correct.
D. After Correct.
F. Display Correct.
G. Before Correct.

Q478
What is the difference between a Client Script and a Business Rule?
A. A Client Script executes on the client, and a Business Rule executes on the server
B. A Client Script executes before a record is loaded and a Business Rule executes after a record is loaded
C. A Client Script executes on the server, and a Business Rule executes on the client
D. A Client Script executes before a record is loaded and a Business Rule executes after a record is updated
Answer: A
Explanation:
A. A Client Script executes on the client, and a Business Rule executes on the server Correct.

Q479
Which feature allows users to browse internal IT documentation, like troubleshooting scripts and frequently asked
questions?
A. Stack Overflow
B. ServiceNow Wiki
C. Knowledge
D. SharePoint
Answer: C
Explanation:
C. Knowledge Correct.
The Knowledge feature in ServiceNow allows users to create, manage, and browse internal IT documentation
such as troubleshooting guides, FAQs, and how-to articles.

Q480
Who does the 'data controller' refer to in the Shared Responsibility Model?
A. ServiceNow
B. Datacenter partners
C. Customer
Answer: C
Explanation:
C. Customer Correct.
The customer is the data controller, as they determine what data is collected, how it is used, and how it is
managed within the platform.

Q481
Choose 2 options.
Which role(s) are required to impersonate a user?
A. security_admin
B. sys_user
C. sys_admin
D. impersonator
E. admin
Answer: D,E
Explanation:
D. impersonator Correct.
The impersonator role explicitly grants permission to impersonate other users.
E. admin Correct.
The admin role includes the ability to impersonate users by default

Q482
Choose 3 options.
Tables may have a One to Many relationship. From the Service Catalog, what are examples of tables having a one
to many relationships?
A. One Requested Item can have many Catalog Tasks
B. One Cart can have many Requests
C. One Approval can have many Requests
D. One Requested Item can have many Approvals
E. One Request can have many Requested Items
Answer: A,D,E
Explanation:
A. One Requested Item can have many Catalog Tasks Correct.
D. One Requested Item can have many Approvals Correct.
E. One Request can have many Requested Items Correct.
`;

async function main() {
    const exam = await prisma.exam.findUnique({ where: { slug: 'servicenow-csa-premium' } });
    if (!exam) {
        console.error('Premium exam not found!');
        return;
    }

    const blocks = rawText.trim().split(/\n\nQ/);
    
    let count = 0;
    for (let block of blocks) {
        if (!block.startsWith('Q')) {
            block = 'Q' + block; // restore the Q that was split
        }
        
        const lines = block.split('\n').map(l => l.trim()).filter(l => l);
        const qNumberStr = lines[0].split(' ')[0]; // Q468
        
        let questionTextLines = [];
        let i = 0;
        
        // Sometimes the first line is "Q469" alone, sometimes "Q468 What enables..."
        if (lines[0] === qNumberStr) {
            i = 1;
        } else {
            questionTextLines.push(lines[0].substring(qNumberStr.length).trim());
            i = 1;
        }
        
        while (i < lines.length && !lines[i].match(/^[A-G]\./)) {
            questionTextLines.push(lines[i]);
            i++;
        }
        
        const questionText = questionTextLines.join(' ');
        
        const options = {};
        while (i < lines.length && lines[i].match(/^[A-G]\./)) {
            const letter = lines[i][0];
            options[letter] = lines[i].substring(2).trim();
            i++;
        }
        
        let correctAnswer = '';
        if (i < lines.length && lines[i].startsWith('Answer:')) {
            correctAnswer = lines[i].substring(7).trim();
            i++;
        }
        
        let explanationLines = [];
        if (i < lines.length && lines[i].startsWith('Explanation:')) {
            i++;
            while (i < lines.length) {
                explanationLines.push(lines[i]);
                i++;
            }
        }
        const explanation = explanationLines.join(' ');

        await prisma.question.create({
            data: {
                examId: exam.id,
                qNumber: qNumberStr,
                section: "CSA Premium Bank",
                questionText,
                optionA: options['A'] || null,
                optionB: options['B'] || null,
                optionC: options['C'] || null,
                optionD: options['D'] || null,
                optionE: options['E'] || null,
                optionF: options['F'] || null,
                correctAnswer: correctAnswer.replace(/,/g, ', '), // A,B -> A, B
                explanation: explanation || 'See official documentation.'
            }
        });
        count++;
        console.log(`Inserted ${qNumberStr}`);
    }
    
    console.log(`Successfully inserted ${count} missing questions!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
