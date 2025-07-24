import type { Material, GroupedMaterials } from "./interfaces";
const date = new Date();

export const getToken = () => localStorage.getItem("token");

export function groupMaterials(materials: Material[]) {
  const grouped: GroupedMaterials = {};

  materials.forEach((material) => {
    const parent = material.parent || "Umumiy";
    const category = material.category || "Umumiy kategoriya";

    if (!grouped[parent]) {
      grouped[parent] = {
        name: parent,
        children: {},
        totals: {
          remind_start_amount: 0,
          remind_start_sum: 0,
          remind_income_amount: 0,
          remind_income_sum: 0,
          remind_outgo_amount: 0,
          remind_outgo_sum: 0,
          remind_end_amount: 0,
          remind_end_sum: 0,
        },
      };
    }

    if (!grouped[parent].children[category]) {
      grouped[parent].children[category] = {
        name: category,
        items: [],
        totals: {
          remind_start_amount: 0,
          remind_start_sum: 0,
          remind_income_amount: 0,
          remind_income_sum: 0,
          remind_outgo_amount: 0,
          remind_outgo_sum: 0,
          remind_end_amount: 0,
          remind_end_sum: 0,
        },
      };
    }

    grouped[parent].children[category].items.push(material);

    const categoryTotal = grouped[parent].children[category].totals;
    categoryTotal.remind_start_amount += material.remind_start_amount;
    categoryTotal.remind_start_sum += material.remind_start_sum;
    categoryTotal.remind_income_amount += material.remind_income_amount;
    categoryTotal.remind_income_sum += material.remind_income_sum;
    categoryTotal.remind_outgo_amount += material.remind_outgo_amount;
    categoryTotal.remind_outgo_sum += material.remind_outgo_sum;
    categoryTotal.remind_end_amount += material.remind_end_amount;
    categoryTotal.remind_end_sum += material.remind_end_sum;

    const parentTotal = grouped[parent].totals;
    parentTotal.remind_start_amount += material.remind_start_amount;
    parentTotal.remind_start_sum += material.remind_start_sum;
    parentTotal.remind_income_amount += material.remind_income_amount;
    parentTotal.remind_income_sum += material.remind_income_sum;
    parentTotal.remind_outgo_amount += material.remind_outgo_amount;
    parentTotal.remind_outgo_sum += material.remind_outgo_sum;
    parentTotal.remind_end_amount += material.remind_end_amount;
    parentTotal.remind_end_sum += material.remind_end_sum;
  });

  return grouped;
}

export function formatToUnixTime(date: string) {
  return Math.floor(new Date(date).getTime() / 1000);
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(+price.toFixed(3));
};

/////start va end ni boshqa filterlarda shunday initial values bilan ishlasa kerak deb global qilib kettim
export const startOfMonth = formatToUnixTime(
  new Date(date.getFullYear(), date.getMonth(), 1).toISOString()
);

export const endOfMonth = formatToUnixTime(
  new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString()
);
