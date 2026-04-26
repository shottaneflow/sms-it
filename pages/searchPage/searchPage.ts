import { Page, Locator} from '@playwright/test';
import { BasePage } from '../basePage';
import { Card} from './components/Card'
import {Protractor} from '../../helpers/types'
export class SearchPage extends BasePage {

    protected pageName = "Cтраница поиска";

    private readonly header: Locator;
    private readonly sortCheckBox: Locator;
    private readonly sortAscPrice: Locator;
    private readonly cards: Locator;

    constructor(page : Page){
        super(page);
        this.header=page.locator("header")
        this.sortCheckBox=page.locator("//div[@data-testid='sort']")
        this.sortAscPrice=page.locator("//span[@class='radio-with-text__text' and contains(text(),'По возрастанию цены')]")
        this.cards=page.locator("//article[@data-card-index]")
    }

    protected root(): Locator {
        return this.header;
    }
    async clickSortCheckBox(): Promise<void>{
        await this.sortCheckBox.click();
    }
    async clickSortAscPrice(): Promise<void>{
        await this.sortAscPrice.click();
    }
    async useFilterAscPrice(): Promise<void>{
        await this.clickSortCheckBox();
        await this.clickSortAscPrice();
        await this.page.waitForTimeout(300);
        
    }

    async getFirstNProducts(count: number): Promise<Protractor[]> {
        const total = await this.cards.count();
        const limit = Math.min(count, total);

        const results: Protractor[] = [];

        for (let i = 0; i < limit; i++) {
            const card = new Card(this.cards.nth(i));
            const data = await card.getData();
            results.push(data);
        }

        return results;
  }
    
    
  }

    

