let windowIndexArray = [];

const openLinkWindow = (linkHref, windowIndex) => {
    if (windowIndexArray.includes(windowIndex)) return;
    else windowIndexArray.push(windowIndex);

    let minimized = true;
    let fullSize = false;
    const popup = document.createElement('div');
    const addPopupStyle = (styles) => {
        //default styles
        popup.style = "position: fixed;z-index: 999;background-color: white;box-shadow: 0 0 10px #00000069;border-radius: 5px;overflow: hidden;" + styles;
    }
    const closeLinkWindow = () => {
        popup.remove();
        windowIndexArray.pop(windowIndex);
    }
    const toggleWindowState = () => {
        // maximized state
        if (minimized) addPopupStyle("top: calc(50% - 40vh);left: 10vw;width: 80vw;height: 80vh;resize: both;");
        // minimized state
        else addPopupStyle("top: 5px;left: calc(100vw - 5px - 200px );width: 200px;height: 30px;cursor: pointer;");
        minimized = !minimized;
    };
    const openLink = () => {
        window.open(linkHref);
    };
    toggleWindowState();
    document.body.append(popup);
    popup.innerHTML = `
    <div draggable="true" id="link-navbar-${windowIndex}" style="display: flex; width: 100%;height: 30px;background-color: rgb(247, 240, 255);position: absolute;top: 0;left: 0;">
        <style>
            .nav-action-but {
                position: relative;
                width: 12px;
                height: 12px;
                background-color: rgb(227, 60, 60);
                border: .5px solid rgba(0, 0, 0, 0.2);
                border-radius: 100%;
                margin: 2px;
                overflow: hidden;
            }
            .nav-action-but img {
                opacity: 0;
            }
            .nav-action-but:hover img {
                opacity: 1;
            }
            
        </style>
        <div style="display: flex;align-items: center;margin-left: 5px;">
            <div id="close-but-${windowIndex}" class="nav-action-but" style="background-color: rgb(227, 60, 60);"><img style="position: absolute;width: 10px;height: 10px;top: 1px;left: .5px;" src="https://cdn.icon-icons.com/icons2/916/PNG/512/Close_icon-icons.com_71857.png" ></div>
            <div id="minimize-but-${windowIndex}" class="nav-action-but" style="background-color: rgb(255, 233, 65);"><img style="position: absolute;width: 6px;height: 16px;top: -2.3px;left: 2.5px;" src="https://icons.veryicon.com/png/o/miscellaneous/skent-icon/minimize-8.png"></div>
            <div id="open-link-but-${windowIndex}" class="nav-action-but" style="background-color: rgb(84, 99, 231);"><img style="position: absolute;width: 10px;height: 10px;top: 1px;left: .5px;" src="https://cdn.iconscout.com/icon/free/png-256/free-north-east-arrow-5226969-4360332.png" ></div>
        </div>
        <div id="link-title-${windowIndex}" style="display: flex;align-items: center;color: #414141;font-size: 14px;font-family: sans-serif;margin-left: 10px;text-wrap: nowrap;overflow: hidden;user-select: none;width: -webkit-fill-available;"></div>
    </div>
    <iframe id="link-iframe-${windowIndex}" style="all: unset;width: 100%;height: calc(100% - 30px);position: absolute;top: 30px;left: 0;" src="${linkHref}"></iframe>`
    dragElement(popup, document.getElementById('link-navbar-' + windowIndex));
    document.getElementById('close-but-' + windowIndex).addEventListener('click', closeLinkWindow);
    document.getElementById('open-link-but-' + windowIndex).addEventListener('click', openLink);
    document.getElementById('minimize-but-' + windowIndex).addEventListener('click', toggleWindowState);
    const titleElement = document.getElementById('link-title-' + windowIndex);
    titleElement.addEventListener('click', () => {
        if (minimized) toggleWindowState();
    })
    titleElement.addEventListener('dblclick', () => {
        if (!minimized) {
            if (fullSize) addPopupStyle("top: calc(50% - 80vh);left: 10vw;width: 80vw;height: 80vh;resize: both;");
            else addPopupStyle("top: 0;left: 0;width: 100vw;height: 100vh;resize: both;");
            fullSize = !fullSize;
        }
    })
    document.getElementById('link-iframe-' + windowIndex).addEventListener('load', (e) => {
        titleElement.textContent = e.target.contentDocument.title;
    })
}

document.querySelectorAll('a').forEach((link, i) => {
    const linkHref = link.href;
    link.addEventListener("click", () => {
        openLinkWindow(linkHref, i);
    });
    link.removeAttribute('href');
});
