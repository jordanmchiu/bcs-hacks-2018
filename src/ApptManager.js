// import * as parse5 from "/../node_modules/parse5/lib/index";


class HTMLParser {
    routify(urlList) {
        let rp = require('request-promise');
        let parse5 = require('parse5');
        let entries = [];
        for (let listing of urlList) {
            const URL = listing["url"];
            console.log(URL);
            let routificEntry = rp(URL)
                .then(function (htmlString) {
                    console.log("Got html string!");
                    const htmlDoc = parse5.parse(htmlString);
                    console.log(htmlDoc);
                    const latlng = this.getLatLng(htmlDoc);
                    return Promise.resolve(htmlDoc);
                })
                .catch(function (err) {
                    console.log("ERROR");
                });
            entries.push(routificEntry);
        }
        console.log("Entries: " + entries);
        Promise.all(entries).then((finishedEntires) => {
            // let routificRequest = this.formatRoutific(urlList, finishedEntries);
            console.log(finishedEntires);
        }).catch((err) => {
            console.log("Promise.all error");
        })
    }
    getLatLng(htmlDoc) {

    }
    getLatLng(htmlNode) {
        if (htmlNode) {
            buildingPromises.push(this.getOneBuildingsInfo(node, data, id));
            return buildingPromises;
        } else if (node.hasOwnProperty("childNodes")) {
            for (const childNode of node.childNodes) {
                buildingPromises.concat(
                    this.parseIndexPage(childNode as parse5.AST.Default.Element, data, buildingPromises, id));
            }
            return buildingPromises;
        } else {
            return [];
        }
    }
    completeEntry(listing, latlng) {

    }
    formatRoutific(urlList, finishedEntries) {

    }
}

let testParser = new HTMLParser();
let testObject = {
    url: 'https://vancouver.craigslist.ca/van/apa/d/posh-4-bedroom-35-bathroom/6514756192.html',
}
let testObject2 = {
    url: 'https://vancouver.craigslist.ca/van/apa/d/posh-4-bedroom-35-bathroom/6514756192.html',
}
testParser.routify([testObject, testObject2]);