const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// All questions are MULTIPLE-ANSWER (multiple correct answers)
// Based strictly on study notes in the artifacts directory
// Weighted: CMDB/Discovery, Module 5 Self-Service, Service Catalog, Module 8 Security, Security Center (heavy)
// Other topics (Table Admin, Workflow Studio, Update Sets, Access Control) also included

const multiAnswerQuestions = [

  // =============================================
  // SECTION: CMDB, Discovery & Service Mapping (HEAVY - 20 questions)
  // =============================================
  {
    qNumber: 'MA1',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'Which of the following are valid use cases for the CMDB? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Root cause analysis to identify affected components' },
      { letter: 'B', text: 'Generating marketing campaign reports' },
      { letter: 'C', text: 'Assessing change impact before implementation' },
      { letter: 'D', text: 'Spotting recurring trends across CIs for problem management' },
      { letter: 'E', text: 'Faster incident resolution via CI details' },
    ],
    correctAnswers: ['A', 'C', 'D', 'E'],
    explanation: 'The CMDB supports root cause analysis, change impact assessment, problem management trend spotting, and faster incident resolution. It is not used for marketing campaigns.',
  },
  {
    qNumber: 'MA2',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'Which of the following attributes does each Configuration Item (CI) in the CMDB contain? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Name and version' },
      { letter: 'B', text: 'Billing and payment history' },
      { letter: 'C', text: 'Description and ownership' },
      { letter: 'D', text: 'Status and relationships' },
      { letter: 'E', text: 'Social media profile links' },
    ],
    correctAnswers: ['A', 'C', 'D'],
    explanation: 'Each CI in the CMDB contains: name, version, description, ownership, status, and relationships. Billing history and social media links are not CI attributes.',
  },
  {
    qNumber: 'MA3',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'Which of the following statements about the Dependency Views Map are correct? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It shows upstream and downstream dependencies between CIs' },
      { letter: 'B', text: 'The root CI is shown with a darker frame and pulsing effect' },
      { letter: 'C', text: 'By default it displays 5 levels of relationships' },
      { letter: 'D', text: 'Clusters are collapsed by default' },
      { letter: 'E', text: 'It auto-refreshes to reflect CMDB changes' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'The Dependency Views Map shows upstream/downstream dependencies, the root CI has a darker frame with pulsing effect, clusters are collapsed by default, and it auto-refreshes. The default is 3 levels (not 5).',
  },
  {
    qNumber: 'MA4',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'What can administrators do using the CI Class Manager? (Select all that apply)',
    options: [
      { letter: 'A', text: 'View and modify class definitions' },
      { letter: 'B', text: 'Create derived (extended) classes' },
      { letter: 'C', text: 'Access reconciliation rules per class' },
      { letter: 'D', text: 'Delete all records in the CMDB in bulk' },
      { letter: 'E', text: 'View mandatory and recommended fields per class' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'CI Class Manager lets admins view/modify/extend class definitions, create derived classes, and access metadata including reconciliation rules and mandatory/recommended fields. Bulk deletion of all CMDB records is not a CI Class Manager function.',
  },
  {
    qNumber: 'MA5',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'Which of the following are true about the CMDB Workspace? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It is a central hub for administrators' },
      { letter: 'B', text: 'It allows admins to administer policies' },
      { letter: 'C', text: 'It is used to manage CI lifecycles' },
      { letter: 'D', text: 'It can only be accessed by the default system administrator' },
      { letter: 'E', text: 'It provides access to analytics and dependency maps' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'The CMDB Workspace is a central hub for all administrators (not just the default one). It supports policy administration, CI lifecycle management, analytics, and dependency mapping.',
  },
  {
    qNumber: 'MA6',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'Which of the following are correct statements about the Common Service Data Model (CSDM)? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It is a standardized framework for mapping IT services to ServiceNow' },
      { letter: 'B', text: 'It replaces the need for a CMDB entirely' },
      { letter: 'C', text: 'It helps perform service modeling activities' },
      { letter: 'D', text: 'It enables true service-level reporting' },
      { letter: 'E', text: 'It helps identify correct tables and CIs per use case' },
    ],
    correctAnswers: ['A', 'C', 'D', 'E'],
    explanation: 'CSDM is a standardized framework for mapping IT services. It supports service modeling, service-level reporting, and CI identification. It does NOT replace the CMDB — it works alongside it.',
  },
  {
    qNumber: 'MA7',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'Which of the following are true about the MID Server used by Discovery? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It is a lightweight Java process' },
      { letter: 'B', text: 'It can run on Linux, Windows, or cloud environments' },
      { letter: 'C', text: 'It communicates directly with end users to gather data' },
      { letter: 'D', text: 'It scans the network for devices and applications' },
      { letter: 'E', text: 'It can communicate through a proxy server' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'The MID Server is a lightweight Java process that runs on Linux, Windows, or cloud. It scans the network for devices/apps and can use a proxy server. It does not communicate with end users directly.',
  },
  {
    qNumber: 'MA8',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'What information does the MID Server capture during Discovery? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Operating system details' },
      { letter: 'B', text: 'Software installed on devices' },
      { letter: 'C', text: 'User passwords and credentials' },
      { letter: 'D', text: 'Memory information' },
      { letter: 'E', text: 'Relationships between devices and applications' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'The MID Server captures OS details, software, memory, attributes, and relationships between devices/apps. It does NOT capture user passwords.',
  },
  {
    qNumber: 'MA9',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'Which of the following correctly describe Service Mapping? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It takes a top-down, service-focused approach' },
      { letter: 'B', text: 'It treats devices as standalone objects without showing connections' },
      { letter: 'C', text: 'It shows all components delivering a specific service' },
      { letter: 'D', text: 'It automatically populates CMDB with discovered relationships and dependencies' },
      { letter: 'E', text: 'It overlays service maps onto existing CI data' },
    ],
    correctAnswers: ['A', 'C', 'D', 'E'],
    explanation: 'Service Mapping takes a top-down approach and shows all components for a specific service, automatically populating CMDB with relationships. Treating devices as standalone objects is the behavior of traditional horizontal Discovery, not Service Mapping.',
  },
  {
    qNumber: 'MA10',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'Which of the following correctly differentiate Discovery from Service Mapping? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Discovery uses a horizontal (bottom-up) approach; Service Mapping uses top-down' },
      { letter: 'B', text: 'Discovery focuses on individual devices and apps; Service Mapping focuses on full service dependency chains' },
      { letter: 'C', text: 'Both Discovery and Service Mapping are identical in their approach' },
      { letter: 'D', text: 'Discovery populates CI data; Service Mapping populates relationships and dependencies' },
      { letter: 'E', text: 'Service Mapping shows device-to-device relationships; Discovery shows service-to-service' },
    ],
    correctAnswers: ['A', 'B', 'D'],
    explanation: 'Discovery is horizontal/bottom-up and focuses on individual devices/apps, populating CI data. Service Mapping is top-down and service-focused, populating relationships and dependencies. They are NOT identical.',
  },
  {
    qNumber: 'MA11',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'What can you access from the CMDB Workspace? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Dependency map' },
      { letter: 'B', text: 'CI lifecycle management' },
      { letter: 'C', text: 'Analytics dashboards' },
      { letter: 'D', text: 'User password reset tools' },
      { letter: 'E', text: 'Assigned tasks (approve/reject)' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'The CMDB Workspace provides access to dependency maps, CI lifecycle management, analytics, and the ability to approve/reject assigned tasks. Password reset tools are not part of the CMDB Workspace.',
  },
  {
    qNumber: 'MA12',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'Which of the following are true about CI Relationships in the CMDB? (Select all that apply)',
    options: [
      { letter: 'A', text: 'They are managed via the Configuration Item Relationship Editor' },
      { letter: 'B', text: 'The editor is accessed from the Related Items toolbar on a CI form' },
      { letter: 'C', text: 'Relationship rules define how base classes interact with dependent classes' },
      { letter: 'D', text: 'Extended tables must manually re-apply relationship rules from parents' },
      { letter: 'E', text: 'Relationships can be created automatically via Discovery' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'CI Relationships are managed via the Configuration Item Relationship Editor, accessed from the Related Items toolbar. Relationship rules define how classes interact. Extended tables automatically inherit relationship rules (not manually re-applied). Relationships can be auto-created via Discovery.',
  },
  {
    qNumber: 'MA13',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'What metadata can be accessed per class in the CI Class Manager? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Reconciliation rules' },
      { letter: 'B', text: 'Audit templates' },
      { letter: 'C', text: 'Database health settings' },
      { letter: 'D', text: 'Employee HR records' },
      { letter: 'E', text: 'Orphan scorecards' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'CI Class Manager provides access to reconciliation rules, mandatory & recommended fields, audit templates, database health settings, identification & reconciliation rules, and orphan scorecards. Employee HR records are not part of this.',
  },
  {
    qNumber: 'MA14',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'Which of the following CSDM activities are supported? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Performing service modeling activities' },
      { letter: 'B', text: 'Tracking asset lifecycles' },
      { letter: 'C', text: 'Configuring email notification templates' },
      { letter: 'D', text: 'Defining scope (in-scope vs out-of-scope)' },
      { letter: 'E', text: 'Enabling true service-level reporting' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'CSDM supports service modeling, asset lifecycle tracking, scope definition, and service-level reporting. Email notification template configuration is not a CSDM activity.',
  },
  {
    qNumber: 'MA15',
    section: '🗺️ Multi-Answer: CMDB, Discovery & Service Mapping',
    questionText: 'Which icons and visual cues does the Dependency Views Map use to show active/pending issues? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Icons showing active alerts' },
      { letter: 'B', text: 'Glyphs representing incidents' },
      { letter: 'C', text: 'Animated spinning wheels for long-running processes' },
      { letter: 'D', text: 'Glyphs representing problems' },
      { letter: 'E', text: 'Icons for pending changes' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'The Dependency Views Map shows active/pending issues via icons and glyphs for alerts, incidents, problems, and changes. Animated spinning wheels are not part of this visualization.',
  },

  // =============================================
  // SECTION: Module 5 – Configure Self-Service (HEAVY - 12 questions)
  // =============================================
  {
    qNumber: 'MA16',
    section: '🙋 Multi-Answer: Module 5 – Configure Self-Service',
    questionText: 'Which of the following are valid self-service portals in ServiceNow? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Employee Center' },
      { letter: 'B', text: 'Service Portal' },
      { letter: 'C', text: 'Financial Planning Portal' },
      { letter: 'D', text: 'Knowledge Portal' },
      { letter: 'E', text: 'CAB Workbench' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Valid ServiceNow self-service portals include Employee Center, Service Portal, Knowledge Portal, and CAB Workbench. A "Financial Planning Portal" is not a standard ServiceNow portal.',
  },
  {
    qNumber: 'MA17',
    section: '🙋 Multi-Answer: Module 5 – Configure Self-Service',
    questionText: 'Which of the following capabilities does the Employee Center provide? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Unified hub for tasks and requests' },
      { letter: 'B', text: 'Access to Knowledge Bases' },
      { letter: 'C', text: 'Live agent chat' },
      { letter: 'D', text: 'Managing payroll deductions' },
      { letter: 'E', text: 'Browse service catalogs' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'The Employee Center is a unified hub that provides access to tasks, requests, Knowledge Bases, catalogs, and live agent chat. Payroll management is not a function of the Employee Center.',
  },
  {
    qNumber: 'MA18',
    section: '🙋 Multi-Answer: Module 5 – Configure Self-Service',
    questionText: 'Which of the following are ways users can interact with Knowledge Base articles? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Browse by categories' },
      { letter: 'B', text: 'Sort by relevancy, most recent, or views' },
      { letter: 'C', text: 'Flag articles (sends to KB admin)' },
      { letter: 'D', text: 'Delete articles directly without approval' },
      { letter: 'E', text: 'Comment on articles' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Users can browse, sort (by relevancy, most recent, views), flag articles (flagged articles go to KB admin), and comment. Users cannot directly delete articles without going through a proper workflow.',
  },
  {
    qNumber: 'MA19',
    section: '🙋 Multi-Answer: Module 5 – Configure Self-Service',
    questionText: 'Which of the following can be defined per Knowledge Base by administrators? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Unique lifecycle workflows' },
      { letter: 'B', text: 'User Criteria (who can read/contribute)' },
      { letter: 'C', text: 'Category structures' },
      { letter: 'D', text: 'Default color themes for the entire platform' },
      { letter: 'E', text: 'Manager assignments' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Per Knowledge Base, admins can define: unique lifecycle workflows, User Criteria (read/contribute access), category structures, and manager assignments. Platform-wide color themes are not a per-KB setting.',
  },
  {
    qNumber: 'MA20',
    section: '🙋 Multi-Answer: Module 5 – Configure Self-Service',
    questionText: 'Regarding Knowledge Base User Criteria, which statements are correct? (Select all that apply)',
    options: [
      { letter: 'A', text: 'The "Cannot Read" list overrides the "Can Read" list' },
      { letter: 'B', text: 'The "Cannot Contribute" list overrides the "Can Contribute" list' },
      { letter: 'C', text: 'When "Match All" is checked, users must meet ALL criteria fields' },
      { letter: 'D', text: 'By default, "Match All" is checked (enabled)' },
      { letter: 'E', text: 'If no User Criteria is set on "Can Read", the KB is public to all users' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Cannot Read/Contribute override Can Read/Contribute. Match All = user must meet ALL criteria when checked. By default, Match All is UNCHECKED (user needs to meet at least one). No User Criteria on Can Read = KB is publicly accessible.',
  },
  {
    qNumber: 'MA21',
    section: '🙋 Multi-Answer: Module 5 – Configure Self-Service',
    questionText: 'Which of the following Knowledge Base flows bypass the approval process? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Knowledge Approval Publish' },
      { letter: 'B', text: 'Knowledge Instant Publish' },
      { letter: 'C', text: 'Knowledge Instant Retire' },
      { letter: 'D', text: 'Knowledge Approval Retire' },
      { letter: 'E', text: 'Knowledge – Publish Knowledge (subflow)' },
    ],
    correctAnswers: ['B', 'C'],
    explanation: 'Knowledge Instant Publish and Knowledge Instant Retire bypass the approval process and execute immediately. The Approval flows require manager approval. The subflows (Publish/Retire Knowledge) are used within custom flows but don\'t independently bypass approval.',
  },
  {
    qNumber: 'MA22',
    section: '🙋 Multi-Answer: Module 5 – Configure Self-Service',
    questionText: 'Which of the following are ways to add articles to a Knowledge Base? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Import a Word document using the Import Articles button' },
      { letter: 'B', text: 'Create an article from scratch using the HTML editor' },
      { letter: 'C', text: 'Import directly from a SharePoint document library via drag-and-drop' },
      { letter: 'D', text: 'Convert a closed incident into an article automatically' },
      { letter: 'E', text: 'Use spell check and formatting tools in the built-in HTML editor' },
    ],
    correctAnswers: ['A', 'B', 'E'],
    explanation: 'You can add KB articles by importing a Word document or creating from scratch using the HTML editor (which includes spell check and formatting). Direct SharePoint drag-and-drop import and automatic incident-to-article conversion are not listed methods in the notes.',
  },
  {
    qNumber: 'MA23',
    section: '🙋 Multi-Answer: Module 5 – Configure Self-Service',
    questionText: 'Which of the following are available on the Now Mobile App for Knowledge Management? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Global search bar to find articles instantly' },
      { letter: 'B', text: 'Browse by category via the info icon in footer' },
      { letter: 'C', text: 'View article details such as author and publish date' },
      { letter: 'D', text: 'Edit and publish articles directly from mobile' },
      { letter: 'E', text: 'Leave feedback and comments on articles' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'The Now Mobile App allows global search, browsing by category, viewing article details (number, author, publish date, views), and leaving feedback/comments. Editing and publishing articles directly from mobile is not mentioned in the notes.',
  },
  {
    qNumber: 'MA24',
    section: '🙋 Multi-Answer: Module 5 – Configure Self-Service',
    questionText: 'What will you configure as part of Module 5 (Self-Service)? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Portals (Employee Center, Service Portal)' },
      { letter: 'B', text: 'Knowledge Base (create, import docs, approve & publish articles)' },
      { letter: 'C', text: 'User Criteria (define, apply & test access control)' },
      { letter: 'D', text: 'Integration Hub subscriptions and licenses' },
      { letter: 'E', text: 'Service Catalog items using Catalog Builder' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Module 5 covers configuring portals, Knowledge Base setup, User Criteria, and Service Catalog items (Catalog Builder). Integration Hub licensing is a separate topic not part of Module 5.',
  },
  {
    qNumber: 'MA25',
    section: '🙋 Multi-Answer: Module 5 – Configure Self-Service',
    questionText: 'Which of the following statements about Contextual Search are correct? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It integrates with Incident Management' },
      { letter: 'B', text: 'It suggests Knowledge Base articles while troubleshooting' },
      { letter: 'C', text: 'It is only available in the Knowledge Portal' },
      { letter: 'D', text: 'It helps users find relevant articles without leaving the incident form' },
      { letter: 'E', text: 'It is a feature of the CAB Workbench' },
    ],
    correctAnswers: ['A', 'B', 'D'],
    explanation: 'Contextual Search integrates with Incident Management and suggests KB articles while troubleshooting, allowing users to find relevant articles without leaving the incident form. It is not limited to the Knowledge Portal and is not a CAB Workbench feature.',
  },
  {
    qNumber: 'MA26',
    section: '🙋 Multi-Answer: Module 5 – Configure Self-Service',
    questionText: 'Which of the following statements about the Knowledge Approval Publish flow are correct? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It requests manager approval before publishing' },
      { letter: 'B', text: 'If approved, the article is published' },
      { letter: 'C', text: 'If rejected, the article is deleted from the system' },
      { letter: 'D', text: 'If rejected, the article stays in draft state' },
      { letter: 'E', text: 'It is one of the default Knowledge Base flows' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'The Knowledge Approval Publish flow requests manager approval, publishes if approved, and keeps the article in draft state if rejected (it is NOT deleted). It is a default KB flow.',
  },
  {
    qNumber: 'MA27',
    section: '🙋 Multi-Answer: Module 5 – Configure Self-Service',
    questionText: 'Which of the following Knowledge Base setup tasks can be delegated via the Knowledge Management Guided Setup? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Assigning managers to Knowledge Bases' },
      { letter: 'B', text: 'Defining category structures' },
      { letter: 'C', text: 'Delegating tasks to other team members via Assign Task feature' },
      { letter: 'D', text: 'Directly billing users for KB access' },
      { letter: 'E', text: 'Activating required plugins for locked tasks' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'The Knowledge Management Guided Setup supports assigning managers, defining categories, delegating tasks via the Assign Task feature, and activating plugins for locked tasks. Billing users for KB access is not a KB setup function.',
  },

  // =============================================
  // SECTION: Service Catalog (HEAVY - 12 questions)
  // =============================================
  {
    qNumber: 'MA28',
    section: '🛒 Multi-Answer: Service Catalog',
    questionText: 'Which of the following are core components of the Service Catalog? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Catalog Item' },
      { letter: 'B', text: 'Record Producer' },
      { letter: 'C', text: 'Order Guide' },
      { letter: 'D', text: 'System Dictionary' },
      { letter: 'E', text: 'Variable Set' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Core Service Catalog components include Catalog Items, Record Producers, Order Guides, Variables, and Variable Sets. The System Dictionary is a table administration tool, not a catalog component.',
  },
  {
    qNumber: 'MA29',
    section: '🛒 Multi-Answer: Service Catalog',
    questionText: 'Which of the following are true about Variables in the Service Catalog? (Select all that apply)',
    options: [
      { letter: 'A', text: 'They are added to catalog items to gather user input during ordering' },
      { letter: 'B', text: 'They can affect the order price' },
      { letter: 'C', text: 'By default, they are global and appear in all execution tasks' },
      { letter: 'D', text: 'Each variable can only be used on one catalog item' },
      { letter: 'E', text: 'They can be grouped into Variable Sets and reused across multiple items' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Variables gather user input, can affect order price, are global by default (appearing in all execution tasks), and can be grouped into Variable Sets for reuse across multiple items. A variable can be reused across multiple items (not limited to one).',
  },
  {
    qNumber: 'MA30',
    section: '🛒 Multi-Answer: Service Catalog',
    questionText: 'Which of the following correctly describe Variable Sets? (Select all that apply)',
    options: [
      { letter: 'A', text: 'They group variables together' },
      { letter: 'B', text: 'They can be applied to multiple catalog items at once' },
      { letter: 'C', text: 'Updating the set auto-updates all associated catalog items' },
      { letter: 'D', text: 'Each Variable Set can only contain one variable' },
      { letter: 'E', text: 'They reduce the need to individually update each catalog item' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Variable Sets group variables, apply to multiple items, auto-update all associated items when changed, and reduce individual update effort. A Variable Set can contain multiple variables.',
  },
  {
    qNumber: 'MA31',
    section: '🛒 Multi-Answer: Service Catalog',
    questionText: 'Which of the following statements about Record Producers are correct? (Select all that apply)',
    options: [
      { letter: 'A', text: 'They look like catalog items but work differently' },
      { letter: 'B', text: 'They create task-based records such as Incidents' },
      { letter: 'C', text: 'They should be used when you want to create a requested item record' },
      { letter: 'D', text: 'They generate task-based records instead of requested item records' },
      { letter: 'E', text: 'They can be created for tables in the same scope or tables that allow cross-scope create access' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Record Producers look like catalog items but create task-based records (like Incidents) instead of requested item records. They should NOT be used for requested item records — use catalog items for those. They support same-scope and cross-scope table access.',
  },
  {
    qNumber: 'MA32',
    section: '🛒 Multi-Answer: Service Catalog',
    questionText: 'Which of the following are true about Order Guides in the Service Catalog? (Select all that apply)',
    options: [
      { letter: 'A', text: 'They allow users to order multiple related items in one request' },
      { letter: 'B', text: 'They proactively suggest related items' },
      { letter: 'C', text: 'They always require manager approval before items are displayed' },
      { letter: 'D', text: 'They simplify decision-making for users' },
      { letter: 'E', text: 'They prevent users from missing needed items by suggesting related ones' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Order Guides allow ordering of multiple related items in one request, proactively suggest related items, simplify decision-making, and prevent users from missing needed items. They do not require mandatory manager approval just to display items.',
  },
  {
    qNumber: 'MA33',
    section: '🛒 Multi-Answer: Service Catalog',
    questionText: 'Which of the following are correct about the Order Field in Service Catalog? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It controls the sequence in which variables/items are displayed' },
      { letter: 'B', text: 'A lower order value means the item appears first' },
      { letter: 'C', text: 'Order 100 appears before Order 200' },
      { letter: 'D', text: 'A higher order value means the item appears first' },
      { letter: 'E', text: 'It is used to prioritize fulfillment tasks in the queue' },
    ],
    correctAnswers: ['A', 'B', 'C'],
    explanation: 'The Order Field controls display sequence, with lower values appearing first (Order 100 before Order 200). A higher order value does NOT appear first. The Order Field controls display sequence, not fulfillment queue prioritization.',
  },
  {
    qNumber: 'MA34',
    section: '🛒 Multi-Answer: Service Catalog',
    questionText: 'Which of the following are true about Flow Stages in the Service Catalog? (Select all that apply)',
    options: [
      { letter: 'A', text: 'They are a visual progress tracker for fulfillment' },
      { letter: 'B', text: 'They show the current state of a request as it moves through the process' },
      { letter: 'C', text: 'A request can only have one approval stage' },
      { letter: 'D', text: 'Stage Sets group related stages together for consistency' },
      { letter: 'E', text: 'They are configured in Workflow Studio' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Flow Stages are visual progress trackers showing the current request state. A request can have multiple approval rounds. Stage Sets group related stages. Flow Stages are configured in Workflow Studio.',
  },
  {
    qNumber: 'MA35',
    section: '🛒 Multi-Answer: Service Catalog',
    questionText: 'Which of the following are true about the Catalog Builder? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It is a visual, guided tool for creating and editing catalog items' },
      { letter: 'B', text: 'It is accessible to business users with no technical expertise' },
      { letter: 'C', text: 'It handles all complex catalog scenarios without limitation' },
      { letter: 'D', text: 'It allows delegation of catalog creation to teams' },
      { letter: 'E', text: 'Templates in Catalog Builder can predefine catalogs, categories, and variable types' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Catalog Builder is a visual tool accessible to business users that allows delegation and supports templates (catalogs, categories, variable types, portal configs). It is designed for common/simple use cases — complex scenarios still require catalog admin and traditional platform methods.',
  },
  {
    qNumber: 'MA36',
    section: '🛒 Multi-Answer: Service Catalog',
    questionText: 'Which of the following are capabilities of the Virtual Agent? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Uses natural language understanding to interpret queries' },
      { letter: 'B', text: 'Available 24/7 without human intervention' },
      { letter: 'C', text: 'Handles routine issues and common questions' },
      { letter: 'D', text: 'Only works within the ServiceNow platform (no external integrations)' },
      { letter: 'E', text: 'Integrates with Slack and Microsoft Teams' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Virtual Agent uses natural language understanding, is available 24/7, handles routine issues, and integrates with Slack and Microsoft Teams via ServiceNow adapters. It does have external integrations (not limited to the platform only).',
  },
  {
    qNumber: 'MA37',
    section: '🛒 Multi-Answer: Service Catalog',
    questionText: 'Which of the following are true about User Criteria in the Service Catalog? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It controls who can view specific catalog items or categories' },
      { letter: 'B', text: 'It controls who can contribute to specific catalog items or categories' },
      { letter: 'C', text: 'It can be applied from the item form, category form, or User Criteria form' },
      { letter: 'D', text: 'It uses a completely different concept than Knowledge Base User Criteria' },
      { letter: 'E', text: 'It follows the same Can Read / Can Contribute concept as Knowledge Base User Criteria' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Service Catalog User Criteria controls view and contribute access, can be applied from item/category/User Criteria forms, and follows the same concept as Knowledge Base User Criteria (Can Read / Can Contribute).',
  },
  {
    qNumber: 'MA38',
    section: '🛒 Multi-Answer: Service Catalog',
    questionText: 'What happens when a user places an order in the Service Catalog? (Select all that apply)',
    options: [
      { letter: 'A', text: 'A Request record is created' },
      { letter: 'B', text: 'Each catalog item generates its own set of tasks' },
      { letter: 'C', text: 'All items share a single task regardless of the number of items ordered' },
      { letter: 'D', text: 'Tasks with the same name can have different steps per item' },
      { letter: 'E', text: 'Each item\'s tasks are tracked independently' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'When an order is placed, a Request record is created. Each catalog item generates its own set of tasks (tracked independently). Tasks with the same name can have different steps per item. Items do NOT all share a single task.',
  },
  {
    qNumber: 'MA39',
    section: '🛒 Multi-Answer: Service Catalog',
    questionText: 'Which of the following are characteristics of Catalog Items in the Service Catalog? (Select all that apply)',
    options: [
      { letter: 'A', text: 'They are orderable products or services' },
      { letter: 'B', text: 'They generate a requested item record when ordered' },
      { letter: 'C', text: 'They can be shared across multiple catalogs' },
      { letter: 'D', text: 'They generate an Incident record when ordered' },
      { letter: 'E', text: 'They can be organized into categories with parent-child relationships' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Catalog Items are orderable products/services that generate requested item records (not Incidents — that\'s Record Producers). They can be shared across multiple catalogs and organized into parent-child categories.',
  },

  // =============================================
  // SECTION: Module 8 – Securing a ServiceNow Instance (HEAVY - 12 questions)
  // =============================================
  {
    qNumber: 'MA40',
    section: '🔐 Multi-Answer: Module 8 – Securing a ServiceNow Instance',
    questionText: 'Under the Shared Responsibility Model, which of the following are customer responsibilities? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Managing user access and enforcing role-based security' },
      { letter: 'B', text: 'Managing physical infrastructure security (data center hardware)' },
      { letter: 'C', text: 'Protecting sensitive data' },
      { letter: 'D', text: 'Applying updates and patches' },
      { letter: 'E', text: 'Monitoring for vulnerabilities' },
    ],
    correctAnswers: ['A', 'C', 'D', 'E'],
    explanation: 'Customers are responsible for managing user access, protecting sensitive data, applying updates/patches, and monitoring vulnerabilities. Physical infrastructure security is the responsibility of colocation providers.',
  },
  {
    qNumber: 'MA41',
    section: '🔐 Multi-Answer: Module 8 – Securing a ServiceNow Instance',
    questionText: 'Which of the following are encryption at rest options available in ServiceNow? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Column-based encryption (application-centric, specific fields)' },
      { letter: 'B', text: 'Volume-based encryption (full backend, broader protection)' },
      { letter: 'C', text: 'Row-level encryption (per-record protection)' },
      { letter: 'D', text: 'Customer-managed encryption keys' },
      { letter: 'E', text: 'Transport Layer Security (TLS)' },
    ],
    correctAnswers: ['A', 'B', 'D'],
    explanation: 'At rest encryption options include column-based (specific fields) and volume-based (full backend). Customer-managed keys are also supported. Row-level encryption is not listed. TLS is for data in transit, not at rest.',
  },
  {
    qNumber: 'MA42',
    section: '🔐 Multi-Answer: Module 8 – Securing a ServiceNow Instance',
    questionText: 'Which of the following are true about customer-managed encryption keys in ServiceNow? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Customers can withdraw their encryption keys' },
      { letter: 'B', text: 'Withdrawing keys renders the instance unusable' },
      { letter: 'C', text: 'Customers can resupply keys to restore access' },
      { letter: 'D', text: 'ServiceNow holds master copies of all customer keys by default' },
      { letter: 'E', text: 'Customers using customer-supplied keys must generate and transfer keys to their instance' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'With customer-managed keys, customers can withdraw keys (rendering the instance unusable) or resupply them to restore access. Customers generate and transfer keys themselves. ServiceNow does not hold master copies of customer keys by default.',
  },
  {
    qNumber: 'MA43',
    section: '🔐 Multi-Answer: Module 8 – Securing a ServiceNow Instance',
    questionText: 'Which of the following are correct about Key Management responsibilities? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Customers are responsible for segregation of duties for key management' },
      { letter: 'B', text: 'Dedicated roles include cryptographic management' },
      { letter: 'C', text: 'ServiceNow manages all encryption keys for customers automatically' },
      { letter: 'D', text: 'Dedicated roles include auditing and integration' },
      { letter: 'E', text: 'Dedicated roles include operations' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Customers are responsible for segregation of duties in key management with dedicated roles for cryptographic management, operations, auditing, and integration. ServiceNow does NOT automatically manage all encryption keys for customers.',
  },
  {
    qNumber: 'MA44',
    section: '🔐 Multi-Answer: Module 8 – Securing a ServiceNow Instance',
    questionText: 'Which of the following are correct about Infrastructure Logs in ServiceNow? (Select all that apply)',
    options: [
      { letter: 'A', text: 'They include network and server device logs' },
      { letter: 'B', text: 'They are not visible to customers (ServiceNow staff only)' },
      { letter: 'C', text: 'They are retained for 90 days (high-volume may be shorter)' },
      { letter: 'D', text: 'They include user login activity on the customer instance' },
      { letter: 'E', text: 'They capture unusual behavior and environment events' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Infrastructure Logs cover network/server devices, are visible only to ServiceNow staff, are retained for 90 days (shorter for high volume), and capture unusual behavior/environment events. User login activity is captured in Customer Application Logs, which ARE visible to customers.',
  },
  {
    qNumber: 'MA45',
    section: '🔐 Multi-Answer: Module 8 – Securing a ServiceNow Instance',
    questionText: 'Which of the following are true about Transaction Logs in ServiceNow? (Select all that apply)',
    options: [
      { letter: 'A', text: 'They are the most detailed level of logging' },
      { letter: 'B', text: 'They record every click, view, and action' },
      { letter: 'C', text: 'They are automatically archived and never need manual review' },
      { letter: 'D', text: 'Monitoring them is the customer\'s responsibility' },
      { letter: 'E', text: 'They are part of Customer Application Logs' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Transaction Logs are the most detailed — recording every click, view, and action. Monitoring them is the customer\'s responsibility. They are part of Customer Application Logs. They should be monitored regularly, NOT just auto-archived.',
  },
  {
    qNumber: 'MA46',
    section: '🔐 Multi-Answer: Module 8 – Securing a ServiceNow Instance',
    questionText: 'Which of the following are correct about ServiceNow patching and releases? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Patches are released monthly' },
      { letter: 'B', text: 'Major releases occur twice per year' },
      { letter: 'C', text: 'Hotfixes are continuous throughout a release\'s supported lifetime' },
      { letter: 'D', text: 'Customers do not control when patches are applied to their instance' },
      { letter: 'E', text: 'Patches address bugs, performance issues, and security' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Patches are monthly, major releases are twice a year, hotfixes are continuous. Patches address bugs, performance, and security. Customers DO schedule their own patching — they are not forced onto a schedule.',
  },
  {
    qNumber: 'MA47',
    section: '🔐 Multi-Answer: Module 8 – Securing a ServiceNow Instance',
    questionText: 'Which of the following are requirements for Named Security Contacts? (Select all that apply)',
    options: [
      { letter: 'A', text: 'They must be authorized to handle sensitive security matters' },
      { letter: 'B', text: 'They must always be reachable' },
      { letter: 'C', text: 'They must be kept up to date in the Now Support portal' },
      { letter: 'D', text: 'Only one individual contact is allowed per organization' },
      { letter: 'E', text: 'Best practice includes both an email distribution list and an individual contact' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Named Security Contacts must be authorized, always reachable, and kept up to date. Best practice recommends BOTH an email distribution list AND an individual contact (not just one individual).',
  },
  {
    qNumber: 'MA48',
    section: '🔐 Multi-Answer: Module 8 – Securing a ServiceNow Instance',
    questionText: 'Which of the following are customer responsibilities for data management? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Managing how data is collected and stored' },
      { letter: 'B', text: 'Managing how data is used and shared' },
      { letter: 'C', text: 'Managing how data is archived and destroyed' },
      { letter: 'D', text: 'Ensuring ServiceNow infrastructure meets customer data laws' },
      { letter: 'E', text: 'Ensuring accuracy and confidentiality of data' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Customers are responsible for how data is collected, stored, used, shared, archived, and destroyed, as well as ensuring its accuracy and confidentiality. ServiceNow is responsible for infrastructure compliance, not the customer.',
  },
  {
    qNumber: 'MA49',
    section: '🔐 Multi-Answer: Module 8 – Securing a ServiceNow Instance',
    questionText: 'Which of the following are responsibilities of ServiceNow (not the customer) in the Shared Responsibility Model? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Infrastructure security' },
      { letter: 'B', text: 'Platform updates' },
      { letter: 'C', text: 'Configure user access controls' },
      { letter: 'D', text: 'Compliance (platform-level)' },
      { letter: 'E', text: 'Managing individual customer security settings' },
    ],
    correctAnswers: ['A', 'B', 'D'],
    explanation: 'ServiceNow is responsible for infrastructure security, platform updates, and platform-level compliance. Configuring user access controls and managing security settings are customer responsibilities.',
  },
  {
    qNumber: 'MA50',
    section: '🔐 Multi-Answer: Module 8 – Securing a ServiceNow Instance',
    questionText: 'Which of the following are correct about the Security Center included with the Now Platform? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It is included at no additional cost' },
      { letter: 'B', text: 'It helps admins manage and monitor instance security proactively' },
      { letter: 'C', text: 'It provides tools for applying updates, patches, and configuring security settings' },
      { letter: 'D', text: 'It requires a separate licensing agreement' },
      { letter: 'E', text: 'It reduces the burden of manually tracking security configurations' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Security Center is included with the Now Platform at no additional cost. It helps admins proactively manage/monitor security, provides tools for updates/patches/settings, and reduces manual tracking burden. No separate license is required.',
  },
  {
    qNumber: 'MA51',
    section: '🔐 Multi-Answer: Module 8 – Securing a ServiceNow Instance',
    questionText: 'Which of the following are correct about Customer Application Logs? (Select all that apply)',
    options: [
      { letter: 'A', text: 'They are generated by individual customer instances' },
      { letter: 'B', text: 'They are visible and downloadable by customers' },
      { letter: 'C', text: 'They include examples such as user logins and failed logins' },
      { letter: 'D', text: 'They are retained for exactly 90 days always' },
      { letter: 'E', text: 'They include privilege escalation events' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Customer Application Logs come from individual instances, are visible/downloadable by customers, and include user logins, failed logins, and privilege escalations. The 90-day retention applies to Infrastructure Logs (not Customer Application Logs — those are customer managed).',
  },

  // =============================================
  // SECTION: Security Center (HEAVY - 15 questions)
  // =============================================
  {
    qNumber: 'MA52',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'Which of the following are key pages or features of the Security Center? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Hardening' },
      { letter: 'B', text: 'Scanner' },
      { letter: 'C', text: 'Customer Actions' },
      { letter: 'D', text: 'CMDB Workspace' },
      { letter: 'E', text: 'Best Practices' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Security Center key pages include Hardening, Scanner, Customer Actions, Best Practices, Notifications, Metrics, and Learning. The CMDB Workspace is part of CMDB, not the Security Center.',
  },
  {
    qNumber: 'MA53',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'Which of the following are correct about the Hardening Compliance Score? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It is a whole number percentage between 0 and 100' },
      { letter: 'B', text: 'It dynamically updates whenever a configuration changes' },
      { letter: 'C', text: 'Each setting has an impact score between 0 and 1' },
      { letter: 'D', text: 'You should start by reviewing low-priority non-compliance settings' },
      { letter: 'E', text: 'It reflects adherence to ServiceNow\'s recommended configurations' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'The Hardening Compliance Score is a whole number (0–100%), dynamically updated, with each setting having an impact score between 0 and 1, reflecting adherence to ServiceNow recommendations. You should start by reviewing CRITICAL and HIGH non-compliance settings first (not low-priority).',
  },
  {
    qNumber: 'MA54',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'Which tabs are available in the Hardening section of the Security Center? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Score Comparison' },
      { letter: 'B', text: 'Score Trends' },
      { letter: 'C', text: 'All Settings' },
      { letter: 'D', text: 'Patch History' },
      { letter: 'E', text: 'Impact by Priority' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'The Hardening section contains: Score Comparison, Score Trends, All Settings, Impact by Priority, and Impact by Security Area. "Patch History" is not one of the listed Hardening tabs.',
  },
  {
    qNumber: 'MA55',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'What does the Security Center Scanner detect? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Misconfigurations' },
      { letter: 'B', text: 'Overprovisioned access' },
      { letter: 'C', text: 'Insecure behaviors' },
      { letter: 'D', text: 'Outdated Knowledge Base articles' },
      { letter: 'E', text: 'Vulnerabilities in instance settings' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'The Scanner detects misconfigurations, overprovisioned access, insecure behaviors, and vulnerabilities. Outdated KB articles are a Knowledge Management concern, not a Security Center Scanner function.',
  },
  {
    qNumber: 'MA56',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'Which of the following are sections of the Security Center Scanner? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Comparison' },
      { letter: 'B', text: 'Checks' },
      { letter: 'C', text: 'Suites' },
      { letter: 'D', text: 'User Criteria' },
      { letter: 'E', text: 'Findings' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Scanner sections include: Comparison, Checks, Suites, Results, and Findings. "User Criteria" is a Knowledge Base / Service Catalog access control concept, not a Scanner section.',
  },
  {
    qNumber: 'MA57',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'What are the correct steps to create a Custom Suite in the Security Center Scanner? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Go to Suites and click New' },
      { letter: 'B', text: 'Provide a title and description' },
      { letter: 'C', text: 'Go to Check section and select specific checks' },
      { letter: 'D', text: 'Submit the suite for ServiceNow approval before executing' },
      { letter: 'E', text: 'Execute the scan and review the Scan Findings tab' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Creating a custom suite involves: Suites → New → provide title & description → Check section → select checks → execute scan → review Scan Findings tab. There is no submission to ServiceNow for approval.',
  },
  {
    qNumber: 'MA58',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'Which of the following are true about Customer Actions in the Security Center? (Select all that apply)',
    options: [
      { letter: 'A', text: 'They are a proactive list of issues needing attention' },
      { letter: 'B', text: 'They cover deprecated configurations' },
      { letter: 'C', text: 'They track action status including Overdue, Due Soon, and In Progress' },
      { letter: 'D', text: 'They automatically fix issues without administrator intervention' },
      { letter: 'E', text: 'Each action has detailed steps and a workflow to resolve the issue' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Customer Actions are proactive nudges for deprecated/unnecessary settings, showing statuses (Available, Overdue, Due Soon, In Progress, Complete). Each action has detailed steps and a workflow. They do NOT auto-fix issues — administrator action is required.',
  },
  {
    qNumber: 'MA59',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'Which of the following are features of the Best Practices section in the Security Center? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It is the starting point for foundational security setup' },
      { letter: 'B', text: 'It includes a Completed Settings widget to track configured settings' },
      { letter: 'C', text: 'It generates automated security reports for regulators' },
      { letter: 'D', text: 'It shows a bar chart of progress by step' },
      { letter: 'E', text: 'You must complete all task steps to fully implement a best practice' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Best Practices is the starting point for foundational security setup. It features a Completed Settings widget, bar chart of progress, and detailed settings list. All task steps must be completed. It does NOT generate automated regulatory reports.',
  },
  {
    qNumber: 'MA60',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'Which of the following can be configured in the Notifications section of the Security Center? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Alerting policies for when thresholds or events are met' },
      { letter: 'B', text: 'Conditional logic for when notifications are triggered' },
      { letter: 'C', text: 'Automatic remediation of security issues upon alert' },
      { letter: 'D', text: 'Roles that trigger notifications' },
      { letter: 'E', text: 'Who receives notifications (groups or individuals)' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Security Center Notifications allow configuring alerting policies, conditional logic, triggering roles, and recipients (groups or individuals). Automatic remediation of security issues is not a notification feature.',
  },
  {
    qNumber: 'MA61',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'Which of the following are correct about the Metrics section of the Security Center? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It monitors security KPIs' },
      { letter: 'B', text: 'It can detect threats, risky behaviors, and patterns' },
      { letter: 'C', text: 'It supports custom dashboards and widgets' },
      { letter: 'D', text: 'It only displays data from the last 24 hours' },
      { letter: 'E', text: 'It allows setting thresholds that trigger auto-alerts when exceeded' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Metrics monitors security KPIs, detects threats/risky behaviors/patterns, supports custom dashboards and widgets, and allows threshold-based auto-alerts. It is not limited to 24-hour data only.',
  },
  {
    qNumber: 'MA62',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'Which of the following are correct about the recommended review cadence for Security Center? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Monthly reviews are recommended to address questions and evaluate pending configurations' },
      { letter: 'B', text: 'Quarterly review is the minimum for a full security review' },
      { letter: 'C', text: 'UAT should always be performed in sub-production before applying to production' },
      { letter: 'D', text: 'Annual reviews are sufficient for most organizations' },
      { letter: 'E', text: 'Reviews should include account teams and the ServiceNow Security team' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Monthly reviews are recommended, quarterly is the minimum. UAT must always be in sub-production first. Reviews should include account teams and the ServiceNow Security team. Annual reviews are NOT sufficient — quarterly is the minimum.',
  },
  {
    qNumber: 'MA63',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'Which of the following are correct about Security Center updates? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Security Center updates are released twice a year' },
      { letter: 'B', text: 'You should test updates in sub-production before applying to production' },
      { letter: 'C', text: 'Updates are automatically applied without any administrator action' },
      { letter: 'D', text: 'To check for updates: search Security Center → Sync apps → Install → Refresh browser' },
      { letter: 'E', text: 'Regular family releases also occur in addition to the twice-yearly major updates' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Security Center updates are released twice a year plus regular family releases. Test in sub-production first. To update: All menu → Search "Security Center" → Sync apps → Install → Refresh browser. Updates are NOT automatic — admin action is required.',
  },
  {
    qNumber: 'MA64',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'Which of the following Security Center resources are listed as key references? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Cloud Security Resource page' },
      { letter: 'B', text: 'Shared Responsibility Model document' },
      { letter: 'C', text: 'ServiceNow Employee Handbook' },
      { letter: 'D', text: 'Security Center Docs site' },
      { letter: 'E', text: 'Securing the Now Platform white paper' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Key security resources include: Cloud Security Resource page, Shared Responsibility Model doc, Security Center Docs site, Securing the Now Platform white paper, and Security Best Practices Guide. The Employee Handbook is not a security reference tool.',
  },
  {
    qNumber: 'MA65',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'What can you do using the Security Center Hub Overview? (Select all that apply)',
    options: [
      { letter: 'A', text: 'View centralized security tasks' },
      { letter: 'B', text: 'See the hardening compliance score' },
      { letter: 'C', text: 'Perform basic security configurations' },
      { letter: 'D', text: 'Manage billing and subscription settings' },
      { letter: 'E', text: 'Access the Security Posture console' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Hub Overview provides centralized security tasks, hardening compliance score, basic configs, and access to the Security Posture console. Billing and subscription management is not a Security Center function.',
  },
  {
    qNumber: 'MA66',
    section: '🛡️ Multi-Answer: Security Center',
    questionText: 'An admin notices a spike in failed logins. What does this indicate according to Security Center Metrics guidance, and what should they do? (Select all that apply)',
    options: [
      { letter: 'A', text: 'A spike in failed logins is a potential indicator of unauthorized access' },
      { letter: 'B', text: 'Metrics thresholds can be configured to auto-alert when this is detected' },
      { letter: 'C', text: 'The admin should ignore it as ServiceNow will handle it automatically' },
      { letter: 'D', text: 'The admin should drill into detailed reports for related records' },
      { letter: 'E', text: 'Failed login spikes are tracked in the Metrics section of Security Center' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'A spike in failed logins = potential unauthorized access. Thresholds can be set to auto-alert. Admins should drill into detailed reports. The Metrics section tracks this. ServiceNow does NOT automatically handle it — the customer must monitor and respond.',
  },

  // =============================================
  // SECTION: Access Control & Security (supporting - 6 questions)
  // =============================================
  {
    qNumber: 'MA67',
    section: '🔐 Multi-Answer: Access Control & ACLs',
    questionText: 'Which of the following are the three layers of security in ServiceNow? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Users, Groups & Roles' },
      { letter: 'B', text: 'Application & Module Access' },
      { letter: 'C', text: 'Network Firewall Rules' },
      { letter: 'D', text: 'ACLs & System Properties' },
      { letter: 'E', text: 'Physical Data Center Access' },
    ],
    correctAnswers: ['A', 'B', 'D'],
    explanation: 'The three ServiceNow security layers are: (1) Users, Groups & Roles, (2) Application & Module Access, and (3) ACLs & System Properties. Network firewall rules and physical access are infrastructure concerns, not application-layer security in ServiceNow.',
  },
  {
    qNumber: 'MA68',
    section: '🔐 Multi-Answer: Access Control & ACLs',
    questionText: 'Which of the following ACL operations go beyond standard CRUD? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Execute (running scripts)' },
      { letter: 'B', text: 'Save As Template' },
      { letter: 'C', text: 'Report On' },
      { letter: 'D', text: 'Import (importing data via Transform Maps)' },
      { letter: 'E', text: 'Personalized Choices' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Beyond CRUD, ACL operations include Execute (running scripts), Save As Template, Report On, and Personalized Choices (right-clicking choice fields). "Import" is not listed as a distinct ACL operation in the notes.',
  },
  {
    qNumber: 'MA69',
    section: '🔐 Multi-Answer: Access Control & ACLs',
    questionText: 'Which of the following are true about the Security Admin (elevated privileges) role? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It is used for higher security tasks like modifying ACLs' },
      { letter: 'B', text: 'It is indicated by an upward arrow icon next to the avatar' },
      { letter: 'C', text: 'All system administrators have it by default' },
      { letter: 'D', text: 'Only the default system administrator has it by default' },
      { letter: 'E', text: 'It must be explicitly granted to other admin users' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'The Security Admin role is for high-security tasks (like modifying ACLs), shown by an upward arrow icon, held only by the default system administrator by default, and must be explicitly granted to others. NOT all admins have it by default.',
  },
  {
    qNumber: 'MA70',
    section: '🔐 Multi-Answer: Access Control & ACLs',
    questionText: 'Which of the following correctly describe ACL evaluation order? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Deny rules are evaluated before allow rules' },
      { letter: 'B', text: 'If any deny condition is NOT met, access is denied immediately' },
      { letter: 'C', text: 'Table-level ACLs are evaluated before field-level ACLs' },
      { letter: 'D', text: 'Allow rules take priority over deny rules' },
      { letter: 'E', text: 'User must have table access confirmed before field-level permissions are checked' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'ACL evaluation: deny rules first (if any deny condition fails → access denied immediately), table-level before field-level, and table access must be confirmed before field-level checks. Deny rules ALWAYS take priority over allow rules (not the other way around).',
  },
  {
    qNumber: 'MA71',
    section: '🔐 Multi-Answer: Access Control & ACLs',
    questionText: 'Which of the following are true about auto-generated ACLs in ServiceNow? (Select all that apply)',
    options: [
      { letter: 'A', text: 'When a new table is created, ServiceNow auto-generates ACLs for it' },
      { letter: 'B', text: 'It is rare to find a table with no ACL rules' },
      { letter: 'C', text: 'Creating a table also creates an associated user role for it' },
      { letter: 'D', text: 'Auto-generated ACLs must be manually removed after table creation' },
      { letter: 'E', text: 'System properties deny access by default — permissions must be explicitly granted' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'ServiceNow auto-generates ACLs when a new table is created and also creates an associated user role. It is rare to find tables with no ACL rules. System properties deny by default — you must explicitly grant. Auto-generated ACLs do NOT need to be manually removed.',
  },
  {
    qNumber: 'MA72',
    section: '🔐 Multi-Answer: Access Control & ACLs',
    questionText: 'What does a wildcard ACL rule (table.*) do? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It applies to all fields NOT covered by a specific table.field ACL rule' },
      { letter: 'B', text: 'It acts as a catch-all for remaining fields' },
      { letter: 'C', text: 'It reduces the total number of ACLs needed' },
      { letter: 'D', text: 'Adding a specific table.field ACL can unintentionally remove wildcard access for some roles' },
      { letter: 'E', text: 'It applies to the entire table with no field-specific rules' },
    ],
    correctAnswers: ['A', 'B', 'C', 'D'],
    explanation: 'The wildcard (table.*) applies to all fields NOT covered by specific table.field rules, acts as a catch-all, reduces ACL count, and adding a specific table.field ACL can unintentionally remove wildcard access for some roles. table.none (not table.*) applies to the entire table with no field-specific rules.',
  },

  // =============================================
  // SECTION: Table Administration (supporting - 5 questions)
  // =============================================
  {
    qNumber: 'MA73',
    section: '🗄️ Multi-Answer: Table Administration',
    questionText: 'Which of the following are field types available in ServiceNow? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Reference (links to one specific table)' },
      { letter: 'B', text: 'Document ID (links to any table)' },
      { letter: 'C', text: 'Glide List (select multiple records from one table)' },
      { letter: 'D', text: 'Multi-Table (links to multiple tables simultaneously)' },
      { letter: 'E', text: 'Journal (free-form text/notes)' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Valid ServiceNow field types include Reference, Document ID, Glide List, Journal, Choice, and Date/Time. "Multi-Table" is not a valid field type — use Document ID if the source table may vary.',
  },
  {
    qNumber: 'MA74',
    section: '🗄️ Multi-Answer: Table Administration',
    questionText: 'Which of the following are inherited when a child table extends a parent table? (Select all that apply)',
    options: [
      { letter: 'A', text: 'All fields' },
      { letter: 'B', text: 'Business Rules' },
      { letter: 'C', text: 'Access Controls (ACLs)' },
      { letter: 'D', text: 'The parent table\'s sys_id (record ID)' },
      { letter: 'E', text: 'UI Policies and Client Scripts' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Child tables inherit: all fields, mandatory field rules, Business Rules, ACLs, UI Policies, and Client Scripts. The parent\'s sys_id is NOT inherited — each record has its own unique sys_id.',
  },
  {
    qNumber: 'MA75',
    section: '🗄️ Multi-Answer: Table Administration',
    questionText: 'Which of the following are true about the Task table in ServiceNow? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It is a Core table (pre-installed with ServiceNow)' },
      { letter: 'B', text: 'It is a Base table (root of hierarchy, doesn\'t extend another table)' },
      { letter: 'C', text: 'It is a Parent table (has child tables extending from it)' },
      { letter: 'D', text: 'It is a Child table (extends another table)' },
      { letter: 'E', text: 'Incident, Problem, and Change Request all extend the Task table' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'The Task table is simultaneously Core (pre-installed), Base (doesn\'t extend any table), and Parent (has children like Incident, Problem, Change). It is NOT a child table — it is the root.',
  },
  {
    qNumber: 'MA76',
    section: '🗄️ Multi-Answer: Table Administration',
    questionText: 'Which of the following are Admin tools for managing tables in ServiceNow? (Select all that apply)',
    options: [
      { letter: 'A', text: 'System Dictionary' },
      { letter: 'B', text: 'Tables module' },
      { letter: 'C', text: 'Schema Map' },
      { letter: 'D', text: 'CI Class Manager' },
      { letter: 'E', text: 'Number Maintenance App' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Admin tools for tables include: System Dictionary, Tables module, Tables & Columns module, Schema Map, and Number Maintenance App. CI Class Manager is a CMDB-specific tool for managing CI class hierarchies, not general table administration.',
  },
  {
    qNumber: 'MA77',
    section: '🗄️ Multi-Answer: Table Administration',
    questionText: 'Which of the following correctly describe the Schema Map color coding? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Yellow = the focused/selected table' },
      { letter: 'B', text: 'Blue bar = tables that extend the focused table (children)' },
      { letter: 'C', text: 'Red bar = tables that are referenced by the focused table' },
      { letter: 'D', text: 'Green = tables with the most data records' },
      { letter: 'E', text: 'Red bar = tables being referenced (not extending)' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Schema Map colors: Yellow = focused table, Blue = child tables (extend the focused table), Red = referenced tables (the focused table references them). Green has no special meaning in Schema Map coloring. C and E both correctly describe the red bar\'s meaning.',
  },

  // =============================================
  // SECTION: Workflow Studio (supporting - 5 questions)
  // =============================================
  {
    qNumber: 'MA78',
    section: '⚙️ Multi-Answer: Workflow Studio & Automation',
    questionText: 'Which of the following are trigger types available in Workflow Studio? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Record-based (when a record is created, updated, or deleted)' },
      { letter: 'B', text: 'Date-based (at a specific date/time, daily, weekly, monthly)' },
      { letter: 'C', text: 'User-based (when a specific user logs in)' },
      { letter: 'D', text: 'Application-based (when a specific app spoke is activated)' },
      { letter: 'E', text: 'Location-based (when a user logs in from a specific country)' },
    ],
    correctAnswers: ['A', 'B', 'D'],
    explanation: 'Workflow Studio supports three trigger types: Record-based, Date-based, and Application-based. User-based login triggers and location-based triggers are not listed in the notes.',
  },
  {
    qNumber: 'MA79',
    section: '⚙️ Multi-Answer: Workflow Studio & Automation',
    questionText: 'Which of the following are correct about Spokes in Workflow Studio? (Select all that apply)',
    options: [
      { letter: 'A', text: 'A spoke is a bundle of triggers and actions for a specific application' },
      { letter: 'B', text: 'Spokes are activated when the parent application is activated' },
      { letter: 'C', text: 'The ITSM spoke includes a "Create Task" action' },
      { letter: 'D', text: 'All spokes are installed by default with ServiceNow' },
      { letter: 'E', text: 'Extra spokes are available in the ServiceNow Store' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Spokes bundle triggers & actions for specific apps, activate with the parent app, ITSM spoke includes Create Task, and extra spokes are in the ServiceNow Store. NOT all spokes are installed by default — they must be activated or obtained from the Store.',
  },
  {
    qNumber: 'MA80',
    section: '⚙️ Multi-Answer: Workflow Studio & Automation',
    questionText: 'Which of the following are correct about Data Pills in Workflow Studio? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Data Pills are pieces of data generated by triggers or actions in a flow' },
      { letter: 'B', text: 'They can be added by drag and drop from the Data section' },
      { letter: 'C', text: 'They can be added using the Data Pill Picker icon' },
      { letter: 'D', text: 'Runtime values change throughout the flow based on conditions' },
      { letter: 'E', text: 'Dot-walking in the Data Pill Picker uses arrow keys' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Data Pills are generated by triggers/actions, added via drag & drop or the Data Pill Picker, and dot-walking uses arrow keys. Runtime values stay STABLE throughout the flow (they do NOT change based on conditions mid-flow).',
  },
  {
    qNumber: 'MA81',
    section: '⚙️ Multi-Answer: Workflow Studio & Automation',
    questionText: 'Which of the following are correct about Integration Hub? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It enables integrations with external systems using common protocols' },
      { letter: 'B', text: 'Developers can build custom integrations packaged as reusable actions' },
      { letter: 'C', text: 'It is included with all ServiceNow licenses at no extra cost' },
      { letter: 'D', text: 'It supports data transfers and external API triggers' },
      { letter: 'E', text: 'It requires a separate subscription' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Integration Hub enables external integrations, allows custom reusable action development, supports data transfers and API triggers, and requires a SEPARATE subscription. It is NOT included at no extra cost.',
  },
  {
    qNumber: 'MA82',
    section: '⚙️ Multi-Answer: Workflow Studio & Automation',
    questionText: 'Which of the following correctly describe Playbooks in ServiceNow? (Select all that apply)',
    options: [
      { letter: 'A', text: 'They automate and streamline processes using existing ServiceNow capabilities' },
      { letter: 'B', text: 'They can automate notifications, record creation, and approvals' },
      { letter: 'C', text: 'They are built on the same technology as Workflow Studio' },
      { letter: 'D', text: 'They replace Workflow Studio entirely' },
      { letter: 'E', text: 'They guide users through processes with consistency and efficiency' },
    ],
    correctAnswers: ['A', 'B', 'C', 'E'],
    explanation: 'Playbooks automate processes, can handle notifications/record creation/approvals, are built on Workflow Studio technology, and guide users with consistency. They do NOT replace Workflow Studio — they integrate with it.',
  },

  // =============================================
  // SECTION: Update Sets & Migration (supporting - 5 questions)
  // =============================================
  {
    qNumber: 'MA83',
    section: '📦 Multi-Answer: Update Sets & Migration',
    questionText: 'Which of the following are captured in an Update Set? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Customizations and configuration changes' },
      { letter: 'B', text: 'UI policies, business rules, and client scripts' },
      { letter: 'C', text: 'Actual incident and change records (data)' },
      { letter: 'D', text: 'Workflows and flows' },
      { letter: 'E', text: 'Report definitions (data source, visualization type, style)' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Update Sets capture: customizations/config changes, UI policies/business rules/client scripts, workflows & flows, and report definitions. Actual data records (incidents, changes) are NOT captured — use Export XML for data records.',
  },
  {
    qNumber: 'MA84',
    section: '📦 Multi-Answer: Update Sets & Migration',
    questionText: 'Which of the following are Update Set best practices? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Never use the default update set for migrations' },
      { letter: 'B', text: 'Mark update sets as complete only when fully ready' },
      { letter: 'C', text: 'You can revert a completed update set back to In-Progress if needed' },
      { letter: 'D', text: 'Create a new update set for additional changes instead of reopening completed ones' },
      { letter: 'E', text: 'Commit update sets in chronological order' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Best practices: never use the default update set, mark complete only when ready, create new sets for additional changes, commit in chronological order. Once marked Complete, you CANNOT revert back to In-Progress.',
  },
  {
    qNumber: 'MA85',
    section: '📦 Multi-Answer: Update Sets & Migration',
    questionText: 'Which of the following are the steps to apply an Update Set? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Retrieve — pull the update set from the source instance' },
      { letter: 'B', text: 'Preview — compare update set vs local instance to detect conflicts' },
      { letter: 'C', text: 'Approve — get ServiceNow\'s sign-off before applying' },
      { letter: 'D', text: 'Commit — apply changes to the target instance' },
      { letter: 'E', text: 'For remote instances, preview happens automatically during retrieval' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'The 3 steps are: Retrieve → Preview → Commit. For remote instances, preview happens automatically during retrieval. There is no "Approve from ServiceNow" step — approval is an internal organizational process, not a ServiceNow platform step.',
  },
  {
    qNumber: 'MA86',
    section: '📦 Multi-Answer: Update Sets & Migration',
    questionText: 'Which of the following are correct about Application Scope in ServiceNow? (Select all that apply)',
    options: [
      { letter: 'A', text: 'It ensures apps operate independently and securely' },
      { letter: 'B', text: 'An app can access and modify its own tables and logic by default' },
      { letter: 'C', text: 'Scoped apps cannot interact with any other apps under any circumstances' },
      { letter: 'D', text: 'Global Scope allows unrestricted interaction between applications' },
      { letter: 'E', text: 'Application Scope adds a namespace identifier to tables, scripts, and config records' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'Application Scope ensures independence, allows apps to access their own resources by default, adds namespace identifiers, and Global Scope allows unrestricted interaction. Scoped apps CAN interact with other apps when explicitly permitted.',
  },
  {
    qNumber: 'MA87',
    section: '📦 Multi-Answer: Update Sets & Migration',
    questionText: 'Which of the following are correct about a good Update Set naming convention? (Select all that apply)',
    options: [
      { letter: 'A', text: 'Include your initials (who created it)' },
      { letter: 'B', text: 'Include the story or task number for traceability' },
      { letter: 'C', text: 'Include only the date and time of creation' },
      { letter: 'D', text: 'Include descriptive keywords explaining the purpose' },
      { letter: 'E', text: 'For sequenced sets, use Version 2, Version 3 suffixes' },
    ],
    correctAnswers: ['A', 'B', 'D', 'E'],
    explanation: 'A good update set name includes: your initials, the story/task number (traceability), and descriptive keywords (e.g., VK-INC-4521-Incident-Form-Customizations). For sequenced sets, use Version 2, Version 3 suffixes. The date/time alone is not sufficient.',
  },
];

async function main() {
  console.log(`🚀 Seeding ${multiAnswerQuestions.length} multiple-answer questions into exam ID 2...`);

  let added = 0;
  for (const q of multiAnswerQuestions) {
    // Build options array
    const optionsMap = {};
    q.options.forEach(o => { optionsMap[o.letter] = o.text; });

    // Check if question already exists
    const exists = await prisma.question.findFirst({
      where: { qNumber: q.qNumber, examId: 2 }
    });

    if (exists) {
      console.log(`  ⏭️  Skipping ${q.qNumber} — already exists`);
      continue;
    }

    await prisma.question.create({
      data: {
        examId: 2,
        qNumber: q.qNumber,
        section: q.section,
        questionText: q.questionText,
        optionA: optionsMap['A'] || null,
        optionB: optionsMap['B'] || null,
        optionC: optionsMap['C'] || null,
        optionD: optionsMap['D'] || null,
        optionE: optionsMap['E'] || null,
        optionF: optionsMap['F'] || null,
        optionG: optionsMap['G'] || null,
        correctAnswer: q.correctAnswers.join(','), // e.g. "A,C,D,E"
        explanation: q.explanation,
      }
    });
    added++;
    if (added % 10 === 0) console.log(`  ✅ Added ${added} questions...`);
  }

  console.log(`\n✅ Done! Added ${added} new multiple-answer questions to exam 2.`);
  console.log(`📊 Topic distribution:`);
  console.log(`   - CMDB, Discovery & Service Mapping: 15 questions`);
  console.log(`   - Module 5 – Self-Service: 12 questions`);
  console.log(`   - Service Catalog: 12 questions`);
  console.log(`   - Module 8 – Security: 12 questions`);
  console.log(`   - Security Center: 15 questions`);
  console.log(`   - Access Control & ACLs: 6 questions`);
  console.log(`   - Table Administration: 5 questions`);
  console.log(`   - Workflow Studio: 5 questions`);
  console.log(`   - Update Sets & Migration: 5 questions`);
  console.log(`   TOTAL: 87 multiple-answer questions`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
