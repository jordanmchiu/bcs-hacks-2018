// import * as parse5 from "/../node_modules/parse5/lib/index";
let RouteManager = require("./RouteManager");

class HTMLParser {
    async routify(inputObject) {
        console.log(inputObject);
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
        Promise.all(entries).then(async (finishedEntries) => {
            let toRoutific = {
                numFriends: inputObject["drivers"],
                startLoc: "2350 Wesbrook Mall",
                endLoc: "2366 Main Mall",
                appointments: finishedEntries,
            };
            const rm = new RouteManager();
            const routificRes = await rm.sendRequest(toRoutific);
            console.log(JSON.stringify(routificRes));
            return routificRes;
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
                name: listing["url"],
                lat: latlng["lat"],
                lng: latlng["lng"],
            },
            duration: listing["duration"],
            start: listing["time"],
            end: listing["endtime"],
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
            endtime: '13:00',
            duration: 30,
            priority: 'high',
        },
        {
            name: "Garden Suite on Main",
            url: 'https://vancouver.craigslist.ca/van/apa/d/1-bedroom-garden-suite-steps/6520226947.html',
            time: '13:00',
            endtime: '14:00',
            duration: 30,
            priority: 'high',
        },
        {
            name: "Sweet apartment",
            url: 'https://vancouver.craigslist.ca/nvn/apa/d/home-sweet-home/6526163160.html',
            time: '13:00',
            endtime: '14:00',
            duration: 30,
            priority: 'high',
        },
        {
            name: "Townhouse in Burnaby",
            url: 'https://vancouver.craigslist.ca/van/roo/d/sfu-fic-douglas-college/6526179287.html',
            time: '11:00',
            endtime: '12:00',
            duration: 30,
            priority: 'high',
        },
        {
            name: "Basement Suite 4th",
            url: 'https://vancouver.craigslist.ca/nvn/apa/d/large-furnished-studio/6526168419.html',
            time: '13:30',
            endtime: '14:30',
            duration: 30,
            priority: 'high',
        },
        {
            name: "Rowhouse",
            url: 'https://vancouver.craigslist.ca/rds/apa/d/1-bedroom-basement-for-rent/6526149064.html',
            time: '14:30',
            endtime: '15:30',
            duration: 30,
            priority: 'high',
        },
        {
            name: "Doghouse",
            url: 'https://vancouver.craigslist.ca/van/apa/d/lovely-3-bedroom-family-home/6526135165.html',
            time: '13:15',
            endtime: '14:00',
            duration: 30,
            priority: 'high',
        }

    ],
}
testParser.routify(testObject);


    /*


                    https://vancouver.craigslist.ca/van/apa/d/2-bedroom-ground-lvl-suite/6526119554.html
                        https://vancouver.craigslist.ca/van/vac/d/maui-westin-ocean-front-villa/6516979321.html
                            https://vancouver.craigslist.ca/van/apa/d/fully-furnished-1-bedroom/6516464710.html
                                https://vancouver.craigslist.ca/van/apa/d/2-bed-in-kitsilano-for-rent/6514867233.html
                                    https://vancouver.craigslist.ca/van/apa/d/perfect-bright-2-level-3/6526045992.html
                                    */