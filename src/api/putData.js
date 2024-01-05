import MockApi from "../utils/mockApi";

export async function putData(options) {
  const mockApi = new MockApi();

  try {
    const response = await mockApi.put(options);
    return response;
  } catch (error) {
    console.error("Error post data:", error);
  }
}
