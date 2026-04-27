import { Locator, Page } from "@playwright/test";

export class CheckoutLocator {
    constructor(private readonly page:Page){
        
    }

    get checkoutInfo(){
            return {
              firstName: this.page.getByTestId('firstName'),
              lastName: this.page.getByTestId('lastName'),
              postalCode: this.page.getByTestId('postalCode')  
            }
        }

    get cancelButton(): Locator {
        return this.page.getByTestId('cancel')
    }

    get continueButton(): Locator {
        return this.page.getByTestId('continue')
    }

    get title(): Locator {
        return this.page.getByTestId('title')
    }
}