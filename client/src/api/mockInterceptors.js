import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {ITEMS_URL, PROFILE_URL, RATE_ITEM_URL} from "./api";
import mockData from "./mockData";

const mockUser = {
  name: "Ola Uteligger",
  googleId: 1233445564665,
  picture: "https://img.discogs.com/wRVQz7C0Zu_TqLcr-RC2CULegU0=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-812289-1416404008-7352.jpeg.jpg"
};

// const mockAdminUser = {
//   name: "Kong Per",
//   googleId: 23344554395,
//   picture: "https://smp.vgc.no/v2/images/27a10007-ba7b-4604-849e-798a226537e6?fit=crop&h=799&w=1000&s=035f6efcd554f906dc4702041466bef13f73f933",
//   role: "admin"
// };

export const shouldMock = () => {
  return process.env.REACT_APP_USE_MOCK === "true";
};

export const interceptRequestsOnMock = () => {
  const mock = new MockAdapter(Axios);

  //GET ITEMS
  mock.onGet(`${ITEMS_URL}`).reply(200, mockData);

  //GET ITEM
  mock.onGet(new RegExp(`${ITEMS_URL}*`)).reply(200, mockData[0]);
  //mock.onGet(new RegExp(`${ITEMS_URL}/*`)).reply(401, "errormessage");

  mock.onDelete(`${ITEMS_URL}`).reply(200);
  mock.onPost(`${ITEMS_URL}`).reply(200);
  mock.onPut(`${ITEMS_URL}`).reply(200);

  //GET PROFILE
  mock.onGet(new RegExp(`${PROFILE_URL}*`)).reply(200, mockUser);

  //USER RATING
  mock.onPost(new RegExp(`${RATE_ITEM_URL}*`)).reply(200, mockUser);
  //mock.onGet(new RegExp(`${RATE_ITEM_URL}*`)).reply(200, 6);
  mock.onGet(new RegExp(`${RATE_ITEM_URL}*`)).reply(404, 6);


  //FALLBACK
  mock.onAny().reply(config => {
    console.error("Could not find mock for " + config.url);
    throw new Error("Could not find mock for " + config.url);
  });
};
