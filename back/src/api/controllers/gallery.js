const cloudinary = require("cloudinary").v2;

const getGallery = async (req, res) => {
  try {
    
    const result = await cloudinary.api.resources_by_asset_folder("fotoPlaya", {max_results: 20});
    const galleryImages = result.resources.filter(img => img.asset_folder === "fotoPlaya");

    res.json(result.resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getGallery };