import React, { useState } from "react";
import {useParams} from 'react-router-dom'
import { Button } from "react-bootstrap";
import { useUpdateProjectsDescriptionMutation, useUpdateProjectsMutation } from "../../data/projectsSlice";

const AdminProjectDescription = ({ data }) => {
    const projectId = useParams().projectId
    console.log(projectId)
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [mainProject, setMainProject] = useState(data.mainProject);
  const [updateProjectsDescription] = useUpdateProjectsDescriptionMutation(projectId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you could call the update function to save the data
    const updatedData = {projectId, name, description, mainProject };
    console.log(updatedData);
    
    try {
      const formData = new FormData();
      await updateProjectsDescription(updatedData).unwrap();

        if (name?.ge) formData.append("name[ge]", name.ge);
        if (name?.en) formData.append("name[en]", name.en);

        if (description?.ge) formData.append("description[ge]", description.ge);
        if (description?.en) formData.append("description[en]", description.en);

        if (mainProject !== undefined)
          formData.append("mainProject", mainProject);
    }catch(error) {
      console.error(error);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Project Name, Description, Main Project Checkbox */} 
      <div>
        <label>Name (Georgian)</label>
        <input
          type="text"
          value={name.ge}
          onChange={(e) => setName({ ...name, ge: e.target.value })}
        />
      </div>
      <div>
        <label>Name (English)</label>
        <input
          type="text"
          value={name.en}
          onChange={(e) => setName({ ...name, en: e.target.value })}
        />
      </div>
      <div>
        <label>Description (Georgian)</label>
        <textarea
          value={description.ge}
          onChange={(e) =>
            setDescription({ ...description, ge: e.target.value })
          }
        />
      </div>
      <div>
        <label>Description (English)</label>
        <textarea
          value={description.en}
          onChange={(e) =>
            setDescription({ ...description, en: e.target.value })
          }
        />
      </div>
      <div>
        <label>Main Project</label>
        <input
          type="checkbox"
          checked={mainProject}
          onChange={(e) => setMainProject(e.target.checked)}
        />
      </div>
      <Button type="submit">Save Update</Button>
    </form>
  );
};

export default AdminProjectDescription;
