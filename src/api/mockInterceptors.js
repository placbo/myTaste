import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ITEMS_URL } from "./itemApi";
import mockData from "./mockData";

// AXIOS INTERCEPTOR
export const interceptRequestsOnMock = () => {
  console.log(mockData);

  const mock = new MockAdapter(Axios);

  mock.onGet(new RegExp(`${ITEMS_URL}/*`)).reply(200, mockData);

  mock.onAny().reply(config => {
    console.error("Could not find mock for " + config.url);
    throw new Error("Could not find mock for " + config.url);
  });
};
