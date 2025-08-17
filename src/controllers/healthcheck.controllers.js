import {ApiResponse} from "../utils/api-response.js"

const healthcheck = async (req, res) => {

    try {
    await res.status(200).json(
        new ApiResponse(200, {message: "Server is running"})
    )
    } catch(error) {

    }
}


export {healthcheck}