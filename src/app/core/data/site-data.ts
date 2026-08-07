import {
  Benefit,
  ContactItem,
  FaqItem,
  HowItWorksStep,
  NavLink,
  Product,
  ResellerUnit,
  SocialLink,
} from '../models/site-data.models';

export const brand = {
  name: 'Davi Gás',
  city: 'Picos–PI',
  website: 'https://www.davigas.com.br/',
  phoneLandline: '(89) 3422-5726',
  phoneLandlineHref: 'tel:+558934225726',
  whatsappDisplay: '(89) 99420-5500',
  whatsappPhone: '5589994205500',
  whatsappHref: 'https://wa.me/5589994205500',
  address: 'Rua Santa Rita, 1719, Picos–PI',
  mapsQuery: 'https://www.google.com/maps?q=Rua%20Santa%20Rita%2C%201719%2C%20Picos%20PI&output=embed',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Rua%20Santa%20Rita%2C%201719%2C%20Picos%20PI',
  logo: '/davvigaseagua_logo.jpg',
  heroImage: '/faxada-davigas.webp',
};

export const navLinks: NavLink[] = [
  { label: 'Início', path: '/' },
  { label: 'Produtos', path: '/produtos' },
  { label: 'Revenda', path: '/revendas' },
  { label: 'Contato', path: '/contato' },
];

export const products: Product[] = [
  {
    id: 'nacional-gas-p13',
    name: 'Botijão P13 Nacional Gás',
    category: 'Gás de cozinha',
    brand: 'Nacional Gás',
    description:
      'Botijão de 13 kg indicado para o uso diário em residências. Consulte a disponibilidade da marca e faça seu pedido pelo WhatsApp.',
    image: '/botijao13kg.webp',
    highlights: ['Uso residencial', 'Consulte o valor pelo WhatsApp', 'Entrega ou retirada'],
    whatsappMessage:
      'Olá! Vi o produto Botijão P13 Nacional Gás no site da Davi Gás e gostaria de consultar o valor e solicitar a entrega.',
  },
  {
    id: 'liquigas-p13',
    name: 'Botijão P13 Liquigás',
    category: 'Gás de cozinha',
    brand: 'Liquigás',
    description:
      'Botijão de 13 kg indicado para residências. Consulte a disponibilidade da marca e faça seu pedido pelo WhatsApp.',
    image: '/botijao13kg_cinza.png',
    highlights: ['Linha residencial', 'Consulte o valor pelo WhatsApp', 'Pedido rápido'],
    whatsappMessage:
      'Olá! Vi o produto Botijão P13 Liquigás no site da Davi Gás e gostaria de consultar o valor e solicitar a entrega.',
  },
  {
    id: 'ultragaz-p13',
    name: 'Botijão P13 Ultragaz',
    category: 'Gás de cozinha',
    brand: 'Ultragaz',
    description:
      'Botijão de 13 kg indicado para cozinhas residenciais. Consulte a disponibilidade da marca e faça seu pedido pelo WhatsApp.',
    image: '/botijao13kg.webp',
    highlights: ['Uso diário', 'Consulte o valor pelo WhatsApp', 'Atendimento local'],
    whatsappMessage:
      'Olá! Vi o produto Botijão P13 Ultragaz no site da Davi Gás e gostaria de consultar o valor e solicitar a entrega.',
  },
  {
    id: 'supergasbras-p13',
    name: 'Botijão P13 Supergasbras',
    category: 'Gás de cozinha',
    brand: 'Supergasbras',
    description:
      'Botijão de 13 kg indicado para uso residencial. Consulte a disponibilidade da marca e faça seu pedido pelo WhatsApp.',
    image: '/botijao13kg.webp',
    highlights: ['Residencial', 'Consulte o valor pelo WhatsApp', 'Retirada ou entrega'],
    whatsappMessage:
      'Olá! Vi o produto Botijão P13 Supergasbras no site da Davi Gás e gostaria de consultar o valor e solicitar a entrega.',
  },
  {
    id: 'p45-industrial',
    name: 'Botijão industrial P45',
    category: 'GLP industrial',
    brand: 'Uso comercial',
    description:
      'Cilindro de 45 kg indicado para estabelecimentos com maior consumo de GLP, como restaurantes, padarias e cozinhas comerciais.',
    image: '/botijao45kg.webp',
    highlights: ['Maior capacidade', 'Consulte o valor pelo WhatsApp', 'Uso comercial'],
    whatsappMessage:
      'Olá! Vi o produto Botijão industrial P45 no site da Davi Gás e gostaria de consultar o valor e solicitar a entrega.',
  },
  {
    id: 'regulador-gas',
    name: 'Registro ou regulador de gás',
    category: 'Acessórios',
    brand: 'Instalação residencial',
    description:
      'Regulador para instalação de gás residencial. Consulte os modelos disponíveis antes de realizar o pedido.',
    image: '/registro-botijao.webp',
    highlights: ['Instalação residencial', 'Consulte o modelo', 'Pedido pelo WhatsApp'],
    whatsappMessage:
      'Olá! Vi o produto Registro ou regulador de gás no site da Davi Gás e gostaria de consultar o valor e solicitar a entrega.',
  },
  {
    id: 'agua-20-litros',
    name: 'Água mineral de 20 litros',
    category: 'Água mineral',
    brand: 'Garrafão 20 litros',
    description: 'Água mineral em garrafão de 20 litros para residências e estabelecimentos.',
    image: '/galaodeagua.webp',
    highlights: ['Para uso diário', 'Consulte o valor pelo WhatsApp', 'Entrega ou retirada'],
    whatsappMessage:
      'Olá! Vi o produto Água mineral de 20 litros no site da Davi Gás e gostaria de consultar o valor e solicitar a entrega.',
  },
];

export const benefits: Benefit[] = [
  {
    title: 'Atendimento local',
    description: 'Equipe de Picos–PI para agilizar o contato e atender pedidos de forma próxima.',
    icon: 'location',
  },
  {
    title: 'Pedido direto no WhatsApp',
    description: 'Fale com a revenda, confirme o produto e combine os detalhes sem complicação.',
    icon: 'chat',
  },
  {
    title: 'Produtos para residência e comércio',
    description: 'Opções para o dia a dia da casa e para estabelecimentos com maior consumo.',
    icon: 'bag',
  },
  {
    title: 'Compromisso com segurança',
    description: 'Informações claras e orientação cuidadosa para o pedido do gás e dos acessórios.',
    icon: 'shield',
  },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    title: 'Escolha o produto',
    description: 'Veja o catálogo e selecione o item que melhor atende sua necessidade.',
    icon: 'products',
  },
  {
    title: 'Envie pelo WhatsApp',
    description: 'Toque no botão e envie a mensagem com as informações do pedido.',
    icon: 'whatsapp',
  },
  {
    title: 'Combine a entrega',
    description: 'Finalize os detalhes com a equipe antes da entrega ou retirada.',
    icon: 'delivery',
  },
];

export const faqItems: FaqItem[] = [
  {
    id: 'pedido',
    question: 'Como faço um pedido?',
    answer:
      'Escolha um produto, preencha o formulário ou clique no botão de WhatsApp e envie sua solicitação para a equipe da Davi Gás.',
  },
  {
    id: 'produtos',
    question: 'Quais produtos estão disponíveis?',
    answer:
      'O catálogo reúne botijão P13, P45, regulador de gás e água mineral de 20 litros. A disponibilidade pode variar e pode ser consultada pelo WhatsApp.',
  },
  {
    id: 'atende-picos',
    question: 'A Davi Gás atende em Picos?',
    answer:
      'Sim. A empresa está localizada em Picos–PI e atende pedidos por WhatsApp para a região.',
  },
  {
    id: 'preco-whatsapp',
    question: 'Posso consultar o preço pelo WhatsApp?',
    answer:
      'Sim. Essa é a forma mais prática de confirmar a disponibilidade e consultar o valor do item desejado.',
  },
  {
    id: 'p45',
    question: 'Vocês trabalham com botijão P45?',
    answer:
      'Sim. O catálogo inclui botijão industrial P45 para uso comercial e de maior consumo.',
  },
  {
    id: 'endereco',
    question: 'Como informar o endereço de entrega?',
    answer:
      'Use o formulário do site ou envie a informação diretamente no WhatsApp, com rua, número, bairro e ponto de referência.',
  },
  {
    id: 'agua',
    question: 'Posso pedir água mineral pelo WhatsApp?',
    answer:
      'Sim. A água mineral de 20 litros pode ser solicitada pelo WhatsApp ou pelo formulário do site.',
  },
];

export const contactItems: ContactItem[] = [
  {
    label: 'WhatsApp',
    value: brand.whatsappDisplay,
    href: brand.whatsappHref,
    icon: 'whatsapp',
  },
  {
    label: 'Telefone fixo',
    value: brand.phoneLandline,
    href: brand.phoneLandlineHref,
    icon: 'phone',
  },
  {
    label: 'Endereço',
    value: brand.address,
    href: brand.mapsLink,
    icon: 'location',
  },
];

export const resellerUnits: ResellerUnit[] = [
  {
    name: brand.name,
    address: brand.address,
    phone: brand.phoneLandline,
    whatsapp: brand.whatsappDisplay,
    mapsQuery: brand.mapsQuery,
  },
];

export const socialLinks: SocialLink[] = [];
