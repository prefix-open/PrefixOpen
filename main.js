const options = {};

let baseURL = 'https://example.com/';

const openPrefixed = (region) => {
    const query = region.selectionText;
    chrome.tabs.create({
        "url": "" + baseURL + query
    });
};

const setBaseUrl = (newUrl) =>{
    baseURL = newUrl;
};

chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
        id: "1",
        title: "Open with Prefix",
        contexts: ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener(openPrefixed);

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.get({'baseURL': 'https://example.com/'}, (data) => {
        Object.assign(options, data.options);
        baseURL = options['baseURL'];
    })
});

chrome.storage.onChanged.addListener((changes,area) => {
    if( area === 'sync' && changes.options?.newValue) {
        const newUrl = changes.options.newValue.baseURL;
        console.log('Base URL changed: ' + newUrl)
        setBaseUrl(newUrl);
    }
});