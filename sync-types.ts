import { mkdir } from "node:fs/promises";

const apps = [
  {
    name: "item-master",
    id: process.env.KINTONE_APP_ITEM_MASTER,
    token: process.env.KINTONE_TOKEN_ITEM_MASTER,
  },
  {
    name: "sales-order-header",
    id: process.env.KINTONE_APP_SALES_ORDER_HEADER,
    token: process.env.KINTONE_TOKEN_SALES_ORDER_HEADER,
  },
  {
    name: "sales-order-line",
    id: process.env.KINTONE_APP_SALES_ORDER_LINE,
    token: process.env.KINTONE_TOKEN_SALES_ORDER_LINE,
  },
  {
    name: "sales-header",
    id: process.env.KINTONE_APP_SALES_HEADER,
    token: process.env.KINTONE_TOKEN_SALES_HEADER,
  },
  {
    name: "sales-line",
    id: process.env.KINTONE_APP_SALES_LINE,
    token: process.env.KINTONE_TOKEN_SALES_LINE,
  },
];

for (const app of apps) {
  if (!app.id || !app.token) {
    console.warn(`Skip ${app.name}: ID or Token is not set.`);
    continue;
  }

  console.log(`Generating types for ${app.name} (ID: ${app.id})...`);

  await mkdir(`./src/apps/${app.name}`, { recursive: true });

  const proc = Bun.spawn(
    [
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
    ],
    {
      stdout: "inherit",
      stderr: "inherit",
    },
  );

  const exitCode = await proc.exited;

  if (exitCode !== 0) {
    console.error(
      `Failed to generate types for ${app.name}. Exit code: ${exitCode}`,
    );
  } else {
    console.log(`Successfully generated types for ${app.name}.`);
  }
}
