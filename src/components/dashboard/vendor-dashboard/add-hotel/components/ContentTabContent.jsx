import React, { useState } from "react";
import GalleryUploader from "./content/GalleryUploader";
import { v4 as uuidv4 } from "uuid";
const ContentTabContent = () => {
  const [tourData, setTourData] = useState({
    uuid: uuidv4(),
    name: "",
    location: "",
    cost: "",
    duration: "",
  });

  const handleSaveImages = (images) => {
   
    // console.log(images);
  };

  const handleTourDataChange = (fieldName, value) => {
    setTourData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
 
  const handleSaveChanges = async () => {
    try {
      const vendorId = localStorage.getItem("vendorID");
  
      if (!vendorId) {
        console.error("Vendor ID not available");
        return;
      }
  
      const payload = {
        ...tourData,
        vendorId: vendorId,
      };
  
      const response = await fetch(`http://localhost:4000/api/tours/${vendorId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const responseData = await response.json();
  
      console.log("API response:", responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="col-xl-10">
      <div className="text-18 fw-500 mb-10">Hotel Content</div>

      <div className="row x-gap-20 y-gap-20">
        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.name}
              onChange={(e) => handleTourDataChange("name", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Tour Name</label>
          </div>
        </div>
        {/* End Name */}

        <div className="col-12">
          <div className="form-input">
            <textarea
              required
              rows={5}
              defaultValue={""}
              value={tourData.location}
              onChange={(e) => handleTourDataChange("location", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Location</label>
          </div>
        </div>

        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.cost}
              onChange={(e) => handleTourDataChange("cost", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Cost</label>
          </div>
        </div>

        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.duration}
              onChange={(e) => handleTourDataChange("duration", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Duration</label>
          </div>
        </div>
      </div>

      {/* <div className="mt-30">
        <div className="fw-500">Gallery</div>
        <GalleryUploader onSaveImages={handleSaveImages} />
      </div> */}

      <div className="d-inline-block pt-30">
        <button
          className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          onClick={handleSaveChanges}
        >
          Save Changes <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
    </div>
  );
};

export default ContentTabContent;
