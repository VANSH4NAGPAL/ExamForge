const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const examData = {
  name: "Friend's Exam Questions (PDF)",
  slug: "friend-exam-pdf",
  description: "Questions from the ServiceNow CSA Study Guide PDF based on an actual recent exam.",
};

const questions = [
  {
    qNumber: "Q1",
    section: "Update Sets",
    questionText: "Steps for applying an Update Set to an instance?",
    correctAnswer: "A",
    explanation: "Verify Update Set is Complete → Retrieve on target → Preview → resolve preview problems → Commit.",
    optionA: "Verify Update Set is Complete → Retrieve on target → Preview → resolve preview problems → Commit",
    optionB: "Export XML → Import XML → Commit",
    optionC: "Retrieve on target → Preview → Verify Update Set is Complete → Commit",
    optionD: "Make Default → Export → Import → Preview → Commit"
  },
  {
    qNumber: "Q8",
    section: "Update Sets",
    questionText: "What is the recommendation from ServiceNow about Update Sets?",
    correctAnswer: "A",
    explanation: "Avoid using Default Update Set for moving customizations instance to instance.",
    optionA: "Avoid using Default Update Set for moving customizations instance to instance",
    optionB: "Always use the Default Update Set for all customizations",
    optionC: "Delete the Default Update Set before moving any customizations",
    optionD: "Export the Default Update Set as XML and import it manually"
  },
  {
    qNumber: "Q16",
    section: "Update Sets",
    questionText: "What is the best practice regarding the Default Update Set?",
    correctAnswer: "A",
    explanation: "Don't use Default Update Set for moving customizations between instances.",
    optionA: "Don't use Default Update Set for moving customizations between instances",
    optionB: "Rename it before applying customizations",
    optionC: "Always set it as complete at the end of each day",
    optionD: "Delete it and recreate it weekly"
  },
  {
    qNumber: "Q17",
    section: "Data Management",
    questionText: "What is the app used primarily to load data into ServiceNow?",
    correctAnswer: "A",
    explanation: "System Import Sets is used primarily to load data.",
    optionA: "System Import Sets",
    optionB: "Data Dictionary",
    optionC: "Service Catalog",
    optionD: "Update Sets"
  },
  {
    qNumber: "Q23",
    section: "Data Management",
    questionText: "What is the first step when importing spreadsheet data?",
    correctAnswer: "A",
    explanation: "Load Data.",
    optionA: "Load Data",
    optionB: "Create Transform Map",
    optionC: "Run Transform Map",
    optionD: "Create Target Table"
  },
  {
    qNumber: "Q51",
    section: "Update Sets",
    questionText: "What are the steps to retrieve an Update Set?",
    correctAnswer: "A",
    explanation: "Verify Complete → Retrieve → Preview → Commit.",
    optionA: "Verify Complete → Retrieve → Preview → Commit",
    optionB: "Retrieve → Complete → Preview → Commit",
    optionC: "Preview → Retrieve → Complete → Commit",
    optionD: "Commit → Retrieve → Complete → Preview"
  },
  {
    qNumber: "Q6",
    section: "Service Catalog",
    questionText: "Which of the following are one-to-many table examples from Service Catalog? (Select all that apply)",
    correctAnswer: "A,B,C",
    explanation: "One Request → many Requested Items, One Requested Item → many Approvals, One Requested Item → many Catalog Tasks",
    optionA: "One Request → many Requested Items",
    optionB: "One Requested Item → many Approvals",
    optionC: "One Requested Item → many Catalog Tasks",
    optionD: "One Catalog Task → many Requests",
    optionE: "One Approval → many Requested Items"
  },
  {
    qNumber: "Q9",
    section: "Data Management",
    questionText: "What is the table component holding one record's data piece?",
    correctAnswer: "A",
    explanation: "Field.",
    optionA: "Field",
    optionB: "Column",
    optionC: "Row",
    optionD: "List"
  },
  {
    qNumber: "Q15",
    section: "CMDB",
    questionText: "What are the three key tables in an enterprise CMDB? (Select all that apply)",
    correctAnswer: "A,B,C",
    explanation: "cmdb, cmdb_rel_ci, cmdb_ci",
    optionA: "cmdb",
    optionB: "cmdb_rel_ci",
    optionC: "cmdb_ci",
    optionD: "cmdb_assets",
    optionE: "cmdb_inventory"
  },
  {
    qNumber: "Q24",
    section: "Data Management",
    questionText: "What is a classic many-to-many relationship example?",
    correctAnswer: "A",
    explanation: "Vendors sell multiple products; products sold by multiple vendors.",
    optionA: "Vendors sell multiple products; products sold by multiple vendors",
    optionB: "One Incident has one Caller",
    optionC: "One Problem has many Incidents",
    optionD: "One Request has many Requested Items"
  },
  {
    qNumber: "Q26",
    section: "Data Management",
    questionText: "What is the difference between a Base Class table and a Parent Class table?",
    correctAnswer: "A",
    explanation: "Base Class: not extended from another table. Parent Class: may be extended by other tables.",
    optionA: "Base Class: not extended from another table. Parent Class: may be extended by other tables",
    optionB: "Base Class: extended by other tables. Parent Class: not extended by other tables",
    optionC: "Base Class: contains all CI records. Parent Class: contains only non-CI records",
    optionD: "They are the exact same concept with different names"
  },
  {
    qNumber: "Q27",
    section: "CMDB",
    questionText: "Which products are used to track eCommerce infra components? (Select all that apply)",
    correctAnswer: "A,B,C",
    explanation: "Discovery, CMDB, Service Mapping",
    optionA: "Discovery",
    optionB: "CMDB",
    optionC: "Service Mapping",
    optionD: "ITSM",
    optionE: "Service Catalog"
  },
  {
    qNumber: "Q29",
    section: "Data Management",
    questionText: "What is the relationship between Incident and Task tables?",
    correctAnswer: "A",
    explanation: "Incident table is extended from Task table.",
    optionA: "Incident table is extended from Task table",
    optionB: "Task table is extended from Incident table",
    optionC: "They have a many-to-many relationship",
    optionD: "They do not have any relationship"
  },
  {
    qNumber: "Q13",
    section: "Security & Access",
    questionText: "What is the result of the Access Control evaluation order?",
    correctAnswer: "A",
    explanation: "Ensures user has access to table before evaluating field-level access.",
    optionA: "Ensures user has access to table before evaluating field-level access",
    optionB: "Ensures user has access to field before evaluating table-level access",
    optionC: "Evaluates table-level and field-level simultaneously",
    optionD: "Allows access by default if no rules are specified"
  },
  {
    qNumber: "Q20",
    section: "Security & Access",
    questionText: "In what order are Access Controls evaluated?",
    correctAnswer: "A",
    explanation: "Table-level rules (specific → general), then field-level rules (specific → general).",
    optionA: "Table-level rules (specific → general), then field-level rules (specific → general)",
    optionB: "Field-level rules (specific → general), then table-level rules (specific → general)",
    optionC: "Table-level rules (general → specific), then field-level rules (general → specific)",
    optionD: "Field-level rules (general → specific), then table-level rules (general → specific)"
  },
  {
    qNumber: "Q36",
    section: "Security & Access",
    questionText: "What is the object name for a rule on the entire Incident table?",
    correctAnswer: "A",
    explanation: "incident.None",
    optionA: "incident.None",
    optionB: "incident.*",
    optionC: "incident.All",
    optionD: "incident.Any"
  },
  {
    qNumber: "Q38",
    section: "Security & Access",
    questionText: "Which roles are required to impersonate a user? (Select all that apply)",
    correctAnswer: "A,B",
    explanation: "impersonator, admin",
    optionA: "impersonator",
    optionB: "admin",
    optionC: "itil",
    optionD: "security_admin"
  },
  {
    qNumber: "Q40",
    section: "Security & Access",
    questionText: "What action should you take to see the modules visible to a specific user?",
    correctAnswer: "A",
    explanation: "Impersonate the user.",
    optionA: "Impersonate the user",
    optionB: "Change the user's role",
    optionC: "Look at the user's profile",
    optionD: "Log in with the user's password"
  },
  {
    qNumber: "Q42",
    section: "Security & Access",
    questionText: "What restricts access to data in another app on the same instance?",
    correctAnswer: "A",
    explanation: "Application Scope.",
    optionA: "Application Scope",
    optionB: "Access Control Lists",
    optionC: "User Roles",
    optionD: "Domain Separation"
  },
  {
    qNumber: "Q44",
    section: "Security & Access",
    questionText: "What is the ACL rule applying to every field in the Incident table?",
    correctAnswer: "A",
    explanation: "incident.*",
    optionA: "incident.*",
    optionB: "incident.None",
    optionC: "incident.All",
    optionD: "incident.Any"
  },
  {
    qNumber: "Q45",
    section: "Security & Access",
    questionText: "What is the purpose of application scope?",
    correctAnswer: "A",
    explanation: "Determines which parts of an app are available to other apps in ServiceNow.",
    optionA: "Determines which parts of an app are available to other apps in ServiceNow",
    optionB: "Restricts access to specific users and groups",
    optionC: "Limits the number of records an app can store",
    optionD: "Defines the UI theme for the application"
  },
  {
    qNumber: "Q50",
    section: "Security & Access",
    questionText: "Which statement is correct regarding ACL rule evaluation?",
    correctAnswer: "A",
    explanation: "If row-level and field-level rule both exist, both must be true to allow operation.",
    optionA: "If row-level and field-level rule both exist, both must be true to allow operation",
    optionB: "If row-level and field-level rule both exist, only one must be true to allow operation",
    optionC: "Field-level rules override row-level rules",
    optionD: "Row-level rules override field-level rules"
  },
  {
    qNumber: "Q10",
    section: "Knowledge Management",
    questionText: "What capability delivers KB articles via conversational messaging?",
    correctAnswer: "A",
    explanation: "Virtual Agent.",
    optionA: "Virtual Agent",
    optionB: "Service Portal",
    optionC: "Connect Chat",
    optionD: "Live Feed"
  },
  {
    qNumber: "Q12",
    section: "Service Catalog",
    questionText: "Which method auto-creates routed incidents from a 'Get Help' form?",
    correctAnswer: "A",
    explanation: "Create a Record Producer.",
    optionA: "Create a Record Producer",
    optionB: "Create a Catalog Item",
    optionC: "Create an Order Guide",
    optionD: "Create a UI Action"
  },
  {
    qNumber: "Q14",
    section: "Knowledge Management",
    questionText: "Which KB tab identifies who can read articles?",
    correctAnswer: "A",
    explanation: "Can Read.",
    optionA: "Can Read",
    optionB: "Cannot Read",
    optionC: "User Criteria",
    optionD: "Access Control"
  },
  {
    qNumber: "Q18",
    section: "Workflows",
    questionText: "Which workflows are included in the platform? (Select all that apply)",
    correctAnswer: "A,B,C",
    explanation: "Customer Workflows, Employee Workflows, IT Workflows.",
    optionA: "Customer Workflows",
    optionB: "Employee Workflows",
    optionC: "IT Workflows",
    optionD: "Finance Workflows",
    optionE: "Marketing Workflows"
  },
  {
    qNumber: "Q19",
    section: "Workflows",
    questionText: "What feature is used to manage multi-level approvals + notifications?",
    correctAnswer: "A",
    explanation: "Flows.",
    optionA: "Flows",
    optionB: "Business Rules",
    optionC: "UI Actions",
    optionD: "Client Scripts"
  },
  {
    qNumber: "Q30",
    section: "Workflows",
    questionText: "Which flow components specify when a flow runs? (Select all that apply)",
    correctAnswer: "A,B",
    explanation: "Trigger and Condition.",
    optionA: "Trigger",
    optionB: "Condition",
    optionC: "Action",
    optionD: "Step"
  },
  {
    qNumber: "Q31",
    section: "Workflows",
    questionText: "Which feature auto-allocates a high-priority request to the right team?",
    correctAnswer: "A",
    explanation: "Assignment Rule.",
    optionA: "Assignment Rule",
    optionB: "Business Rule",
    optionC: "UI Policy",
    optionD: "Data Policy"
  },
  {
    qNumber: "Q33",
    section: "Knowledge Management",
    questionText: "What is the process for creating, categorizing, reviewing, approving, and browsing information centrally?",
    correctAnswer: "A",
    explanation: "Knowledge Management.",
    optionA: "Knowledge Management",
    optionB: "Service Catalog",
    optionC: "Incident Management",
    optionD: "Problem Management"
  },
  {
    qNumber: "Q39",
    section: "Knowledge Management",
    questionText: "Where can you find User Criteria for readers in a KB record?",
    correctAnswer: "A",
    explanation: "Can Read tab.",
    optionA: "Can Read tab",
    optionB: "Access Control tab",
    optionC: "Permissions tab",
    optionD: "Security tab"
  },
  {
    qNumber: "Q47",
    section: "Service Catalog",
    questionText: "For a catalog item with Color, RAM, Keyboard, and Monitor options, what should you add?",
    correctAnswer: "A",
    explanation: "Add variables.",
    optionA: "Add variables",
    optionB: "Add items",
    optionC: "Add fields",
    optionD: "Add choices"
  },
  {
    qNumber: "Q49",
    section: "Service Catalog",
    questionText: "Which module is used to begin creating a new Service Catalog item?",
    correctAnswer: "A",
    explanation: "Maintain Items.",
    optionA: "Maintain Items",
    optionB: "Service Catalog",
    optionC: "Catalog Items",
    optionD: "Record Producers"
  },
  {
    qNumber: "Q11",
    section: "Scripting",
    questionText: "What is the difference between a Client Script and a Business Rule?",
    correctAnswer: "A",
    explanation: "Client Script executes on client; Business Rule executes on server.",
    optionA: "Client Script executes on client; Business Rule executes on server",
    optionB: "Client Script executes on server; Business Rule executes on client",
    optionC: "Both execute on the client",
    optionD: "Both execute on the server"
  },
  {
    qNumber: "Q28",
    section: "Scripting",
    questionText: "Which script type runs in a web browser?",
    correctAnswer: "A",
    explanation: "Client Script.",
    optionA: "Client Script",
    optionB: "Business Rule",
    optionC: "Script Include",
    optionD: "UI Action"
  },
  {
    qNumber: "Q43",
    section: "Scripting",
    questionText: "What are the options determining when a Business Rule executes? (Select all that apply)",
    correctAnswer: "A,B,C,D",
    explanation: "Async, After, Display, Before.",
    optionA: "Async",
    optionB: "After",
    optionC: "Display",
    optionD: "Before",
    optionE: "During"
  },
  {
    qNumber: "Q46",
    section: "Scripting",
    questionText: "Which script is used to auto-fill Location on Caller change + top-of-page notice?",
    correctAnswer: "A",
    explanation: "Client Script.",
    optionA: "Client Script",
    optionB: "Business Rule",
    optionC: "UI Policy",
    optionD: "Data Policy"
  },
  {
    qNumber: "Q7",
    section: "Navigation & Filters",
    questionText: "Which filter condition component is always a choice list?",
    correctAnswer: "A",
    explanation: "Operator.",
    optionA: "Operator",
    optionB: "Field",
    optionC: "Value",
    optionD: "Condition"
  },
  {
    qNumber: "Q21",
    section: "Navigation & Filters",
    questionText: "Which icon is used to change the icon/color on a Favorite?",
    correctAnswer: "A",
    explanation: "Pencil.",
    optionA: "Pencil",
    optionB: "Star",
    optionC: "Gear",
    optionD: "Wrench"
  },
  {
    qNumber: "Q22",
    section: "General",
    questionText: "What is the best way to try a new ServiceNow app hands-on?",
    correctAnswer: "A",
    explanation: "Activate app plugin on your Personal Developer Instance.",
    optionA: "Activate app plugin on your Personal Developer Instance",
    optionB: "Request a demo from ServiceNow",
    optionC: "Watch a tutorial video",
    optionD: "Install it in a production instance"
  },
  {
    qNumber: "Q25",
    section: "Navigation & Filters",
    questionText: "In what order should filter elements be specified?",
    correctAnswer: "A",
    explanation: "Field → Operator → Value.",
    optionA: "Field → Operator → Value",
    optionB: "Value → Operator → Field",
    optionC: "Operator → Field → Value",
    optionD: "Field → Value → Operator"
  },
  {
    qNumber: "Q32",
    section: "Navigation & Filters",
    questionText: "What is the name of the string displaying filter criteria?",
    correctAnswer: "A",
    explanation: "Breadcrumb.",
    optionA: "Breadcrumb",
    optionB: "Filter String",
    optionC: "Query Builder",
    optionD: "Search Path"
  },
  {
    qNumber: "Q34",
    section: "Navigation & Filters",
    questionText: "How can you exclude Resolved incidents from the active list?",
    correctAnswer: "A",
    explanation: "Right-click Resolved value on list → select Filter Out.",
    optionA: "Right-click Resolved value on list → select Filter Out",
    optionB: "Right-click Resolved value on list → select Show Matching",
    optionC: "Delete all Resolved incidents",
    optionD: "Change their status to Active"
  },
  {
    qNumber: "Q35",
    section: "Forms & Lists",
    questionText: "Which section shows the most recent updates on a task record?",
    correctAnswer: "A",
    explanation: "Activity Stream.",
    optionA: "Activity Stream",
    optionB: "Work Notes",
    optionC: "Additional Comments",
    optionD: "History"
  },
  {
    qNumber: "Q37",
    section: "Forms & Lists",
    questionText: "What feature is used to categorize and expose records to other users?",
    correctAnswer: "A",
    explanation: "Tags.",
    optionA: "Tags",
    optionB: "Categories",
    optionC: "Labels",
    optionD: "Bookmarks"
  },
  {
    qNumber: "Q41",
    section: "Forms & Lists",
    questionText: "What feature is used to pre-populate most-used fields for a table?",
    correctAnswer: "A",
    explanation: "Template.",
    optionA: "Template",
    optionB: "Business Rule",
    optionC: "Client Script",
    optionD: "Default Value"
  },
  {
    qNumber: "Q48",
    section: "Forms & Lists",
    questionText: "Which form element shows the activity/history list on a task form?",
    correctAnswer: "A",
    explanation: "Activity Formatter.",
    optionA: "Activity Formatter",
    optionB: "Activity Stream",
    optionC: "History List",
    optionD: "Audit Log"
  }
];

async function seed() {
  console.log("Seeding Friend's Exam (PDF) questions...");

  // Create the exam
  let exam = await prisma.exam.findFirst({ where: { slug: examData.slug } });
  
  if (!exam) {
    exam = await prisma.exam.create({ data: examData });
    console.log(`Created new exam: ${exam.name} (ID: ${exam.id})`);
  } else {
    console.log(`Exam already exists: ${exam.name} (ID: ${exam.id})`);
  }

  // Add questions
  let added = 0;
  for (const q of questions) {
    const exists = await prisma.question.findFirst({
      where: { qNumber: q.qNumber, examId: exam.id }
    });

    if (!exists) {
      await prisma.question.create({
        data: {
          examId: exam.id,
          qNumber: q.qNumber,
          section: q.section,
          questionText: q.questionText,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          optionE: q.optionE,
          optionF: q.optionF,
          optionG: q.optionG,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        }
      });
      added++;
    }
  }

  console.log(`Successfully added ${added} questions to the new exam!`);
}

seed().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
