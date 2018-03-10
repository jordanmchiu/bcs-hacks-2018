const Routific = require('routific');

// This is your actual token
const token   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWE0MjQ0ZjI0MTNkZjE3MGQ2MmU3ZjkiLCJpYXQiOjE1MjA3MDY2Mzl9.RvTbbLcjX-QxhTCReezAtR57O_amuM_TgmmpOpCpV3k'

const options = {token: token};
const client  = new Routific.Client(options);

const vrp = new Routific.Vrp();

export default class RouteManager {
    private instance RouteManager;
    // TODO: write the class RouteManager

    private constructor() {

    }

    public static getInstance() {
        if (instance === undefined) {
            instance = new RouteManager();
        }
        return instance;
    }
}

// TODO: Singleton?  Yeah, singleton.
//