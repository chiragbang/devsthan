const PORT = 4000
const URL=`http://localhost:${PORT}`
const postRequest = async (URL, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        // Handle errors for unsuccessful responses
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error making POST request:", error.message);
      throw error;
    }
  };
  
  export { postRequest };