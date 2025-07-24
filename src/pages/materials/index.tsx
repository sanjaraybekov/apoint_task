import { useEffect, useState } from "react";
import { getMaterials } from "../../api/materials";
import { groupMaterials, startOfMonth, endOfMonth } from "../../helpers/utils";
import type { GroupedMaterials, QueryParams } from "../../helpers/interfaces";
import Filters from "./components/Filters";
import MaterialTableTotals from "./components/MaterialTableTotals";

const initialQuery: QueryParams = {
  start: startOfMonth,
  end: endOfMonth,
};

export default function Materials() {
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [query, setQuery] = useState<QueryParams>(initialQuery);
  const [materials, setMaterials] = useState<GroupedMaterials>();

  const toggleCollapse = (key: string) => {
    setCollapsed((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const fetchMaterials = async () => {
    const { data } = await getMaterials(query);
    if (data) {
      setMaterials(groupMaterials(data));
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [query]);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <Filters onFilterChange={(k, v) => setQuery({ ...query, [k]: v })} />
      <div className="overflow-x-auto">
        <table className="min-w-full mt-6 text-sm">
          <thead>
            <tr>
              <th rowSpan={2} className="p-2">
                Наименование
              </th>
              <th rowSpan={2} className="p-2">
                Цвет
              </th>
              <th rowSpan={2} className="p-2">
                Ед изм
              </th>
              <th rowSpan={2} className="p-2">
                Артикул
              </th>
              <th rowSpan={2} className="p-2">
                Цена учетная
              </th>

              <th colSpan={2} className="p-2 bg-green-100">
                Сальдо начало периода
              </th>
              <th colSpan={2} className="p-2 bg-blue-100">
                Приход
              </th>
              <th colSpan={2} className="p-2 bg-red-100">
                Расход
              </th>
              <th colSpan={2} className="p-2 bg-yellow-100">
                Сальдо на конец периода
              </th>
            </tr>
            <tr>
              <th className="p-2 bg-green-100">Кол-во</th>
              <th className="p-2 bg-green-100">Сумма</th>
              <th className="p-2 bg-blue-100">Кол-во</th>
              <th className="p-2 bg-blue-100">Сумма</th>
              <th className="p-2 bg-red-100">Кол-во</th>
              <th className="p-2 bg-red-100">Сумма</th>
              <th className="p-2 bg-yellow-100">Кол-во</th>
              <th className="p-2 bg-yellow-100">Сумма</th>
            </tr>
          </thead>
          <tbody>
            {materials &&
              Object.entries(materials).map(([name, { children, totals }]) => (
                <>
                  <tr key={name} className="font-semibold odd:bg-gray-50">
                    <td
                      className="cursor-pointer py-1 px-2"
                      onClick={() => toggleCollapse(name)}
                    >
                      {collapsed.includes(name) ? "−" : "+"} {name}
                    </td>

                    {Array.from({ length: 4 }).map((_, i) => (
                      <td key={i} className="py-1 px-2" />
                    ))}
                    <MaterialTableTotals totals={totals} />
                  </tr>

                  {collapsed.includes(name) &&
                    Object.entries(children).map(([cat, { items, totals }]) => (
                      <>
                        <tr key={cat} className="font-semibold odd:bg-gray-50">
                          <td
                            className="cursor-pointer py-1 pl-4"
                            onClick={() => toggleCollapse(`${name}-${cat}`)}
                          >
                            {collapsed.includes(`${name}-${cat}`) ? "−" : "+"}{" "}
                            {cat}
                          </td>
                          {Array.from({ length: 4 }).map((_, i) => (
                            <td key={i} className="py-1 px-2" />
                          ))}
                          <MaterialTableTotals totals={totals} />
                        </tr>
                        {console.log(items)}

                        {collapsed.includes(`${name}-${cat}`) &&
                          items.map((item, idx) => (
                            <tr key={item.material_id}>
                              <td className="pl-8 py-1">
                                {idx + 1}. {item.name}
                              </td>
                              <td className="px-2 py-1">
                                {item.color ? (
                                  <div
                                    className="w-5 h-5 border border-gray-300 rounded-full"
                                    style={{
                                      backgroundColor: item.color.color,
                                    }}
                                  />
                                ) : (
                                  "-"
                                )}
                              </td>
                              <td className="px-2 py-1">{item.unit}</td>
                              <td className="px-2 py-1">{item.code}</td>
                              <td className="px-2 py-1">{item.last_price}</td>
                              <MaterialTableTotals totals={item} />
                            </tr>
                          ))}
                      </>
                    ))}
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
