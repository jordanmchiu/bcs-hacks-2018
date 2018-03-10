import * as parse5 from "/../node_modules/parse5/lib/index";


class HTMLParser {
    public routify(urlList) {
        rp = require('request-promise');
        entries = [];
        for (listing of urlList) {
            const URL = listing["url"];
            routificEntry = rp(URL)
                .then(function (htmlString) {
                    const htmlDoc = parse5.parse(htmlString);
                    const latlng = this.getLatLng(htmlDoc);
                    return Promise.resolve(this.completeEntry(listing, latlng));
                })
                .catch(function (err) {
                    console.log("ERROR");
                });
            entries.push(routificEntry);
        }
        Promise.all(entries).then((finishedEntires) => {
            routificRequest = this.formatRoutific(urlList, finishedEntries);
            console.log(finishedEntires);
        })
    }
    private getHTML(URL) { //return promise of html data

    }
    private getLatLng(htmlDoc) {
        return htmlDoc;
    }
    private completeEntry(listing, latlng) {

    }
    private formatRoutific(urlList, finishedEntries) {

    }
}