export interface QueryParams {
  [key: string]: string | number;
}

export interface Material {
  category: string | null;
  code: string;
  color: {
    name: string;
    color: string;
  } | null;
  last_price: number;
  material_id: number;
  min_amount: number | null;
  name: string;
  parent: string | null;
  remind_end_amount: number;
  remind_end_sum: number;
  remind_income_amount: number;
  remind_income_sum: number;
  remind_outgo_amount: number;
  remind_outgo_sum: number;
  remind_start_amount: number;
  remind_start_sum: number;
  unit: string;
  width: string;
}

export interface Totals {
  remind_start_sum: number;
  remind_start_amount: number;
  remind_income_sum: number;
  remind_income_amount: number;
  remind_outgo_sum: number;
  remind_outgo_amount: number;
  remind_end_sum: number;
  remind_end_amount: number;
}

export interface GroupedMaterials {
  [key: string]: {
    name: string;
    children: {
      [name: string]: {
        name: string | null;
        items: Material[];
        totals: Totals;
      };
    };
    totals: Totals;
  };
}
