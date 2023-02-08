import { Builder, By, Key } from 'selenium-webdriver';
import { url } from '../Selenium_practice/constant/const.js';


let driver = new Builder()
.forBrowser('chrome')
.build();


async function test() {
    await driver.get('https://magento.softwaretestingboard.com')

    await driver.findElement(By.name("q")).sendKeys("search", Key.RETURN);
};

test();