import React, { useState } from "react";


const PricingTabContent = () => {
  const [formData, setFormData] = useState({
    price: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      
      const vendorId = localStorage.getItem("vendorID");
  
      if (!vendorId) {
        console.error("Vendor ID not available");
        return;
      }
      const payload = {
        ...formData,
        vendorId: vendorId,
      };
  
      // Make a POST request using the Fetch API
      const response = await fetch(`http://localhost:4000/api/tours/${vendorId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      // Parse the response JSON
      const data = await response.json();
  
      console.log("API response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="col-xl-9 col-lg-11">
      <div className="form-input ">
        <input
          type="text"
          name="price"
          required
          value={formData.price}
          onChange={handleChange}
        />
        <label className="lh-1 text-16 text-light-1">Hotel Price</label>
      </div>

      <div className="col-md-12 d-inline-block mt-30">
        <button
          type="button"  // Change to "button" to prevent form submission
          className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          onClick={handleSubmit}
        >
          Save Changes <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
    </div>
  );
};

export default PricingTabContent;
