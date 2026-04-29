import { test } from "@fixtures/test"
import { env } from "@plugins/globalSetup"
import { readJson } from "@utils/ResourceLoader"

const dataTest = readJson('resources/dataTest/checkout/checkoutInfo.json') as any;
const checkoutInfo = dataTest.checkoutInfo

test.describe('Checkout', () =>{
    test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.goto(env.BASE_URL)
        await loginPage.login(env.USERNAME,env.PASSWORD)
        await inventoryPage.addFirstItemToCart()
        await cartPage.goto()
        await cartPage.clickCheckout()
    })

    test.skip('Verify user can checkout when input checkout valid info correctly', {tag: ["@Regression", "@Smoke", "@High", "@Test"]}, async ({ checkoutPage}) => {
        await checkoutPage.fillAllCheckoutInfoAndContinue(checkoutInfo.firstName,checkoutInfo.lastName,checkoutInfo.postalCode)
        await checkoutPage.verifyCheckoutStepTwoPage()
    })
})