import type { Totals } from "../../../helpers/interfaces";
import { formatPrice } from "../../../helpers/utils";

export default function MaterialTableTotals({ totals }: { totals: Totals }) {
  return (
    <>
      <td className="py-1 px-2">{formatPrice(totals.remind_start_amount)}</td>
      <td className="py-1 px-2">{formatPrice(totals.remind_start_sum)}</td>
      <td className="py-1 px-2">{formatPrice(totals.remind_income_amount)}</td>
      <td className="py-1 px-2">{formatPrice(totals.remind_income_sum)}</td>
      <td className="py-1 px-2">{formatPrice(totals.remind_outgo_amount)}</td>
      <td className="py-1 px-2">{formatPrice(totals.remind_outgo_sum)}</td>
      <td className="py-1 px-2">{formatPrice(totals.remind_end_amount)}</td>
      <td className="py-1 px-2">{formatPrice(totals.remind_end_sum)}</td>
    </>
  );
}
