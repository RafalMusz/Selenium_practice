import Page from "./page";
import * as constants from "../constant/const";


class loginPage extends Page {
    get loginLink() {
        return driver.findElement(By.css("authorization-link"));
    }
    get emailField() { 
        return driver.findElement(By.id("email"));
    }
    get passwordField() { 
        return driver.findElement(By.id("pass"));
    }




    async open() {
        await super.open(url);
    };
    async loginIn(){
        await this.loginLink.click();
        await this.emailField.sendKeys(process.env.user, Key.RETURN);
        await this.passwordField.sendKeys(process.env.password, Key.RETURN);
    };



}
export default new loginPage();