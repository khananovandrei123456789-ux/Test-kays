import { test, expect, Page, Locator } from '@playwright/test';
import { MainPage } from '../models/mainPage';




let mainPage:MainPage;

test.describe('тесты главной страницы', ()=>{      // этот хук используется для выполнения идемпотентного действия  в каждой итерации тестового листа (то есть это действие будет вначале каждого теста )
  test.beforeEach( async ({page})=>{
    mainPage=new MainPage(page)
    await mainPage.openMainPage()
  });

  test('проверка отображения элементов навигации хэдера', async () => {  
    await mainPage.checkElementsVisability()
  });

  test('проверка корректных названий элементов навигации хэдера', async () => {   
      await mainPage.checkElementsText()     
  });

  test('проверка атрибутов href хэддера ', async () => {  
      await mainPage.checkElementsHrefAttribyte()  
  });

  test('проверка переключения лайв мода', async () => {  
    await mainPage.clickSwitchLightModeIcon() 
    await mainPage.checkDataThemeAttribyteValue() 
    await mainPage.clickSwitchLightModeIcon() 
    await mainPage.checkDataThemeAttribyteValueDark()
  });


    test(`проверка стилей со светлой темой`, async ()=>{
      await  test.step('установка светлой темы', async ()=>{
        await mainPage.setLightMode()
      })
      await  test.step('скриншотная проверка светлой темы', async ()=>{
        await mainPage.checkLoyoutWithLightMode();
      })
    })

    test(`проверка стилей со темной темой`, async ()=>{
      await test.step('установка темной темы', async ()=>{
        await mainPage.setDarkMode()
      })
      await  test.step('скриншотная проверка темной темы', async ()=>{
        await mainPage.checkLoyoutWithDarkMode();
      })
    })
})