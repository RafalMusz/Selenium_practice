import Page from "./page";
import { timeOut } from "../utils/constants";
import { expect } from "chai";

class HomePage extends Page {
  get homePageDiv() {
    return browser.$('//*[@id="root"]/div/div[1]/div[2]/div');
  }
  get navChevronButton() {
    return browser.$$('//*[@data-test-id="NAVIGATION_CHEVRON"]');
  }
  get competitionPage() {
    return browser.$('//*[@id="root"]/div/div[1]/div[2]/div/section[3]');
  }
  get linearChannelButton() {
    return browser.$('//*[@data-test-id="TILE_TITLE"]').$("//*[text()='DAZN 2']");
  }
  get player() {
    return browser.$('//*[@data-test-id="PLAYER_FRAME_VIDEO"]');
  }
  get labelLive() {
    return browser.$('//*[@data-test-id="LIVE_LABEL"]');
  }
  get labelNew() {
    return browser.$$('//*[@data-test-id="New_LABEL]');
  }
  get remainderButton() {
    return browser.$$('//*[@data-test-id="BELL"]');
  }
  get remainderConfirmButton(){
    return browser.$('//*[@data-test-id="BUTTON"]');
  }
  get daznAppPopup(){
    return browser.$('//*[@data-test-id="DIALOG_MODAL_CONTAINER"]');
  }
  get notificationPopUp() {
    return browser.$('//*[@id="notification-layer"]/div');
  }
  get notificationPopHeader() {
    return browser.$('//*[@data-test-id="BODY_HEADER"]');
  }
  get navBar() {
    return browser.$('//*[@data-test-id="HEADER-NAVIGATION"]');
  }
  get sportsMenu() {
    return browser.$('button[data-test-id="HEADER_NAVIGATION_ITEM_LINK"]>span');
  }
  get footballOption() {
    return browser.$('a[title="Football"]');
  }
  get tileTitle() {
    return browser.$$('//*[@data-test-id="TILE_TITLE"]');
  }
  get tileSubtitle() {
    return browser.$$('//*[@data-test-id="TILE_SUBTITLE"]');
  }


  async open() {
    await super.open('./home');
  }

  async homePageDivIsVisible() {
    await this.homePageDiv.waitForDisplayed({ timeOut });
  }
  async chevronNavigation() {
    
    await this.navChevronButton[0].click();
    const competitionPageTile = await this.competitionPage.getTitle();
    expect(competitionPageTile).to.equal("DAZN | UEFA Champions League");
  }

  async settingUpReminder() {
    await this.remainderButton[0].click();
    await this.remainderConfirmButton.waitForClickable({timeOut});
    await this.remainderConfirmButton.click();
    if ((await this.daznAppPopup).waitForDisplayed({timeOut})) {
        await this.remainderConfirmButton.click();
    };
    await this.notificationPopUp.waitForDisplayed({timeOut});

    // TODO 
    // When new version of catalog will be ready this have to be uncomment
    //
    // const popUpLabelText = await this.notificationPopHeader.getText();
    // console.log(popUpLabelText);
    // expect(popUpLabelText.includes('alerts')).to.be.true;
  }

  async labelLiveIsVisible() {
    const newLabelText = await this.labelLive.getText();
    expect(newLabelText).to.equal("LIVE")
  }

  async labelNewIsVisible() {
    await this.labelNew.waitForDisplayed({timeOut});
    const newLabelText = await this.labelNew[0].getText();
    expect(newLabelText).to.equal("NEW");
  }

  async chooseContentToPlay() {

    await this.linearChannelButton.click();
  }
  async playingContent() {
    await this.player.waitForDisplayed({timeOut});
    

    await this.playbackStatusAwait();
    
  }

  async playbackStatusAwait() {
    await this.player.isDisplayedInViewport();
    
    //TODO
    // This is not executable in headless mode
    // await browser.waitUntil(
    //   async () => {
    //     const state = await browser.execute(
    //       () => window.player._doNotUse.state.value.playback.playbackStatus
    //     );
    //     console.log(state);
    //     return state === "PLAYING";
    //   },
    //   {
    //     timeout: 60000,
    //     timeoutMsg: "Player did not fully loaded yet",
    //   }
    // );
  }

  async openSportsMenuDropdownAndSelectFootball() {
    await this.navBar.waitForDisplayed({ timeOut });
    await this.sportsMenu.click();
    await this.footballOption.waitForDisplayed();
    await this.footballOption.click();
  }
}

export default new HomePage();
