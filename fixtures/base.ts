import { MainPage } from "../pages/mainPage/mainPage"
import { SearchPage} from "../pages/searchPage/searchPage"
import { test as base } from '@playwright/test';


type Fixtures = {
    mainPage:   MainPage,
    searchPage: SearchPage
}

export const test = base.extend<Fixtures>({
    mainPage: async ({page},use) =>{
        await use(new MainPage(page));
    },
    searchPage: async ({page},use) =>{
        await use(new SearchPage(page));
    }
})

export { expect } from '@playwright/test';