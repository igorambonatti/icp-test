import React from "react";
import { DataItem } from "../types";

interface PriceHistoryTableProps {
  data: DataItem[];
}

const PriceHistoryTable: React.FC<PriceHistoryTableProps> = ({ data }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full">
        <div className="overflow-y-auto max-h-[700px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume In Quote
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume In Base
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id.toString()} className="hover:bg-gray-100">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item.date}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item.time}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: item.priceDigitsLimit,
                    })}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item.volume.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: item.priceDigitsLimit,
                    })}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item.volumeInQuote.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: item.priceDigitsLimit,
                    })}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item.volumeInBase.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: item.priceDigitsLimit,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryTable;
