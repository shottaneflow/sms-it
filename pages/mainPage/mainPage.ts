import { Page, Locator} from '@playwright/test';
import { BasePage } from '../basePage';


export class MainPage extends BasePage {

    protected pageName = "Главная страница";

    private readonly header: Locator;
    private readonly searchBar: Locator;

    constructor(page : Page){
        super(page);
        this.header=page.locator("header")
        this.searchBar=page.locator("//input[@data-testid='searchInput']")
    }

    protected root(): Locator {
        return this.header;
    }
    
    async searchByQuery(query: string): Promise<void>{
        await this.searchBar.click();
        await this.searchBar.pressSequentially(query, { delay: 80 });;
        await this.page.keyboard.press('Enter');
    }
  }

    

