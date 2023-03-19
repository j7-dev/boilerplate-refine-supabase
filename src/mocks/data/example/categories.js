import { rest } from "msw";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

const AMOUNT = 30;
const names = [
  "iHOME 家居保險",
  "iHOME 家居保險（升級）",
  "家傭保 4.0",
  "旅遊保",
  "勞工保",
  "汽車保",
];

const categories = new Array(AMOUNT).fill(0).map((_, index) => {
  return {
    id: index,
    created_at: dayjs()
      .subtract(faker.datatype.number({ min: 1, max: 400 }), "day")
      .toISOString(),
    name: faker.helpers.arrayElement(names),
    termId: faker.datatype.number({ min: 0, max: 30 }),
    policyNumber: faker.phone.number(
      `######## ${faker.random.alpha({ count: 3, casing: "upper" })}`
    ),
  };
});

const getCategories = rest.get("/categories", (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(categories));
});

export default [getCategories];
