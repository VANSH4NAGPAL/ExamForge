import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Human-readable titles for the modules based on filenames
const topicTitles = {
  // CSA
  'form_configuration_notes': 'Form Configuration',
  'advanced_configuration_notes': 'Advanced Configuration',
  'module4_table_administration_notes': 'Table Administration',
  'application_access_control_notes': 'Access Control',
  'import_sets_notes': 'Import Sets',
  'cmdb_discovery_service_mapping_notes': 'CMDB & Discovery',
  'module5_self_service_notes': 'Configure Self-Service',
  'service_catalog_notes': 'Service Catalog',
  'workflow_studio_notes': 'Workflow Studio',
  'module6_enable_productivity_notes': 'Enable Productivity',
  'notifications_notes': 'Notifications',
  'plugins_nowassist_collaboration_notes': 'Plugins & Now Assist',
  'module7_scripting_utilities_notes': 'Scripting Utilities',
  'migration_update_sets_notes': 'Migration & Update Sets',
  'module8_security_notes': 'Securing Instance',
  'security_center_notes': 'Security Center',
  // CAD
  'scripting_overview_notes': 'SSNF - Scripting Overview',
  'client_scripts_notes': 'SSNF - Client Scripts',
  'ui_policies_notes': 'SSNF - UI Policies',
  'business_rules_notes': 'SSNF - Business Rules',
  'glide_system_notes': 'SSNF - GlideSystem',
  'glide_record_notes': 'SSNF - GlideRecord',
  'script_includes_notes': 'SSNF - Script Includes',
  'flow_designer_scripting_notes': 'SSNF - Flow Designer Scripting'
};

// Nice icons for each topic
const topicIcons = {
  // CSA
  'form_configuration_notes': 'LayoutTemplate',
  'advanced_configuration_notes': 'Settings',
  'module4_table_administration_notes': 'Database',
  'application_access_control_notes': 'ShieldCheck',
  'import_sets_notes': 'UploadCloud',
  'cmdb_discovery_service_mapping_notes': 'Network',
  'module5_self_service_notes': 'UserCheck',
  'service_catalog_notes': 'ShoppingCart',
  'workflow_studio_notes': 'GitMerge',
  'module6_enable_productivity_notes': 'Zap',
  'notifications_notes': 'Bell',
  'plugins_nowassist_collaboration_notes': 'Bot',
  'module7_scripting_utilities_notes': 'Code',
  'migration_update_sets_notes': 'PackageOpen',
  'module8_security_notes': 'Lock',
  'security_center_notes': 'Shield',
  // CAD
  'scripting_overview_notes': 'BookOpen',
  'client_scripts_notes': 'Terminal',
  'ui_policies_notes': 'Shield',
  'business_rules_notes': 'Server',
  'glide_system_notes': 'Cpu',
  'glide_record_notes': 'Database',
  'script_includes_notes': 'Code',
  'flow_designer_scripting_notes': 'GitMerge'
};

const cadOrder = [
  'scripting_overview_notes',
  'client_scripts_notes',
  'ui_policies_notes',
  'business_rules_notes',
  'glide_system_notes',
  'glide_record_notes',
  'script_includes_notes',
  'flow_designer_scripting_notes'
];

export function getAllNotes(type = 'csa') {
  const notesDirectory = path.join(process.cwd(), `content/notes/${type}`);
  if (!fs.existsSync(notesDirectory)) return [];
  
  const fileNames = fs.readdirSync(notesDirectory);
  const allNotesData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(notesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const matterResult = matter(fileContents);
      
      return {
        id,
        slug: id,
        title: topicTitles[id] || id.replace(/_/g, ' '),
        icon: topicIcons[id] || 'BookOpen',
        ...matterResult.data
      };
    });

  // Sort them loosely by how they appear in the course (module numbers if present)
  return allNotesData.sort((a, b) => {
    if (type === 'cad') {
      const aIndex = cadOrder.indexOf(a.id);
      const bIndex = cadOrder.indexOf(b.id);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
    }
    const aMod = a.id.match(/module(\d+)/);
    const bMod = b.id.match(/module(\d+)/);
    if (aMod && bMod) return parseInt(aMod[1]) - parseInt(bMod[1]);
    if (aMod) return 1;
    if (bMod) return -1;
    return a.title.localeCompare(b.title);
  });
}

export function getNoteData(id, type = 'csa') {
  const notesDirectory = path.join(process.cwd(), `content/notes/${type}`);
  const fullPath = path.join(notesDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Replace absolute media paths from brain to relative public paths
  let processedContent = fileContents.replace(
    /\/absolute\/path\/to\/media__([0-9]+)\.png/g, 
    '/notes-media/media__$1.png'
  );
  
  // Just in case it has standard paths
  processedContent = processedContent.replace(
    /C:\/Users\/.*\/brain\/.*\/media__([0-9]+)\.png/g,
    '/notes-media/media__$1.png'
  );

  const matterResult = matter(processedContent);
  
  return {
    id,
    slug: id,
    title: topicTitles[id] || id.replace(/_/g, ' '),
    icon: topicIcons[id] || 'BookOpen',
    content: matterResult.content,
    ...matterResult.data
  };
}
