import axios from "axios";

const homePageAPI = {
  getUsersData: (params) =>
    axios.get("https://dummyjson.com/users", { params }),
};

export default homePageAPI;
