export interface NavLink {
  label: string;
  path: string;
  fragment?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  description: string;
  image: string;
  highlights: string[];
  whatsappMessage: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface HowItWorksStep {
  title: string;
  description: string;
  icon: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactItem {
  label: string;
  value: string;
  href?: string;
  icon: string;
}

export interface ResellerUnit {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  mapsQuery: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface OrderFormValue {
  nome: string;
  telefone: string;
  produto: string;
  quantidade: number;
  modalidade: 'entrega' | 'retirada';
  endereco: string;
  bairro: string;
  referencia: string;
  pagamento: string;
  observacoes: string;
}
