import React, { useState } from "react";
import { Button } from "react-bootstrap";

const AdminProjectsHeroDataComponent = ({ data }) => {
  const [heroData, setHeroData] = useState(data.heroData || []);

  // Function to handle text changes for hero text (for existing data)
  const handleHeroTextChange = (index, language, value) => {
    const updatedHeroData = heroData.map((hero, i) => {
      if (i === index) {
        const updatedHero = { 
          ...hero, // Ensure the hero object is copied
          heroText: { 
            ...hero.heroText, // Copy the heroText object
            [language]: value // Update the specific language field
          }
        };
        return updatedHero;
      }
      return hero;
    });

    setHeroData(updatedHeroData);
  };

  // Function to handle image change for a hero (for existing data)
  const handleImageChange = (index, file) => {
    const updatedHeroData = heroData.map((hero, i) => {
      if (i === index) {
        const updatedHero = { 
          ...hero, // Clone the hero object
          image: { 
            ...hero.image, // Clone the image object
            fileName: file.name, // Update the file name
            url: URL.createObjectURL(file), // Create a preview URL for the image
          },
          updatedAt: new Date().toISOString(), // Optionally, update the timestamp
        };
        return updatedHero;
      }
      return hero;
    });

    setHeroData(updatedHeroData);
  };

  // Function to handle adding a new hero (for new data)
  const handleAddHero = () => {
    const newHero = {
      heroText: { ge: "", en: "" },
      image: { url: "", fileName: "" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setHeroData([...heroData, newHero]);
  };

  // Function to handle creating a hero (for new data when the "Create Hero" button is clicked)
  const handleCreateHero = (index) => {
    const newHero = heroData[index];
    console.log("Creating Hero: ", newHero);
    // You can add additional logic here (e.g., send data to a backend API or perform validations)
  };

  // Function to handle updating a hero (for existing data)
  const handleUpdateHero = (index) => {
    const heroToUpdate = heroData[index];
    console.log("Updating Hero: ", heroToUpdate);
    // You can add more logic here to save the updated data to a backend or database
  };

  // Function to handle deleting a hero (for existing data)
  const handleDeleteHero = (index) => {
    const heroToDelete = heroData[index];
    console.log("Deleting Hero: ", heroToDelete);

    // Remove the hero from the heroData state
    const updatedHeroData = heroData.filter((_, i) => i !== index);
    setHeroData(updatedHeroData);
  };

  return (
    <form>
      {/* Hero Information */}
      {heroData.map((hero, index) => (
        <div key={hero._id || index}>
          {/* Use _id for key if available */}
          {/* Hero Text (Georgian) */}
          <div>
            <label>Hero Text (Georgian)</label>
            <input
              type="text"
              value={hero.heroText.ge}
              onChange={(e) =>
                handleHeroTextChange(index, "ge", e.target.value)
              }
            />
          </div>
          {/* Hero Text (English) */}
          <div>
            <label>Hero Text (English)</label>
            <input
              type="text"
              value={hero.heroText.en}
              onChange={(e) =>
                handleHeroTextChange(index, "en", e.target.value)
              }
            />
          </div>
          {/* Hero Image */}
          <div>
            <label>Hero Image</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
            />
            {/* Display the uploaded image if available */}
            {hero.image.url && (
              <img src={hero.image.url} alt="Hero" width="100" height="auto" />
            )}
            {/* Display the old image filename */}
            {hero.image.fileName && !hero.image.url && (
              <p>Current image: {hero.image.fileName}</p>
            )}
          </div>
          {/* Buttons for Updating or Deleting Hero */}
          {hero._id ? (
            <div>
              <Button variant="info" onClick={() => handleUpdateHero(index)}>
                Update Hero
              </Button>
              <Button variant="danger" onClick={() => handleDeleteHero(index)}>
                Delete Hero
              </Button>
            </div>
          ) : (
            <Button variant="success" onClick={() => handleCreateHero(index)}>
              Create Hero
            </Button>
          )}
        </div>
      ))}

      {/* Add More Heroes Button (only for new heroes) */}
      <Button onClick={handleAddHero}>Add Hero</Button>
    </form>
  );
};

export default AdminProjectsHeroDataComponent;
