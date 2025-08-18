import { CompanyProfile, User } from "../config/sequelize.js";

export const profile = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await CompanyProfile.findOne({
      where: { userId: id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["email"],
        },
      ],
    });

    if (!company) {
      return res.json({ message: "Aucun profile trouver" });
    }
    res.json({
      message: `Profile`,
      company,
    });
  } catch (error) {
    console.log("Erreur in controller me: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error: ", Error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { companyName, sector, location, website, description } = req.body;
  try {
    if (!companyName.trim()) {
      return res.json({ message: "Le nom de la company est obligatoire" });
    }

    const [company] = await CompanyProfile.update(
      { ...req.body },
      { where: { userId: req.user.id } }
    );

    res.json("Profile mise à jour", company);
  } catch (error) {
    console.log("Erreur in controller register: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error: ", Error: error.message });
  }
};
