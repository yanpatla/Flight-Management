"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const utils_1 = require("./utils");
const airportList_1 = require("./airportList");
const moment_1 = __importDefault(require("moment"));
const TIME_FORMAT = "dd/MM/yyyy - HH:mm";
const app = (0, express_1.default)();
dotenv_1.default.config(process.env.PORT);
console.log(process.env.FRONTEND_URL);
app.use(express_1.default.json());
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Cors Error"));
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: process.env.FRONTEND_URL },
});
const flights = [];
io.on("connection", (socket) => {
    console.log("a user connected");
    setInterval(() => {
        publishEntityUpdate(socket);
    }, 300);
});
app.get("/flights", (req, res) => {
    res.json({ flights });
});
app.get("/flights/:flightNum", (req, res) => {
    const flight = flights.find((p) => p.flightNumber === req.params.flightNum);
    res.json(flight);
});
server.listen(process.env.PORT, () => {
    console.log("server listening on port", process.env.PORT);
    for (let i = 0; i < 50; i++) {
        const randomAP1 = Math.floor(Math.random() * 50);
        const randomAP2 = Math.floor(Math.random() * 50);
        flights.push({
            flightNumber: (0, utils_1.generateFlightNumber)(),
            status: "hangar",
            takeoffTime: "01/02/2022 - 12:35",
            landingTime: "02/02/2022 - 14:30",
            takeoffAirport: airportList_1.airports[randomAP1],
            landingAirport: airportList_1.airports[randomAP2],
        });
    }
});
function publishEntityUpdate(socket) {
    const randomIndex = Math.floor(Math.random() * flights.length);
    const randomFlight = flights[randomIndex];
    const actionType = Math.floor(Math.random() * 3);
    switch (actionType) {
        case 0: // status update
            const chance = Math.random();
            switch (randomFlight.status) {
                case "hangar":
                    randomFlight.status = chance >= 0.9 ? "malfunction" : "airborne";
                    break;
                case "airborne":
                    randomFlight.status =
                        chance >= 0.9
                            ? "malfunction"
                            : chance >= 0.7
                                ? "hangar"
                                : "airborne";
                    break;
                case "malfunction":
                    randomFlight.status = chance >= 0.9 ? "hangar" : "malfunction";
                    break;
            }
            break;
        case 1: // time delay
            const delayByMin = Math.floor(Math.random() * 120);
            randomFlight.takeoffTime = (0, moment_1.default)(randomFlight.takeoffTime, TIME_FORMAT)
                .add(delayByMin, "minutes")
                .format(TIME_FORMAT);
            randomFlight.landingTime = (0, moment_1.default)(randomFlight.landingTime, TIME_FORMAT)
                .add(delayByMin, "minutes")
                .format(TIME_FORMAT);
            break;
        case 2: // destination update
            const newDestination = airportList_1.airports[Math.floor(Math.random() * 50)];
            randomFlight.landingAirport = newDestination;
            break;
    }
    socket.emit("flight-update", randomFlight);
}
