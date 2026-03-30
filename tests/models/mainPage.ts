import test, {expect, Locator, Page} from '@playwright/test'


interface Elements{
    locator:(page: Page)=> Locator;
    name:string;
    text?:string;
    attribyte?:{
        type:string;
        value:string
    }
}

export class MainPage{
    readonly page: Page;
    readonly elements: Elements[];

    constructor (page:Page){
        this.page=page;
        this.elements=[
            {  
                locator:(page: Page): Locator=>page.getByRole('link', { name: 'Playwright logo Playwright' }),
                name:'Playeright Logo',
                text:'Playwright',
                attribyte:{
                type:'href',
                value:'/'
                }
            },
            {  
                locator:(page: Page): Locator=>page.getByRole('link', { name: 'API' }),
                name:'API link',
                text:'API',
                attribyte:{
                type:'href',
                value:'/docs/api/class-playwright'
                }
            },
            {  
                locator:(page: Page): Locator=>page.getByRole('link', { name: 'Docs' }),
                name:'Docs link',
                text:'Docs',
                attribyte:{
                type:'href',
                value:'/docs/intro'
                }
            },
            {  
                locator:(page: Page): Locator=>page.getByRole('button', { name: 'Node.js' }),
                name:'Node Js Link',
                text:'Node.js'
            },
            {  
                locator:(page: Page): Locator=>page.getByRole('link', { name: 'Community' }),
                name:'Community link',
                text:'Community',
                attribyte:{
                type:'href',
                value:'/community/welcome'
                }
            },
            {  
                locator:(page: Page): Locator=>page.getByRole('link', { name: 'GitHub repository' }),
                name:'GitHub link',
            },
            {  
                locator:(page: Page): Locator=>page.getByRole('link', { name: 'Discord server' }),
                name:'Diskord link',
            },
            {  
                locator:(page: Page): Locator=>page.getByRole('heading', { name: 'Playwright enables reliable' }),
                name:'Title',
                text:'Playwright enables reliable end-to-end testing for modern web apps.'
            },
            {
                locator:(page: Page): Locator=>page.getByRole('link', { name: 'Get started' }),
                name:'Get started button',
                text:'Get started',
                attribyte:{
                type:'href',
                value:'/docs/intro'
                }
            }
        ]
    }
    async openMainPage(){
        await this.page.goto('https://playwright.dev/')
    }
    async checkElementsVisability(){
        for( const {locator, name} of this.elements){
            await test.step(`проверка отображения элемента ${name}` , async()=>{
            await expect.soft(locator(this.page)).toBeVisible()
            });
        };
    }

    async checkElementsText(){
        for( const {locator, name,text} of this.elements){
            if (text){
                await test.step(`проверка названия элемента ${name}` , async ()=>{
                await expect(locator(this.page)).toContainText(text);
                })
            }
        };
    }

    async checkElementsHrefAttribyte(){
        for( const {locator, name,attribyte} of this.elements){
            if (attribyte){
                    await test.step(`проверка названия элемента ${name}` , async ()=>{
                    await expect(locator(this.page)).toHaveAttribute(attribyte?.type ,attribyte?.value);
                })
            }
        };
    }

    async clickSwitchLightModeIcon(){
        await this.page.getByLabel('Switch between dark and light').click();
    }
    async checkDataThemeAttribyteValue(){
        await expect(this.page.locator('html')).toHaveAttribute('data-theme', 'light');
    }
    async clickSwitchLightModeIconDa(){
        await this.page.getByLabel('Switch between dark and light').click();
    }
    async checkDataThemeAttribyteValueDark(){
        await expect(this.page.locator('html')).toHaveAttribute('data-theme', 'dark');
    }


    async setLightMode(){
        await this.page.evaluate(()=>{
            document.querySelector('html')?.setAttribute('data-theme','light' )
        }, )
    }

    async setDarkMode(){
        await this.page.evaluate(()=>{
            document.querySelector('html')?.setAttribute('data-theme','dark' )
        }, )
    }

    async checkLoyoutWithLightMode(){
        await expect(this.page).toHaveScreenshot(`pageWith lightMode.png`);
    }

    async checkLoyoutWithDarkMode(){
        await expect(this.page).toHaveScreenshot(`pageWith darkMode.png`);
    }
}