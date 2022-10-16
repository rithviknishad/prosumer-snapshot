require("dotenv").config();
const mqtt = require("mqtt");

const MQTT_URL = process.env.MQTT_URL;
const client = mqtt.connect(`mqtt://${MQTT_URL}`);

const writeData = (
  id,
  export_power,
  base_selling_price,
  _class,
  is_external
) => {
  const timestamp = new Date().toISOString();
  const data = JSON.stringify({
    export_power,
    base_selling_price,
    class: _class,
    is_external,
    timestamp,
  });

  client.publish(`prosumer/${id}/data`, data);
};

const handleOnConnect = () => {
  console.log(`Connected to ${MQTT_URL}`);

  const snapshot = require(`./dist/${process.env.SNAPSHOT}`).default;
  const classPrices = snapshot.classPrices;

  Object.keys(snapshot.sellers).map((id) => {
    const seller = snapshot.sellers[id];
    return writeData(
      id,
      +seller.power,
      classPrices[seller.class],
      seller.class,
      seller.class === "LIMIT"
    );
  });
  Object.keys(snapshot.buyers).map((id) => {
    const buyer = snapshot.buyers[id];
    return writeData(
      id,
      -buyer.power,
      0.0,
      buyer.class,
      buyer.class === "LIMIT"
    );
  });
  client.end();
};

client.on("connect", handleOnConnect);
