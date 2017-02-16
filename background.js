const active = {};

function onBrowserActionClicked(tab) {
	if(active[tab.id] == false) {
		setActive(tab.id, true);
		chrome.tabs.executeScript(tab.id, {file: "selectitem.js"});	
	}
};

function setActive(tabid, val) {
	chrome.tabs.getSelected(null, currenttab => {
		active[tabid] = (typeof val == 'boolean') ? val : false;
		if (currenttab.id == tabid) {
			chrome.browserAction.setIcon({
	         path: active[tabid] ? 'logo_small2.png' :
                   'logo_small.png'
			});
			setMenu(active[tabid]);
		}
	});
};

function setMenu(active) {
	if (active)
		setMenuItem('element');
	else
		chrome.contextMenus.removeAll();
};

function setMenuItem(item) {
	chrome.contextMenus.create({
		"title" : "Scrape element",
		"type" : "normal",
		"contexts" : ["all"],
		"onclick" : exportElement(item)
	});
};

function exportElement(item) {
	return function(data, tab) {
		chrome.tabs.executeScript(tab.id, {
			code:`exportHTML(lastElem, '${item}');`
		});
		
		setActive(tab.id, false);
	};
};

chrome.browserAction.onClicked.addListener(onBrowserActionClicked);


chrome.tabs.onUpdated.addListener(tabid => {
  setActive(tabid, false);
});

chrome.tabs.onRemoved.addListener(tabid => { 
  delete active[tabid]; 
});

chrome.tabs.onSelectionChanged.addListener(tabid => {
  setActive(tabid, active[tabid]);
});