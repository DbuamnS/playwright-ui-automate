import { BasePage, CheckoutLocator, ROUTES, step } from "@index";
import { Page } from "@playwright/test";

export class CheckoutPage extends BasePage{
    readonly locators : CheckoutLocator;

    constructor(page:Page){
        super(page);
        this.locators = new CheckoutLocator(page);
    }

    @step((...args) => `Fill in First name > ${args}`)
    async fillFirstName(firstName: string): Promise<void> {
        await this.locators.checkoutInfo.firstName.fill(firstName)
    }

    @step((...args) => `Fill in Last name > ${args}`)
    async fillLastName(lastName: string): Promise<void> {
        await this.locators.checkoutInfo.lastName.fill(lastName)
    }

    @step((...args) => `Fill in Postal code > ${args}`)
    async fillPostalcode(postalCode: string): Promise<void> {
        await this.locators.checkoutInfo.postalCode.fill(postalCode)
    }

    @step("Click on continue button")
    async clickOnContinue(): Promise<void>{
        await this.clickAndWait(this.locators.continueButton, true)
    }

    @step("Fill all checkout info and continue")
    async fillAllCheckoutInfoAndContinue(firstName: string, lastName: string, postalCode: string ): Promise<void>{
        await this.fillFirstName(firstName),
        await this.fillLastName(lastName),
        await this.fillPostalcode(postalCode),
        await this.clickOnContinue()
    }

    @step("Verify checkout step two page")
    async verifyCheckoutStepTwoPage(): Promise<void>{
        await this.verifyURL(ROUTES.CHECKOUT_STEP_TWO)
    }

}
