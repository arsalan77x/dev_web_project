import axios from "axios";
import { ErrorHandler } from "./ErrorHandler";
export const query = async (options) => {
  var data
  await axios(options)
    .then(Response => {
      if (Response) {
        if (Response.data.status !== 200)
          ErrorHandler(Response.data)
        else
          data = Response.data
      }
    })
    .catch(error => {
      if (error && error.response) {
        ErrorHandler(error.response.data)
        data = error.response.data
      }
    })
  return data
}
