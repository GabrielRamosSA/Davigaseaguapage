import { Component } from '@angular/core';
import { howItWorksSteps } from '../../../core/data/site-data';

@Component({
  selector: 'app-how-it-works-section',
  template: `
    <section class="section section--soft">
      <div class="shell">
        <header class="section__head">
          <span class="eyebrow">Como pedir</span>
          <h2>Três passos simples para finalizar seu pedido</h2>
          <p>Sem complicação: escolha, envie e combine os detalhes com a equipe.</p>
        </header>

        <ol class="steps">
          @for (step of howItWorksSteps; track step.title; let index = $index) {
            <li class="step">
              <span class="step__number">0{{ index + 1 }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .section { padding: 54px 0; }
    .section--soft { background: linear-gradient(180deg, rgba(11, 77, 162, 0.04), rgba(255, 255, 255, 0)); }
    .shell { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .section__head { max-width: 46rem; margin-bottom: 24px; }
    .eyebrow { color: #0b4da2; font-size: 0.84rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
    h2 { margin: 12px 0 0; color: #172033; font-size: clamp(1.7rem, 4vw, 2.8rem); line-height: 1.05; }
    p { margin: 12px 0 0; color: #52607a; line-height: 1.65; }
    .steps {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 14px;
    }
    .step {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0;
      min-height: 220px;
      padding: 24px 24px 26px;
      border-radius: 26px;
      background: #fff;
      border: 1px solid rgba(7, 47, 102, 0.08);
      box-shadow: 0 14px 34px rgba(7, 47, 102, 0.08);
      overflow: visible;
    }
    .step__number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 54px;
      height: 54px;
      border-radius: 16px;
      background: #0b4da2;
      color: #fff;
      font-weight: 800;
      box-shadow: 0 12px 26px rgba(11, 77, 162, 0.18);
    }
    h3 { margin: 18px 0 0; color: #172033; font-size: 1.1rem; line-height: 1.25; }
    .step p {
      margin-top: 10px;
      line-height: 1.7;
      color: #52607a;
      flex: 1;
    }
    @media (min-width: 900px) {
      .steps {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        position: relative;
        gap: 20px;
      }
      .steps::before {
        content: '';
        position: absolute;
        top: 48px;
        left: 7%;
        right: 7%;
        height: 2px;
        background: linear-gradient(90deg, rgba(11, 77, 162, 0.16), rgba(11, 77, 162, 0.4), rgba(11, 77, 162, 0.16));
      }
      .step { min-height: 240px; }
    }
    @media (max-width: 899px) {
      .step { min-height: auto; }
    }
  `],
})
export class HowItWorksSectionComponent {
  readonly howItWorksSteps = howItWorksSteps;
}
