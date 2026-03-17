const apps = [
  {
    name: "item-master",
    id: process.env.KINTONE_APP_ITEM_MASTER,
    token: process.env.KINTONE_TOKEN_ITEM_MASTER,
  },
  {
    name: "order",
    id: process.env.KINTONE_APP_ORDER,
    token: process.env.KINTONE_TOKEN_ORDER,
  },
  {
    name: "order-detail",
    id: process.env.KINTONE_APP_ORDER_DETAIL,
    token: process.env.KINTONE_TOKEN_ORDER_DETAIL,
  },
  {
    name: "sales",
    id: process.env.KINTONE_APP_SALES,
    token: process.env.KINTONE_TOKEN_SALES,
  },
  {
    name: "sales-detail",
    id: process.env.KINTONE_APP_SALES_DETAIL,
    token: process.env.KINTONE_TOKEN_SALES_DETAIL,
  },
];

for (const app of apps) {
  if (!app.id || !app.token) {
    console.warn(`Skip ${app.name}: ID or Token is not set.`);
    continue;
  }

  console.log(`App: ${app.name}, ID: ${app.id}, Token: ${app.token}`);

  const proc = Bun.spawn([
    "bun",
    "x",
    "kintone-dts-gen",
    "--base-url",
    process.env.KINTONE_BASE_URL || "",
    "--app-id",
    app.id,
    "--api-token",
    app.token,
    "-o",
    `./src/apps/${app.name}/fields.d.ts`,
  ]);

  await proc.exited;
}
