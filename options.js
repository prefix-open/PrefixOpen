const options = {};

const updateInput = () => {
    optionsForm.url.value = options['baseURL'];
    optionsForm.url.size = options['baseURL'].length * 0.70;
};

chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
    updateInput();
});

optionsForm.url.addEventListener('input',(event) => {
    options['baseURL'] = event.target.value;
    chrome.storage.sync.set({options});
    updateInput();
});