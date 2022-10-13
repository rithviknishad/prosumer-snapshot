require("dotenv").config();
const mqtt = require("mqtt");

const MQTT_URL = process.env.MQTT_URL;
const client = mqtt.connect(`mqtt://${MQTT_URL}`);

const setState = (id, exportPower, baseSellingPrice) => {
  client.publish(`prosumer/${id}/export_power`, `${exportPower}`);
  client.publish(`prosumer/${id}/base_selling_price`, `${baseSellingPrice}`);
};

const handleOnConnect = () => {
  console.log(`Connected to ${MQTT_URL}`);

  const snapshot = require(`./dist/${process.env.SNAPSHOT}`).default;
  const classPrices = snapshot.classPrices;

  Object.keys(snapshot.sellers).map((id) =>
    setState(
      id,
      +snapshot.sellers[id].power,
      classPrices[snapshot.sellers[id].class]
    )
  );
  Object.keys(snapshot.buyers).map((id) =>
    setState(id, -snapshot.buyers[id].power, 0.0)
  );
  client.end();
};

client.on("connect", handleOnConnect);
