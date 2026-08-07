import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  orderForm: FormGroup;
  submitted = false;
  submitSuccess = false;
  private isBrowser: boolean;

  products = [
    { value: 'botijao-13', label: 'Botijão de Gás P-13 (13kg)', price: 'Consultar' },
    { value: 'botijao-45', label: 'Botijão de Gás P-45 (45kg)', price: 'Consultar' },
    { value: 'galao-agua', label: 'Galão de Água Mineral', price: 'Consultar' },
    { value: 'outro', label: 'Outro produto', price: 'Consultar' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.orderForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)]],
      endereco: ['', [Validators.required, Validators.minLength(5)]],
      bairro: ['', [Validators.required]],
      produto: ['', [Validators.required]],
      quantidade: [1, [Validators.required, Validators.min(1), Validators.max(50)]],
      observacoes: ['']
    });
  }

  get f() {
    return this.orderForm.controls;
  }

  formatPhone(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    this.orderForm.get('telefone')?.setValue(value, { emitEvent: false });
  }

  onSubmit() {
    this.submitted = true;
    if (this.orderForm.invalid) return;

    const form = this.orderForm.value;
    const productLabel = this.products.find(p => p.value === form.produto)?.label || form.produto;

    const message = encodeURIComponent(
      `🛒 *NOVO PEDIDO - Davi Gás*\n\n` +
      `👤 *Nome:* ${form.nome}\n` +
      `📱 *Telefone:* ${form.telefone}\n` +
      `📍 *Endereço:* ${form.endereco}\n` +
      `🏘️ *Bairro:* ${form.bairro}\n` +
      `📦 *Produto:* ${productLabel}\n` +
      `🔢 *Quantidade:* ${form.quantidade}\n` +
      (form.observacoes ? `📝 *Obs:* ${form.observacoes}\n` : '') +
      `\n---\n_Pedido feito pelo site_`
    );

    this.submitSuccess = true;

    if (this.isBrowser) {
      window.open(`https://wa.me/5589994205500?text=${message}`, '_blank');
    }
  }

  novoPedido() {
    this.submitted = false;
    this.submitSuccess = false;
    this.orderForm.reset({ quantidade: 1 });
  }

  voltar() {
    this.router.navigate(['/']);
  }
}
