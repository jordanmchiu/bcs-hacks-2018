const Routific = require('routific');
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBAOmNFIWU93LeibDTvCVipCx97sbylpUA',
    Promise: Promise
});

// This is your actual token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWE0MjQ0ZjI0MTNkZjE3MGQ2MmU3ZjkiLCJpYXQiOjE1MjA3MDY2Mzl9.RvTbbLcjX-QxhTCReezAtR57O_amuM_TgmmpOpCpV3k'

const options = {token: token};
const client  = new Routific.Client(options);

const vrp = new Routific.Vrp();

module.exports = class RouteManager {
    constructor() {
        this.vehicles = [];
        this.visits = [];
    }

    /**
     * Send request to Routific API
     * @returns API response (see documentation: https://docs.routific.com/docs/api-reference)
     */
    async sendRequest(httpParsedObject) {
        await this.makeFleet(httpParsedObject);
        await this.makeVisits(httpParsedObject);

        this.visits.map((visit) => {
            vrp.addVisit(visit.id, visit);
        });
        this.vehicles.map((vehicle) => {
            vrp.addVehicle(vehicle.id, vehicle);
        });

        return new Promise((resolve, reject) => {
            console.log("Entered Promise");
            client.route(vrp, (err, solution, jobId) => {
                console.log("Entered client.route");
                if (err) {
                    console.log("An error occurred");
                    console.log(err);
                } else if (solution.status === "success") {
                    console.log("Success with sendRequest!");
                    resolve(solution);
                }})
            });
       }

    /**
     * Get get LatLng from given address as string
     * @param address
     */
    async getLatLngRouteManager(address) {
        let latLng;
        await googleMapsClient.geocode({
                address: address
            }).asPromise()
            .then((response) => {
                // console.log(response.json.results);
                console.log("Success with getLatLngRouteManager!");
                latLng = response.json.results[0].geometry.location;
            })
            .catch((err) => {
                console.log(err);
            });
        return latLng;
    }

    /**
     * Build a fleet array
     * @param httpParsedObject
     */
    async makeFleet(httpParsedObject) {
        const numFriends = httpParsedObject["numFriends"];
        const startLoc = httpParsedObject["startLoc"];
        const endLoc = httpParsedObject["endLoc"];
        const vehicles = [];
        for (let i = 1; i <= numFriends; i++) {
            const vehicleObject = {};
            vehicleObject["id"] = "vehicle_" + i;
            vehicleObject["start_location"] = await this.getLatLngRouteManager(startLoc);
            //vehicleObject["start_location"] = { lat: 49.246292, lng: -123.116226 };
            vehicleObject["start_location"]["id"] = startLoc;
            vehicleObject["end_location"] = await this.getLatLngRouteManager(endLoc);
            //vehicleObject["end_location"] = { lat: 49.246292, lng: -123.116226 };
            vehicleObject["end_location"]["id"] = endLoc;
            vehicles.push(vehicleObject);
        }
        this.vehicles = vehicles;
    }

    /**
     * Build a visits array
     * @param appointments
     * @returns {Array}
     */
    makeVisits(httpParsedObject) {
        this.visits = httpParsedObject["appointments"];
    }
}