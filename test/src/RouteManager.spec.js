let RouteManager = require("../../src/RouteManager");

describe("RouteManager tests", async () => {
    const httpParsedObject = {
        numFriends: 2,
        startLoc: "2350 Wesbrook Mall",
        endLoc: "2366 Main Mall",
        appointments: [{
                id: "visit_1",
                location: {
                    name: "1680 Cambie",
                    lat: 49.2,
                    lng: -123.1
                },
                start: "9:00",
                priority: "high"
            },
            {
                id: "visit_2",
                location: {
                    name: "2738 West 21st Ave",
                    lat: 49.223,
                    lng: -123.1678
                },
                start: "10:00",
                priority: "low"
            }
        ]
    };
    const rm = new RouteManager();

    before(async function () {
        console.log(`Before: ${this.test.parent.title}`);
    });

    beforeEach(function () {
        console.log(`BeforeTest: ${this.currentTest.title}`);
    });

    after(function () {
        console.log(`After: ${this.test.parent.title}`);
    });

    afterEach(function () {
        console.log(`AfterTest: ${this.currentTest.title}`);
    });

    it("make object without crashing", async (done) => {
        let response = await rm.sendRequest(httpParsedObject);
        setTimeout(() => {
            console.log("Routific Response: " + response);
            done();
        }, 10000);
    });

    /*
    it("Should get address", async () => {
        try {
            const latLng = await rm.getLatLng("2350 Wesbrook Mall");
            console.log(latLng);
        } catch (err) {
            console.log(err);
        }
    });
    */
});