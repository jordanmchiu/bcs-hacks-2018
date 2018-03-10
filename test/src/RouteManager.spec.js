import RouteManager from "../../src/RouteManager";

describe("RouteManager tests", () => {
    const httpParsedObject = {
        numFriends: 2,
        startLoc: "2350 Wesbrook Mall",
        endLoc: "2366 Main Mall #201",
        appointments: {
            visit1: {
                location: {
                    name: "1680 Cambie",
                    lat: 49.2,
                    lon: -123.1
                },
                start: "9:00",
                priority: "high"
            },
            visit2: {
                location: {
                    name: "2738 West 21st Ave",
                    lat: 49.223,
                    lon: -123.1678
                },
                start: "10:00",
                priority: "low"
            }
        }
    };
    const rm = new RouteManager(httpParsedObject);

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

    it("run tests without crashing", async () => {

    });
});