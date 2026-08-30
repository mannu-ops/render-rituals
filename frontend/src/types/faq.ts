export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
