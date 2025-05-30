export type TemplateType = 'modern' | 'classic' | 'minimal' | 'creative';

export interface Template {
  id: string;
  name: string;
  type: TemplateType;
  thumbnail: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}