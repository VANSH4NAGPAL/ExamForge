const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const JSON_PATH = path.join(__dirname, '../../../../Downloads/SNPS/parsed_questions_fixed.json');

// Manually entered Q468-Q482 from the PDF (these were missing from the parser output)
const MANUAL_QUESTIONS = [
  {
    qNumber: 'Q468',
    questionText: 'What enables you to trace the connection from an infrastructure item, like a Server, to the Services that are dependent on that Server?',
    optionA: 'Service Tracer',
    optionB: 'Automapping Utility',
    optionC: 'Transform Map',
    optionD: 'Relationships',
    optionE: null, optionF: null, optionG: null,
    correctAnswer: 'D',
    explanation: 'Relationships are the direct links that define how different parts of an IT setup connect and rely on each other. This lets you follow the connections from a server to the services it supports.'
  },
  {
    qNumber: 'Q469',
    questionText: 'What does ServiceNow recommend as a best practice regarding data imports?',
    optionA: 'Monitor data quality and clean imported data, using the Data Scrub Workspace.',
    optionB: 'Plan time before your import to remove obsolete or inaccurate data.',
    optionC: 'Adjust your Transform maps, after the data is loaded into the target table.',
    optionD: 'Create a new Import set table for each new data load.',
    optionE: 'Use extremely large Import Sets, instead of multiple large Import Sets.',
    optionF: null, optionG: null,
    correctAnswer: 'B',
    explanation: 'Plan time before your import to remove obsolete or inaccurate data. Importing dirty data into ServiceNow can lead to significant problems including data integrity issues and performance degradation. ServiceNow strongly advocates for data quality at the source.'
  },
  {
    qNumber: 'Q470',
    questionText: 'In what order are Access Controls evaluated?',
    optionA: 'Table-level - most specific to most general; then Field-level - most specific to most general',
    optionB: 'Table-level - most specific to most general; then Row-level - most specific to most general',
    optionC: 'Field-level - most general to most specific; then Row-level - most specific to most general',
    optionD: 'Field-level - most specific to most general; then Table-level - most specific to most general',
    optionE: null, optionF: null, optionG: null,
    correctAnswer: 'A',
    explanation: 'Table-level ACLs are evaluated first, from most specific to most general (e.g., incident > task > *). Then Field-level ACLs are evaluated, again from most specific to most general.'
  },
  {
    qNumber: 'Q471',
    questionText: 'An Administrator wants to remove privileged users who have never accessed the platform. Which Security Center section is checked for these users?',
    optionA: 'Security metrics',
    optionB: 'Security posture dashboard',
    optionC: 'Security scanner',
    optionD: 'Security hardening',
    optionE: null, optionF: null, optionG: null,
    correctAnswer: 'B',
    explanation: 'The Security posture dashboard provides visibility into user activity, access patterns, and privilege usage, helping administrators identify privileged users who have never accessed the platform.'
  },
  {
    qNumber: 'Q472',
    questionText: 'Which events are used for monitoring and logging in the the Security Center? (Choose 2)',
    optionA: 'Failed login',
    optionB: 'Table creation',
    optionC: 'Impersonation',
    optionD: 'User deletion',
    optionE: null, optionF: null, optionG: null,
    correctAnswer: 'A, C',
    explanation: 'Failed login attempts are critical security events monitored in the Security Center. Impersonation events are highly sensitive security actions monitored to detect privilege misuse, insider threats, or unauthorized role assumptions.'
  },
  {
    qNumber: 'Q473',
    questionText: 'Where can Administrators check the release being used within a ServiceNow instance?',
    optionA: 'Memory Stats module',
    optionB: 'Transactions log',
    optionC: 'Stats module',
    optionD: 'System.upgraded table',
    optionE: null, optionF: null, optionG: null,
    correctAnswer: 'D',
    explanation: 'The system.upgraded table stores records of platform upgrades and identifies the ServiceNow release currently running in the instance.'
  },
  {
    qNumber: 'Q474',
    questionText: 'An Administrator wants to remove privileged users who have never accessed the platform. Which Security Center section is checked for these users?',
    optionA: 'Security metrics',
    optionB: 'Security posture dashboard',
    optionC: 'Security scanner',
    optionD: 'Security hardening',
    optionE: null, optionF: null, optionG: null,
    correctAnswer: 'B',
    explanation: 'The Security posture dashboard gives visibility into user activity, privilege usage, and access history, allowing administrators to identify privileged users who have never logged into the platform.'
  },
  {
    qNumber: 'Q475',
    questionText: 'Which feature automates business logic like approvals, tasks, notifications, and record operations for an application or process?',
    optionA: 'Flows and Subflows',
    optionB: 'Action Sequences',
    optionC: 'Flow Diagrams',
    optionD: 'Task Flows',
    optionE: null, optionF: null, optionG: null,
    correctAnswer: 'A',
    explanation: 'Flows and Subflows are the primary automation tool for implementing business logic such as approvals, tasks, notifications, and record operations across applications and processes.'
  },
  {
    qNumber: 'Q476',
    questionText: 'A customer wants to implement a phone ordering mechanism for employees that triggers a notification for the requester and approver at each approval level. Which feature is used to achieve this?',
    optionA: 'Flows and Subflows',
    optionB: 'Parent-Child Approvers',
    optionC: 'Approver Delegates',
    optionD: 'Approval Criteria',
    optionE: null, optionF: null, optionG: null,
    correctAnswer: 'D',
    explanation: 'Approval criteria define when and how records enter an approval process, and within an approval process, notifications are automatically triggered at each approval step for both requester and approvers.'
  },
  {
    qNumber: 'Q477',
    questionText: 'What are the options that can be set to determine when a Business Rule executes? (Choose 4)',
    optionA: 'Change',
    optionB: 'Submit',
    optionC: 'Async',
    optionD: 'After',
    optionE: 'Load',
    optionF: 'Display',
    optionG: 'Before',
    correctAnswer: 'C, D, F, G',
    explanation: 'Async: Business Rules can run asynchronously in the background after the main transaction. After: Executes after a record is inserted or updated. Display: Runs when a form is displayed to the user. Before: Executes before a record is inserted or updated.'
  },
  {
    qNumber: 'Q478',
    questionText: 'What is the difference between a Client Script and a Business Rule?',
    optionA: 'A Client Script executes on the client, and a Business Rule executes on the server',
    optionB: 'A Client Script executes before a record is loaded and a Business Rule executes after a record is loaded',
    optionC: 'A Client Script executes on the server, and a Business Rule executes on the client',
    optionD: 'A Client Script executes before a record is loaded and a Business Rule executes after a record is updated',
    optionE: null, optionF: null, optionG: null,
    correctAnswer: 'A',
    explanation: 'Client Scripts run in the user\'s browser (client-side) and handle form interactions like field validation and UI behavior. Business Rules run on the server and enforce logic during database operations such as insert, update, delete, or query.'
  },
  {
    qNumber: 'Q479',
    questionText: 'Which feature allows users to browse internal IT documentation, like troubleshooting scripts and frequently asked questions?',
    optionA: 'Stack Overflow',
    optionB: 'ServiceNow Wiki',
    optionC: 'Knowledge',
    optionD: 'SharePoint',
    optionE: null, optionF: null, optionG: null,
    correctAnswer: 'C',
    explanation: 'The Knowledge feature in ServiceNow allows users to create, manage, and browse internal IT documentation such as troubleshooting guides, FAQs, and how-to articles.'
  },
  {
    qNumber: 'Q480',
    questionText: "Who does the 'data controller' refer to in the Shared Responsibility Model?",
    optionA: 'ServiceNow',
    optionB: 'Datacenter partners',
    optionC: 'Customer',
    optionD: null, optionE: null, optionF: null, optionG: null,
    correctAnswer: 'C',
    explanation: 'The customer is the data controller, as they determine what data is collected, how it is used, and how it is managed within the platform.'
  },
  {
    qNumber: 'Q481',
    questionText: 'Which role(s) are required to impersonate a user? (Choose 2)',
    optionA: 'security_admin',
    optionB: 'sys_user',
    optionC: 'sys_admin',
    optionD: 'impersonator',
    optionE: 'admin',
    optionF: null, optionG: null,
    correctAnswer: 'D, E',
    explanation: 'The impersonator role explicitly grants permission to impersonate other users. The admin role includes the ability to impersonate users by default.'
  },
  {
    qNumber: 'Q482',
    questionText: 'Tables may have a One to Many relationship. From the Service Catalog, what are examples of tables having a one to many relationships? (Choose 3)',
    optionA: 'One Requested Item can have many Catalog Tasks',
    optionB: 'One Cart can have many Requests',
    optionC: 'One Approval can have many Requests',
    optionD: 'One Requested Item can have many Approvals',
    optionE: 'One Request can have many Requested Items',
    optionF: null, optionG: null,
    correctAnswer: 'A, D, E',
    explanation: 'A Requested Item (RITM) can generate multiple Catalog Tasks. A Requested Item can go through multiple approval steps. A single Request (REQ) can include multiple Requested Items (RITMs).'
  },
];

async function main() {
  const pdfData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  console.log(`Loaded ${pdfData.length} questions from fixed PDF parse.`);

  const allQuestions = [...pdfData, ...MANUAL_QUESTIONS];
  console.log(`Total questions to seed: ${allQuestions.length}`);

  // Get the premium exam
  const exam = await prisma.exam.findUnique({ where: { slug: 'servicenow-csa-premium' } });
  if (!exam) {
    console.error('Premium exam not found!');
    return;
  }

  // Delete all existing questions and analytics for this exam
  console.log('Clearing existing premium bank questions...');
  const qIds = (await prisma.question.findMany({ where: { examId: exam.id }, select: { id: true } })).map(q => q.id);
  await prisma.analytics.deleteMany({ where: { questionId: { in: qIds } } });
  await prisma.progress.deleteMany({ where: { examId: exam.id } });
  await prisma.question.deleteMany({ where: { examId: exam.id } });
  console.log(`Deleted ${qIds.length} old questions.`);

  // Re-insert all questions cleanly
  let inserted = 0;
  for (const q of allQuestions) {
    await prisma.question.create({
      data: {
        examId: exam.id,
        qNumber: q.qNumber,
        section: 'CSA Premium Bank',
        questionText: q.questionText,
        optionA: q.optionA || null,
        optionB: q.optionB || null,
        optionC: q.optionC || null,
        optionD: q.optionD || null,
        optionE: q.optionE || null,
        optionF: q.optionF || null,
        optionG: q.optionG || null,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || 'See official ServiceNow documentation.',
      }
    });
    inserted++;
    if (inserted % 50 === 0) console.log(`Inserted ${inserted}/${allQuestions.length}...`);
  }

  console.log(`\n✅ Done! Cleanly re-seeded ${inserted} questions into "${exam.name}".`);
  
  // Verify
  const count = await prisma.question.count({ where: { examId: exam.id } });
  console.log(`Verified: ${count} questions now in database.`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
