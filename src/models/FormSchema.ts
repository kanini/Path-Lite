export interface FormFieldDefinition {
  fieldId: string;
  fieldName: string;
  fieldType: 'string' | 'number' | 'date' | 'boolean' | 'enum';
  required: boolean;
  validationRules?: Record<string, any>;
  questionTemplate?: string;
}

export interface FormSchema {
  schemaVersion: string;
  schemaId: string;
  formName: string;
  fields: FormFieldDefinition[];
}
