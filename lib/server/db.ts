import fs from "fs";
import path from "path";
import type { Order, Product, StockMovement } from "@/lib/types";

export type ShopDb = {
  products: Product[];
  orders: Order[];
  movements: StockMovement[];
};

const file = path.join(process.cwd(), "data", "db.json");

export function readDb(): ShopDb {
  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw) as ShopDb;
  return {
    products: data.products ?? [],
    orders: data.orders ?? [],
    movements: data.movements ?? [],
  };
}

export function writeDb(db: ShopDb) {
  fs.writeFileSync(file, JSON.stringify(db, null, 2), "utf8");
}
