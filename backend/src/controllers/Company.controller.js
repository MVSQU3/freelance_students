import { CompanyProfile, User } from "../config/sequelize.js";

export const getMyProfile = async (req, res, next) => {
  try {
    const company = await CompanyProfile.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: User,
          as: "company",
          attributes: ["email", "role"],
        },
      ],
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Aucun profil entreprise trouvé",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profil entreprise récupéré avec succès",
      profile: company,
    });
  } catch (error) {
    next(error);
  }
};

export const getCompanyById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const company = await CompanyProfile.findByPk(id, {
      attributes: [
        "companyName",
        "sector",
        "location",
        "website",
        "description",
      ],
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Aucun profil entreprise trouvé",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profil entreprise récupéré avec succès",
      profile: company,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "Action non autorisé",
      });
    }
    const { companyName, sector, location, website, description, photoUrl } =
      req.body;

    const [updated] = await CompanyProfile.update(
      { companyName, sector, location, website, description, photoUrl },
      { where: { userId: req.user.id } }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Profil entreprise non trouvé ou aucune modification apportée",
      });
    }

    // Récupérer le profil mis à jour
    const profile = await CompanyProfile.findOne({
      where: { userId: req.user.id },
    });

    return res.status(200).json({
      success: true,
      message: "Profil entreprise mis à jour avec succès",
      profile,
    });
  } catch (error) {
    next(error);
  }
};
