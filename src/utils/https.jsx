import axios from "axios";

export default axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://today.line.me/id/portaljson",
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  }
});