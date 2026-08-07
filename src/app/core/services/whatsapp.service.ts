import { Injectable } from '@angular/core';
import { brand } from '../data/site-data';
import { OrderFormValue, Product } from '../models/site-data.models';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  readonly phone = brand.whatsappPhone;

  buildLink(message?: string): string {
    if (!message) {
      return `https://wa.me/${this.phone}`;
    }

    return `https://wa.me/${this.phone}?text=${encodeURIComponent(message)}`;
  }

  buildGreetingMessage(): string {
    return 'Olá! Acessei o site da Davi Gás e gostaria de fazer um pedido.';
  }

  buildProductMessage(product: Product): string {
    return product.whatsappMessage;
  }

  buildOrderMessage(form: OrderFormValue): string {
    const lines = [
      'Olá! Gostaria de fazer um pedido na Davi Gás.',
      '',
      `Nome: ${form.nome}`,
      `Telefone: ${form.telefone}`,
      `Produto: ${form.produto}`,
      `Quantidade: ${form.quantidade}`,
      `Modalidade: ${form.modalidade === 'entrega' ? 'Entrega' : 'Retirada'}`,
    ];

    if (form.modalidade === 'entrega') {
      lines.push(`Endereço: ${form.endereco || 'Não informado'}`);
      lines.push(`Bairro: ${form.bairro || 'Não informado'}`);
      lines.push(`Ponto de referência: ${form.referencia || 'Não informado'}`);
    }

    if (form.pagamento) {
      lines.push(`Forma de pagamento: ${form.pagamento}`);
    }

    if (form.observacoes) {
      lines.push(`Observações: ${form.observacoes}`);
    }

    return lines.join('\n');
  }
}
