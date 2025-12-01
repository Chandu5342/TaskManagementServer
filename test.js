import axios from "axios";

export const getAddressFromLatLng = async (lat, lng) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    const response = await axios.get(url, {
      headers: { "User-Agent": "Node.js Application" }
    });

    return response.data.display_name;
  } catch (error) {
    console.error("Reverse geocoding error:", error.message);
    return null;
  }
};

// ⭐ Top-level await
const address = await getAddressFromLatLng(17.6974, 83.2990);
console.log(address);
