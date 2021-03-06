import csvUtils from "papaparse";
import { downloadFile } from "./download-saver";

/**
 *
 * @param {string} input
 * @param config @url{https://www.papaparse.com/docs#config}
 * @return
 */
export const csvParse = <T = any>(input: string, config: any = {}) => {
  return csvUtils.parse<T>(input, config);
};

/**
 *
 * @param data
 * @param config @url{https://www.papaparse.com/docs#config}
 */
export const csvUnparse = (
  data: any,
  config: any = {
    delimiter: ";"
  }
): string => {
  return csvUtils.unparse(data, config);
};

export const downloadCsv = (data: any = [], filename: string) => {
  const csv = csvUnparse(
    data.map((_) => _.map((__) => (typeof __ === "object" && __?.text ? __.text : __))),
    {}
  );
  const blob = new Blob([csv], { type: "application/octet-stream" });
  downloadFile(blob, filename);
};
