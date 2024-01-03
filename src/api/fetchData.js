import MockApi from "../utils/mockApi";
import convertDateTime from "../utils/convertDateTime";

const mockApi = new MockApi();

export const fetchData = async (options) => {
  try {
    const response = await mockApi.get();

    if (!response || !response.data || !response.data.articles) {
      throw new Error("Invalid data structure in the API response.");
    }

    const jsonData = response.data.articles;
    const { pageIndex = 0, pageSize = 10 } = options;

    const slicedData = jsonData.slice(
      pageIndex * pageSize,
      (pageIndex + 1) * pageSize
    );

    const convertTimeData = slicedData.map((data) => {
      return {
        ...data,
        modificationDate: convertDateTime(data.modificationDate),
      };
    });
    const pageCount = Math.ceil(jsonData.length / pageSize);

    return {
      rows: convertTimeData,
      pageCount: pageCount,
      totalData: jsonData,
    };
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
};
