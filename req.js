const axios = require("axios");

const fun = async (API_URL, rps) => {
  let startTime = new Date(),
    cnt = 0,
    totalReq = 0;
  while (true) {
    try {
      await axios.get(API_URL);

      console.log("Requests sent", totalReq);

      cnt++, totalReq++;

      const elapsedTime = new Date() - startTime;

      if (elapsedTime >= 1000) {
        startTime = new Date();
        cnt = 0;
      }

      if (cnt === rps) {
        await new Promise((resolve) => setTimeout(resolve, 1000 - elapsedTime));

        startTime = new Date();
        cnt = 0;
      }
    } catch (error) {
      console.error(`Request failed - Error: ${error.message}`);
    }
  }
};

module.exports = fun;
