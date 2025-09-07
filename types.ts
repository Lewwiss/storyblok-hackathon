export type Adapter = (
  text: any,
  language: Language,
  type: string,
) => Promise<any>;

export type Language = {
  code: string;
  name: string;
  ai_translation_code: string | null;
}
