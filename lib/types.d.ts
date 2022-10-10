export declare type ProsumerID = string;
export declare type Power = number;
export declare type Price = number;
export declare type ProsumerClass = "SOLAR" | "WIND" | "LIMIT";
export declare type ProsumerSnapshotData = {
  exportPower: Power;
  baseSellingPrice: Price;
  class: ProsumerClass;
};
export declare type Snapshot = Record<ProsumerID, ProsumerSnapshotData>;
