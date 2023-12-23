import { useState } from "react";
import { createCategory } from "../../../Api/Service/Admin.service";
import { useNavigate } from "react-router-dom";
import './Create.css';

function Create() {
  const [inputdata, setInputdata] = useState({name: '', isActive: true });
  const navigate = useNavigate();

 const handleSubmitCreate = (e) => {
  e.preventDefault();
    createCategory('vocabularyCategories/create', inputdata).then((res) => {
      alert('Vocabulary Added Succesfully')
      navigate('/topicvocabulary')
    }).then((err) => {
      console.error(err)
    })
 }
  return (
    <form onSubmit={handleSubmitCreate}>
      <div className="form-create">
        <div className="table-create">
          <label >Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={(e) => setInputdata({ ...inputdata, name: e.target.value })}
          />
        </div>
        <button className="btn-create" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Create;
