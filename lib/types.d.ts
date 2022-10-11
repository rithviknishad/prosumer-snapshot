export declare type ProsumerID = string;

export declare type Power = number;

export declare type Price = number;

export declare type GenerationClass = "SOLAR" | "WIND" | "LIMIT";

export declare type DemandClass =
  | "RESEDENTIAL"
  | "GENERAL"
  | "LIMIT"
  | "EV"
  | "BATTERY"
  | "FARM";

export declare type ProsumerSnapshot<T extends GenerationClass | DemandClass> =
  {
    power: Power;
    class: T;
  };
export declare type ClassBaseSellingPrices = Record<GenerationClass, Price>;

/**
 * Snapshot contains three main lookup tables:
 * * `classPrices`
 * * `sellers`
 * * `buyers`
 *
 * ### Additional Notes:
 *
 *  * "LIMIT" class means it's an external source such as grid, and hence
 *    market price evaluation service knows that this price is not flexible.
 *
 *  * The difference between the sum of all the power of sellers and sum of all
 *    power of buyers gives the power loss in the grid. This loss shall not
 *    exceed beyond 10% of the total generation for any scenario, as it is
 *    an unlikely ssituation.
 */
export declare type Snapshot = {
  /**
   * #### Class Prices:
   *    This lookup table shall contain all the generation class specific base
   *    selling price. Keys are the generation class names, and values are the
   *    associated selling price of the key.
   */
  classPrices: ClassBaseSellingPrices;

  /**
   * #### Buyers:
   *    This lookup table shall contain all the sellers data. Key is the prosumer
   *    ID, and value contains record of `power` and `class`.
   *    - `power` shall be in kilowatts.
   *    - `class` shall be one of the following: "RESEDENTIAL", "GENERAL", "LIMIT"
   */
  buyers: Record<ProsumerID, ProsumerSnapshot<DemandClass>>;

  /**
   * #### Sellers:
   *    This lookup table shall contain all the sellers data. Key is the prosumer
   *    ID, and value contains record of `power` and `class`.
   *    - `power` shall be in kilowatts.
   *    - `class` shall be one of the keys in the `classPrices` lookup table.
   */
  sellers: Record<ProsumerID, ProsumerSnapshot<GenerationClass>>;
};
