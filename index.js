require("dotenv").config();
const mqtt = require("mqtt");

const MQTT_URL = process.env.MQTT_URL;
const client = mqtt.connect(`mqtt://${MQTT_URL}`);

const writeData = (id, export_power, base_selling_price) => {
  const timestamp = new Date().toISOString();
  const data = JSON.stringify({ export_power, base_selling_price, timestamp });

  client.publish(`prosumer/${id}/data`, data);
};

const handleOnConnect = () => {
  console.log(`Connected to ${MQTT_URL}`);

  const snapshot = require(`./dist/${process.env.SNAPSHOT}`).default;
  const classPrices = snapshot.classPrices;

  Object.keys(snapshot.sellers).map((id) =>
    writeData(
      id,
      +snapshot.sellers[id].power,
      classPrices[snapshot.sellers[id].class]
    )
  );
  Object.keys(snapshot.buyers).map((id) =>
    writeData(id, -snapshot.buyers[id].power, 0.0)
  );
  client.end();
};

client.on("connect", handleOnConnect);
