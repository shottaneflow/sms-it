import { Locator, Page} from '@playwright/test'
import { Protractor} from '../../../helpers/types'
export class Card{
    private readonly card: Locator;


    constructor(card: Locator) {
        this.card = card;
    }

    async getName(): Promise<string> {
    const name = await this.card
      .locator('.product-card__name')
      .textContent();
    return name?.trim().replace(/^\s*\/\s*/, '') ?? '—';
  }

  async getPrice(): Promise<string> {
    const walletPrice  = this.card.locator('ins.price__lower-price.wallet-price');
    const text = await walletPrice.first().textContent();
    return text?.replace(/\s/g, ' ').trim() ?? '—';
}

  async getData(): Promise<Protractor> {
    const [name, price] = await Promise.all([
      this.getName(),
      this.getPrice(),
    ]);
    return { name, price };
  }
}