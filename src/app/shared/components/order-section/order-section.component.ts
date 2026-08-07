import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { products } from '../../../core/data/site-data';
import { OrderFormValue } from '../../../core/models/site-data.models';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-order-section',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="section section--soft" id="pedido">
      <div class="shell">
        <header class="section__head">
          <span class="eyebrow">Formulário de pedido</span>
          <h2>Envie seu pedido pelo WhatsApp</h2>
          <p>Preencha os campos abaixo e a mensagem será montada automaticamente para abrir no WhatsApp.</p>
        </header>

        <form class="form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="form__grid">
            <label class="field">
              <span>Nome *</span>
              <input type="text" formControlName="nome" placeholder="Seu nome" [class.invalid]="showError('nome')" />
              @if (showError('nome')) { <small>{{ errorMessage('nome') }}</small> }
            </label>

            <label class="field">
              <span>Telefone *</span>
              <input type="tel" formControlName="telefone" placeholder="(89) 99420-5500" [class.invalid]="showError('telefone')" />
              @if (showError('telefone')) { <small>{{ errorMessage('telefone') }}</small> }
            </label>

            <label class="field">
              <span>Produto *</span>
              <select formControlName="produto" [class.invalid]="showError('produto')">
                <option value="" disabled>Selecione um produto</option>
                @for (product of productsList; track product.id) {
                  <option [value]="product.name">{{ product.name }}</option>
                }
              </select>
              @if (showError('produto')) { <small>{{ errorMessage('produto') }}</small> }
            </label>

            <label class="field">
              <span>Quantidade *</span>
              <div class="stepper">
                <button type="button" class="stepper__button" (click)="adjustQuantity(-1)" aria-label="Diminuir quantidade">−</button>
                <input type="number" min="1" formControlName="quantidade" [class.invalid]="showError('quantidade')" />
                <button type="button" class="stepper__button" (click)="adjustQuantity(1)" aria-label="Aumentar quantidade">+</button>
              </div>
              @if (showError('quantidade')) { <small>{{ errorMessage('quantidade') }}</small> }
            </label>

            <label class="field">
              <span>Modalidade *</span>
              <select formControlName="modalidade">
                <option value="entrega">Entrega</option>
                <option value="retirada">Retirada</option>
              </select>
            </label>

            <label class="field">
              <span>Forma de pagamento</span>
              <input type="text" formControlName="pagamento" placeholder="Pix, dinheiro ou cartão" />
            </label>
          </div>

          @if (deliveryMode() === 'entrega') {
            <div class="form__grid form__grid--delivery">
              <label class="field span-2">
                <span>Endereço *</span>
                <input type="text" formControlName="endereco" placeholder="Rua, número e complemento" [class.invalid]="showError('endereco')" />
                @if (showError('endereco')) { <small>{{ errorMessage('endereco') }}</small> }
              </label>

              <label class="field">
                <span>Bairro</span>
                <input type="text" formControlName="bairro" placeholder="Bairro" />
              </label>

              <label class="field span-2">
                <span>Ponto de referência</span>
                <input type="text" formControlName="referencia" placeholder="Referência para entrega" />
              </label>
            </div>
          }

          <label class="field form__notes">
            <span>Observações</span>
            <textarea rows="4" formControlName="observacoes" placeholder="Informações adicionais do pedido"></textarea>
          </label>

          <div class="form__actions">
            <button type="submit" class="button button--primary">Enviar pedido pelo WhatsApp</button>
            <p>O site não salva dados pessoais no navegador.</p>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .section { padding: 54px 0; }
    .section--soft { background: linear-gradient(180deg, rgba(255, 210, 0, 0.05), rgba(255, 255, 255, 0)); }
    .shell { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .section__head { max-width: 46rem; margin-bottom: 24px; }
    .eyebrow { color: #0b4da2; font-size: 0.84rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
    h2 { margin: 12px 0 0; color: #172033; font-size: clamp(1.7rem, 4vw, 2.8rem); line-height: 1.05; }
    p { margin: 12px 0 0; color: #52607a; line-height: 1.65; }
    .form {
      display: grid;
      gap: 18px;
      padding: clamp(18px, 3vw, 28px);
      border-radius: 34px;
      background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(247,249,252,0.98));
      border: 1px solid rgba(7, 47, 102, 0.08);
      box-shadow: 0 20px 48px rgba(7, 47, 102, 0.09);
    }
    .form__grid {
      display: grid;
      gap: 14px;
    }
    .field {
      display: grid;
      gap: 8px;
      color: #172033;
      font-weight: 700;
    }
    input,
    select,
    textarea {
      width: 100%;
      min-height: 52px;
      padding: 12px 14px;
      border-radius: 18px;
      border: 1px solid rgba(7, 47, 102, 0.16);
      background: #fff;
      color: #172033;
      font: inherit;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
    }
    textarea { min-height: 124px; resize: vertical; }
    input::placeholder,
    textarea::placeholder {
      color: #94a0b8;
    }
    input.invalid,
    select.invalid,
    textarea.invalid {
      border-color: #c03636;
      box-shadow: 0 0 0 3px rgba(192, 54, 54, 0.12);
    }
    small {
      color: #c03636;
      font-weight: 600;
    }
    .form__notes { margin-top: 4px; }
    .form__actions {
      display: grid;
      gap: 10px;
      align-items: center;
      padding-top: 4px;
    }
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 54px;
      padding: 0 22px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 800;
      border: 1px solid transparent;
      cursor: pointer;
    }
    .button--primary {
      background: linear-gradient(135deg, #0b4da2, #0a63d9);
      color: #fff;
      box-shadow: 0 14px 30px rgba(11, 77, 162, 0.2);
    }
    .stepper {
      display: grid;
      grid-template-columns: 48px minmax(0, 1fr) 48px;
      gap: 8px;
      align-items: center;
    }
    .stepper input { text-align: center; }
    .stepper__button {
      width: 48px;
      height: 48px;
      border: 1px solid rgba(7, 47, 102, 0.14);
      border-radius: 16px;
      background: #f7f9fc;
      color: #172033;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: 800;
    }
    .stepper__button:hover { background: #edf3fb; }
    @media (min-width: 760px) {
      .form__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .span-2 { grid-column: span 2; }
      .form__actions { grid-template-columns: auto 1fr; }
      .form { position: relative; overflow: hidden; }
      .form::before {
        content: '';
        position: absolute;
        inset: 0 auto auto 0;
        width: 220px;
        height: 220px;
        background: radial-gradient(circle, rgba(11,77,162,0.08), transparent 70%);
        pointer-events: none;
      }
    }
  `],
})
export class OrderSectionComponent {
  readonly productsList = products;
  readonly deliveryMode = signal<'entrega' | 'retirada'>('entrega');
  readonly form = inject(FormBuilder).nonNullable.group({
    nome: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    produto: ['', [Validators.required]],
    quantidade: [1, [Validators.required, Validators.min(1)]],
    modalidade: ['entrega' as 'entrega' | 'retirada', [Validators.required]],
    endereco: [''],
    bairro: [''],
    referencia: [''],
    pagamento: [''],
    observacoes: [''],
  });

  private readonly whatsapp = inject(WhatsappService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.form.controls.modalidade.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.deliveryMode.set(value);
      this.updateAddressValidators(value);
    });

    this.updateAddressValidators(this.form.controls.modalidade.value);
  }

  showError(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  errorMessage(controlName: keyof typeof this.form.controls): string {
    const control = this.form.controls[controlName];

    if (controlName === 'quantidade' && control.errors?.['min']) {
      return 'Informe uma quantidade mínima de 1.';
    }

    return 'Campo obrigatório.';
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const payload = this.form.getRawValue() as OrderFormValue;
    const message = this.whatsapp.buildOrderMessage(payload);
    window.open(this.whatsapp.buildLink(message), '_blank', 'noopener,noreferrer');

    this.form.reset({ modalidade: 'entrega', quantidade: 1, produto: '', nome: '', telefone: '', endereco: '', bairro: '', referencia: '', pagamento: '', observacoes: '' });
    this.deliveryMode.set('entrega');
    this.updateAddressValidators('entrega');
  }

  adjustQuantity(delta: number): void {
    const currentValue = Number(this.form.controls.quantidade.value || 1);
    const nextValue = Math.min(99, Math.max(1, currentValue + delta));
    this.form.controls.quantidade.setValue(nextValue);
    this.form.controls.quantidade.markAsDirty();
  }

  private updateAddressValidators(mode: 'entrega' | 'retirada'): void {
    const endereco = this.form.controls.endereco;

    if (mode === 'entrega') {
      endereco.addValidators([Validators.required]);
    } else {
      endereco.removeValidators([Validators.required]);
      endereco.setErrors(null);
    }

    endereco.updateValueAndValidity({ emitEvent: false });
  }
}
