const Routific = require('routific');
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBAOmNFIWU93LeibDTvCVipCx97sbylpUA'
});

// This is your actual token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWE0MjQ0ZjI0MTNkZjE3MGQ2MmU3ZjkiLCJpYXQiOjE1MjA3MDY2Mzl9.RvTbbLcjX-QxhTCReezAtR57O_amuM_TgmmpOpCpV3k'

const options = {token: token};
const client  = new Routific.Client(options);

const vrp = new Routific.Vrp();

module.exports = class RouteManager {
    constructor(httpParsedObject) {
        this.vehicles = this.makeFleet(httpParsedObject["numFriends"], httpParsedObject["startLoc"], httpParsedObject["endLoc"]);
        this.visits = this.makeVisits(httpParsedObject["appointments"]);
    }

    /**
     * Get get LatLng from given address as string
     * @param address
     */
    async getLatLng(address) {
        googleMapsClient.geocode({
                address: address
            },
            function(err, response) {
                if (!err) {
                    console.log(response.json.results);
                    return response["location"];
                }
            });
    }

    /**
     * Build a fleet array
     * @param numFriends
     * @param startLoc
     * @param endLoc
     */
    async makeFleet(numFriends, startLoc, endLoc) {
        const vehicles = [];
        for (let i = 1; i <= numFriends; i++) {
            const vehicleObject = {};
            vehicleObject["id"] = "vehicle_" + i;
            vehicleObject["start_location"] = await this.getLatLng(startLoc);
            vehicleObject["start_location"]["id"] = startLoc;
            vehicleObject["end_location"] = await this.getLatLng(endLoc);
            vehicleObject["end_location"]["id"] = endLoc;
            vehicles.push(vehicleObject);
        }
        return vehicles;
    }

    /**
     * Build a visits array
     * @param appointments
     * @returns {Array}
     */
    makeVisits(appointments) {
        const visits = [];
        let i = 1;
        for (const visit in appointments) {
            const visitObject = {};
            visitObject["id"] = "visit_" + i;
            visitObject["location"] = visit["location"];
            visitObject["start"] = visit["start"];
            visitObject["priority"] = visit["priority"];
            visits.push(visitObject);
        }
        return visits;
    }

    /**
     * Send request to Routific API
     * @returns API response (see documentation: https://docs.routific.com/docs/api-reference)
     */
    sendRequest() {
        this.visits.map((visit) => {
            vrp.addVisit(visit.id, visit);
        })
        this.vehicles.map((vehicle) => {
            vrp.addVehicle(vehicle.id, vehicle);
        })
        client.route(vrp, (err, solution, jobId) => {
            if (err) {
                console.log("An error occurred");
                console.log(err);
            } else if (solution.status == "success") {
                return solution;
            }
        })
    }
}