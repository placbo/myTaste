import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ITEMS_URL, PROFILE_URL } from "./api";
import mockData from "./mockData";

const mockUser = {
  name: "Ola Uteligger",
  googleId: 1233445564665,
  picture: "https://img.discogs.com/wRVQz7C0Zu_TqLcr-RC2CULegU0=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-812289-1416404008-7352.jpeg.jpg"
};

export const shouldMock = () => {
  return process.env.REACT_APP_USE_MOCK === "true";
};

export const interceptRequestsOnMock = () => {
  const mock = new MockAdapter(Axios);

  console.log("data: ", mock);

  mock.onGet(`${ITEMS_URL}`).reply(200, mockData);
  mock.onGet(new RegExp(`${ITEMS_URL}*`)).reply(200, mockData[0]);
  //mock.onGet(new RegExp(`${ITEMS_URL}/*`)).reply(401, "errormessage");

  mock.onGet(new RegExp(`${PROFILE_URL}*`)).reply(200, mockUser);

  mock.onAny().reply(config => {
    console.error("Could not find mock for " + config.url);
    throw new Error("Could not find mock for " + config.url);
  });
};
