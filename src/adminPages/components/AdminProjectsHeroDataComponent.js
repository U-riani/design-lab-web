import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {
  useCreateProjectsHeroDataMutation,
  useUpdateProjectsHeroDataMutation,
  useDeleteProjectsHerodataMutation
} from "../../data/projectsSlice";
import { useParams } from "react-router-dom";

const AdminProjectsHeroDataComponent = ({ data }) => {
  const projectId = useParams().projectId;
  const [heroData, setHeroData] = useState(data.heroData || []);
  const [updateProjectsHeroData] = useUpdateProjectsHeroDataMutation(projectId);
  const [createProjectsHeroData] = useCreateProjectsHeroDataMutation();
  const [deleteProjectsHerodata] = useDeleteProjectsHerodataMutation()
  const { upData } = useUpdateProjectsHeroDataMutation(projectId);
  console.log("upData", upData);

  // Function to handle text changes for hero text (for existing data)
  const handleHeroTextChange = (index, language, value) => {
    const updatedHeroData = heroData.map((hero, i) => {
      if (i === index) {
        const updatedHero = {
          ...hero, // Ensure the hero object is copied
          heroText: {
            ...hero.heroText, // Copy the heroText object
            [language]: value, // Update the specific language field
          },
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
          image: file,
          url: URL.createObjectURL(file),
          updatedAt: new Date().toISOString(), // Optionally, update the timestamp
        };
        return updatedHero;
      }
      return hero;
    });

    setHeroData(updatedHeroData);
  };
  console.log(heroData[0].image);

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
  const handleCreateHero = async (index) => {
    const newHero = heroData[index];
  try {
    const formData = new FormData();
    formData.append("index", index);
    formData.append("url", newHero.image.url);
    formData.append("heroText[ge]", newHero.heroText.ge);
    formData.append("heroText[en]", newHero.heroText.en);
    formData.append("images", newHero.image);

    const response = await createProjectsHeroData({ formData, projectId }).unwrap();
    console.log("--Create HeroData res:", response)
  } catch (error) {
    console.log(error);
  }
    console.log("Creating Hero: ", newHero, index);
    // You can add additional logic here (e.g., send data to a backend API or perform validations)
  };

  // Function to handle updating a hero (for existing data)
  // const handleUpdateHero = async (index) => {
  //   console.log(heroData)
  //   const heroToUpdate = heroData[index];
  //   console.log("Updating Hero: ", heroToUpdate.heroText, index);
  //   try{
  //     const response = await updateProjectsHeroData({heroText: heroToUpdate.heroText, projectId, index}).unwrap();
  //    // Assuming `projectId` and `heroData` are available
  //   // const response = await updateProjectsHeroData({ id: projectId, heroData: updatedHeroData });

  //   // Check if the update was successful
  //   if (response.data) {
  //     console.log("Update successful:", response.data); // The server response
  //   } else if (response.error) {
  //     console.error("Update failed:", response.error);
  //   }
  //   }catch(error) {
  //     console.log(error)
  //   }
  //   // You can add more logic here to save the updated data to a backend or database
  // };
  const handleUpdateHero = async (index) => {
    console.log(heroData);
    const heroToUpdate = heroData[index];
    console.log("Updating Hero:", heroToUpdate.heroText, index);
    // const urlLastPart = heroToUpdate.image.url?.split('/').slice(-1)[0];
    console.log(heroToUpdate.image.url);
    try {
      // Sending update request with hero text, project ID, and index
      // const formData = new FormData();
      //   formData.append("index", index)
      //   formData.append("heroText[ge]", heroText.ge);
      //   formData.append("heroText[en]", heroText.en);
      //   if (image) formData.append("heroes[0][imageFile]", image);
      const response = await updateProjectsHeroData({
        heroText: heroToUpdate.heroText,
        projectId,
        index,
        url: heroToUpdate.image.url,
        image: heroToUpdate.image,
      }).unwrap();

      // Successful response
      console.log("Update successful:", response);
    } catch (error) {
      // Handle error in case the request fails
      console.error("Update failed:", error);
    }
  };

  // Function to handle deleting a hero (for existing data)
  const handleDeleteHero = async (index) => {
    const heroToDelete = heroData[index];
    try {
      const response = await deleteProjectsHerodata({index, id: projectId}).unwrap();
      console.log("Deleting Hero: ", response);
    }catch(error) {
      console.log(error)
    }

    // Remove the hero from the heroData state
    // const updatedHeroData = heroData.filter((_, i) => i !== index);
    // setHeroData(updatedHeroData);
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
