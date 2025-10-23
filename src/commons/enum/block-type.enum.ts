export enum BlockType {
  // Core blocks (vienen por defecto)
  PARAGRAPH = 'paragraph',
  HEADER = 'header',
  LIST = 'list',
  QUOTE = 'quote',
  CODE = 'code',
  IMAGE = 'image',
  SIMPLE_IMAGE = 'simpleImage',
  DELIMITER = 'delimiter',
  TABLE = 'table',
  
  // Plugin blocks
  EMBED = 'embed',
  LINK_TOOL = 'linkTool',
  WARNING = 'warning',
  CHECKLIST = 'checklist',
  ATTACHES = 'attaches',
  RAW = 'raw',
  NESTED_LIST = 'nestedList',
  MARKER = 'marker',
  INLINE_CODE = 'inlineCode',
  MATH = 'math',
}
