import { test, expect}      from '../fixtures/base';
import { SEARCH_QUERY, RESULTS_COUNT} from '../data/constants';
import { Protractor} from '../helpers/types'


test.describe('WB - поиск товаров',()=>{
    
    test('Первые 10 транспортиров отсортированы по цене (возрастание)',async ({
        mainPage,searchPage
    })=>{
        await test.step('Открыть главную страницу', async ()=>{
            await mainPage.open();
        });
        await test.step('Найти "${SEARCH_QUERY}"',async ()=>{
            await mainPage.searchByQuery(SEARCH_QUERY);
        });
        await test.step('Применить фильтр по цене (возрастание)', async ()=>{
            await searchPage.useFilterAscPrice();
        });
        let protractors: Protractor[] = [];
        await test.step('Берем первые ${RESULTS_COUNT} транспортиры', async () =>{
            protractors = await searchPage.getFirstNProducts(RESULTS_COUNT);
        })
        await test.step('Проверить количество товаров', async () => {
            expect(protractors.length).toBe(RESULTS_COUNT);
        });

        await test.step('Проверить сортировку по возрастанию цены', async () => {
        const prices = protractors
            .map(p => parseInt(p.price.replace(/\D/g, ''), 10))
            .filter(p => !isNaN(p));

        for (let i = 1; i < prices.length; i++) {
            expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
        }
        });
       


        console.log('\n' + '='.repeat(55));
        console.log('  Транспортиры — по возрастанию цены');
        console.log('='.repeat(55));
        for (const p of protractors) {
        console.log(`${p.price.padEnd(10)} | ${p.name}`);
        }
        console.log('='.repeat(55));
    });
    }
    )
