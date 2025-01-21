import NodeGeocoder from "node-geocoder";

const options = {
  provider: process.env.GEOCODER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const Geocoder = NodeGeocoder(options);

export default Geocoder;
