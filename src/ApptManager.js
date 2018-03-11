// import * as parse5 from "/../node_modules/parse5/lib/index";


class HTMLParser {
    routify(inputObject) {
        let that = this;
        let rp = require('request-promise');
        let parse5 = require('parse5');
        let entries = [];
        for (let listing of inputObject["urls"]) {
            const URL = listing["url"];
            console.log(URL);
            let routificEntry = rp(URL)
                .then(function (htmlString) {
                    console.log("Got html string!");
                    const htmlDoc = parse5.parse(htmlString);
                    console.log("About to enter getLatLng");
                    const latlng = that.getLatLng(htmlDoc);
                    console.log("done getLatLng");
                    return Promise.resolve(that.completeEntry(listing, latlng));
                })
                .catch(function (err) {
                    console.log(err);
                });
            entries.push(routificEntry);
        }
        Promise.all(entries).then((finishedEntires) => {
            let toRoutific = {
                numFriends: inputObject["drivers"],
                startLoc: "2350 Wesbrook Mall",
                endLoc: "2366 Main Mall",
                appointments: finishedEntires,
            };
            return toRoutific;
        }).catch((err) => {
            console.log("Promise.all error");
        })
    }
    getLatLng(htmlNode) {
        if (htmlNode.hasOwnProperty("attrs") && htmlNode.attrs.length > 3 && htmlNode.attrs[2].name === "data-latitude" && htmlNode.attrs[3].name === "data-longitude") {
            console.log("Found lat lon field!");
            let latlng = {
                lat: htmlNode.attrs[2].value,
                lng: htmlNode.attrs[3].value,
            };
            return latlng;
        } else if (htmlNode.hasOwnProperty("childNodes")) {
            let childResults =  htmlNode.childNodes.map((child) => {
                return this.getLatLng(child)
            });
            for (let result of childResults) {
                if (result) {
                    return result;
                }
            }
            return null;
        } else {
            return null;
        }
    }
    completeEntry(listing, latlng) {
        return {
            id: listing["name"],
            location: {
                name: listing["name"],
                lat: latlng["lat"],
                lng: latlng["lng"],
            },
            start: listing["time"],
            priority: listing["priority"],
        };
    }
}

let testParser = new HTMLParser();
testObject = {
    drivers: 3,
    urls: [
        {
            name: "Posh 4 Bedroom",
            url: 'https://vancouver.craigslist.ca/van/apa/d/posh-4-bedroom-35-bathroom/6514756192.html',
            time: '12:00',
            priority: 'High',
        },
        {
            name: "Garden Suite on Main",
            url: 'https://vancouver.craigslist.ca/van/apa/d/1-bedroom-garden-suite-steps/6520226947.html',
            time: '13:00',
            priority: 'High',
        }
    ],
}
testParser.routify(testObject);