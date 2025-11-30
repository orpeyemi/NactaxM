export interface ServiceHighlight {
  title: string;
  description: string;
  icon: 'file' | 'calculator' | 'legal';
  colorClass: string;
}

export interface GridServiceItem {
  title: string;
  imageUrl: string;
  colorClass: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string[];
}

export interface ContactFormSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}
