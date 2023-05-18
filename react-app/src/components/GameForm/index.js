import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGameThunk } from "../../store/game";
// import "./GameForm.css";

const GameForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [developer, setDeveloper] = useState("");
  const [publisher, setPublisher] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [otherImages, setOtherImages] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleReleaseDateChange = (e) => {
    setReleaseDate(e.target.value);
  };

  const handleShortDescriptionChange = (e) => {
    setShortDescription(e.target.value);
  };

  const handleFullDescriptionChange = (e) => {
    setFullDescription(e.target.value);
  };

  const handleDeveloperChange = (e) => {
    setDeveloper(e.target.value);
  };

  const handlePublisherChange = (e) => {
    setPublisher(e.target.value);
  };

  const handleBannerImageChange = (e) => {
    setBannerImage(e.target.value);
  };

  const handleOtherImagesChange = (e) => {
    setOtherImages(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createGameThunk({
        title,
        image,
        price,
        release_date: releaseDate,
        short_description: shortDescription,
        full_description: fullDescription,
        developer,
        publisher,
        banner_image: bannerImage,
        other_images: otherImages,
      })
    );
    setTitle("");
    setImage("");
    setPrice("");
    setReleaseDate("");
    setShortDescription("");
    setFullDescription("");
    setDeveloper("");
    setPublisher("");
    setBannerImage("");
    setOtherImages("");
  };

  return (
    <div className="game-form">
      <h3 className="game-form-title">Create a new game</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={image} onChange={handleImageChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" value={price} onChange={handlePriceChange} />
        </div>
        <div>
          <label>Release Date:</label>
          <input type="text" value={releaseDate} onChange={handleReleaseDateChange} />
        </div>
        <div>
          <label>Short Description:</label>
          <input type="text" value={shortDescription} onChange={handleShortDescriptionChange} />
        </div>
        <div>
          <label>Full Description:</label>
          <input type="text" value={fullDescription} onChange={handleFullDescriptionChange} />
        </div>
        <div>
          <label>Developer:</label>
          <input type="text" value={developer} onChange={handleDeveloperChange} />
        </div>
        <div>
          <label>Publisher:</label>
          <input type="text" value={publisher} onChange={handlePublisherChange} />
        </div>
        <div>
          <label>Banner Image URL:</label>
          <input type="text" value={bannerImage} onChange={handleBannerImageChange} />
        </div>
        <div>
          <label>Other Images:</label>
          <input type="text" value={otherImages} onChange={handleOtherImagesChange} />
        </div>
        <button type="submit">Create Game</button>
      </form>
    </div>
  );
}

export default GameForm;