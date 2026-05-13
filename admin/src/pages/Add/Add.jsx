import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Add.css";
import axios from 'axios'
import {toast} from 'react-toastify'

const Add = ({url}) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "salad",
    price: "",
  });


  
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  

  const handleSubmit= async (event)=>{
    event.preventDefault()
    if (!data.name || !data.description || !data.price || !image) {
    toast.error("All fields are required")
    return
  }
    const formData = new FormData()
    formData.append('name',data.name)
    formData.append('description',data.description)
    formData.append('price', Number(data.price))
    formData.append('category',data.category)
    formData.append('image',image)

try{
  const response = await axios.post(`${url}/api/food/add`, formData)
      if(response.data.success){
      setData({
        name:'',
        description:'',
        price:'',
        category:'salad'
      })
      setImage(null)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
}catch(err){
  console.log(err)
  toast.error("something went wrong")
}

  }
  return (
    <div className="add">
      
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            onChange={onChangeHandler}
            value={data.name}
            name="name"
            placeholder="type here"
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="write content here"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad ">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              onChange={onChangeHandler}
              value={data.price}
              name="price"
              placeholder="Rs"
            />
          </div>
        </div>
        <button className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
