import { expect } from "@wdio/globals";
import Search from "../pageobjects/search.page";

describe("search", () => {
  beforeEach("Open site and maximize window", async () => {
    await Search.open();
    await browser.maximizeWindow();
  });

  it('should successfuly search for "амортизатор"', async () => {
    const shock : string = 'амортизатор'
    
    await Search.enterText(shock)
    await Search.clickSearchBtn()
    await expect(Search.searchResults).toBeElementsArrayOfSize({ gte: 10 })
    
  });


  it.only('should not show empty pages', async () => {
    const shock : string = 'амортизатор'
    
    await Search.enterText(shock)
    await Search.selectSearchCategory()
    await Search.clickSearchBtn()
    
    expect(await Search.getCounterNumber()).toBe(await Search.getResultsQuantity())

    await expect(Search.paginationContainer).not.toBeDisplayed()
    
  }); 

  it('should have search placeholder', async () => {
    const placeholderName :string  = 'Поиск'
    const actualPlaceholderName = await Search.getSearchPlaceholder()
    expect(actualPlaceholderName).toBe(placeholderName)    
  });

});
