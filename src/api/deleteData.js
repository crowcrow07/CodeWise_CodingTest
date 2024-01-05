import MockApi from "../utils/mockApi";

const mockApi = new MockApi();

export const deleteData = async (options) => {
  try {
    const response = await mockApi.delete(options);
    return response;
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
