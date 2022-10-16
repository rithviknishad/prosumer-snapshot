"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snapshot = {
  classPrices: {
    LIMIT: 7.0,
    SOLAR: 3.5,
    WIND: 4.2,
  },
  sellers: {
    "000": { power: 12000, class: "LIMIT" },
    "001": { power: 2000, class: "SOLAR" },
    "002": { power: 2000, class: "SOLAR" },
    "003": { power: 3000, class: "WIND" },
    "004": { power: 2000, class: "WIND" },
  },
  buyers: {
    "005": { power: 10000, class: "GENERAL" },
    "006": { power: 1900, class: "GENERAL" },
    "007": { power: 7000, class: "GENERAL" },
    "008": { power: 1000, class: "GENERAL" },
    "009": { power: 0, class: "LIMIT" },
  },
};
exports.default = snapshot;
//# sourceMappingURL=snapshot1.js.map
