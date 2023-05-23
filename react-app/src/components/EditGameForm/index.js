import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateGameThunk } from "../../store/game";


const EditGameForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gameId } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [developer, setDeveloper] = useState("");
  const [publisher, setPublisher] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [otherImages, setOtherImages] = useState([]);

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
    const urls = e.target.value.split(",").map((url) => url.trim());
    setOtherImages(urls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateGameThunk(gameId, {
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
  
    history.push(`/games/${gameId}`);
  };  

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/games/${gameId}`); // Replace with your API endpoint for fetching a single game
        if (response.ok) {
          const gameData = await response.json();
          setTitle(gameData.title);
          setImage(gameData.image);
          setPrice(gameData.price);
          setReleaseDate(gameData.release_date);
          setShortDescription(gameData.short_description);
          setFullDescription(gameData.full_description);
          setDeveloper(gameData.developer);
          setPublisher(gameData.publisher);
          setBannerImage(gameData.banner_image);
          setOtherImages(gameData.other_images);
        } else {
          throw new Error("Failed to fetch game data");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchGame();
  }, [gameId]);  
  

  return (
    <div className="game-form">
      <h3 className="game-form-title">Edit your game</h3>
      <div className="game-form-container">
        <form id="gameform" className="login-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-column">
              <label className="login-form-label">Title:</label>
              <input type="text" value={title} onChange={handleTitleChange} />
            </div>
            <div className="form-column">
              <label className="login-form-label">Image URL:</label>
              <input type="text" value={image} onChange={handleImageChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-column">
              <label className="login-form-label">Price:</label>
              <input type="text" value={price} onChange={handlePriceChange} />
            </div>
            <div className="form-column">
              <label className="login-form-label">Release Date:</label>
              <input type="text" value={releaseDate} onChange={handleReleaseDateChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-column">
              <label className="login-form-label">Developer:</label>
              <input type="text" value={developer} onChange={handleDeveloperChange} />
            </div>
            <div className="form-column">
              <label className="login-form-label">Publisher:</label>
              <input type="text" value={publisher} onChange={handlePublisherChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-column">
              <label className="login-form-label">Banner Image URL:</label>
              <input type="text" value={bannerImage} onChange={handleBannerImageChange} />
            </div>
          <div className="form-column">
            <label className="login-form-label">Short Description:</label>
            <input type="text" value={shortDescription} onChange={handleShortDescriptionChange} />
          </div>
          </div>
          {/* <div className="form-row"> */}
            <div className="form-column">
              <label className="login-form-label">Full Description:</label>
              <textarea
              id="full-textarea"
              value={fullDescription}
              onChange={handleFullDescriptionChange}
              rows={4}
              cols={50}
              />
            </div>
            <div className="form-column">
              <label className="login-form-label">Other Images:</label>
              <textarea 
              id="full-textarea"
              type="text" 
              value={otherImages.join(",")} 
              onChange={handleOtherImagesChange} 
              rows={4}
              cols={50}
              placeholder="Enter up to 4 URLs of images that you would like to showcase your game. Separate each URL with a comma (ie.: image.jpeg, anotherimage.jpeg)"
              />
            </div>
          {/* </div> */}
          <div className="create-game-container">
            <button id="create-game-button" type="submit">Update Game</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGameForm;