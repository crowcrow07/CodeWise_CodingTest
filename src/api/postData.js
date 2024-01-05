import MockApi from "../utils/mockApi";

const mockApi = new MockApi();

export const postData = async (options) => {
  try {
    const response = await mockApi.post(options);

    return response;
  } catch (error) {
    console.error("Error post data:", error);
  }
};
