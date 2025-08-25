import { ApiResponse } from "../utils/api-response.js";

const healthcheck = async (req, res) => {
  try {
    await res
      .status(200)
      .json(new ApiResponse(200, { message: "Server is running" }));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse(500, { message: "Internal Server Error" }));
  }
};

export { healthcheck };
