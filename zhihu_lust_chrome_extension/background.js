// (C) 2015 ScatOrc
chrome.browserAction.onClicked.addListener(function(tab) {

  console.log('Turning ' + tab.url + ' red!');
  /*
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
  */

  chrome.tabs.sendMessage(tab.id, {});
  // contact with content script with message
});
