import { test, expect, Page, Locator } from '@playwright/test';

interface Elements{
  locator:(page: Page)=> Locator;
  name:string;
  text?:string;
  attribyte?:{
    type:string;
    value:string
  }
}

const elements : Elements[]=[
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


test.describe('тесты главной страницы', ()=>{      // этот хук используется для выполнения идемпотентного действия  в каждой итерации тестового листа (то есть это действие будет вначале каждого теста )
  test.beforeEach( async ({page})=>{
    await page.goto('https://playwright.dev/');
  });

  test('проверка отображения элементов навигации хэдера', async ({ page }) => {  
    elements.forEach(({locator,name})=>{
        test.step(`проверка отображения элемента ${name}` , async()=>{
        await expect.soft(locator(page)).toBeVisible()
      });
    });
  });

  test('проверка корректных названий элементов навигации хэдера', async ({ page }) => {    
    elements.forEach(({locator,name,text})=>{
      if (text){
          test.step(`проверка названия элемента ${name}` , async ()=>{
          await expect(locator(page)).toContainText(text);
        })
      }
    })      
  });

  test('проверка атрибутов href хэддера ', async ({ page }) => {  
    elements.forEach(({locator,name, attribyte})=>{
      if (attribyte){
          test.step(`проверка названия элемента ${name}` , async ()=>{
          await expect(locator(page)).toHaveAttribute(attribyte?.type ,attribyte?.value);
        })
      }
    }) 
  });

  test('проверка переключения лайв мода', async ({ page }) => {  
    await page.getByLabel('Switch between dark and light').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByLabel('Switch between dark and light').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

})