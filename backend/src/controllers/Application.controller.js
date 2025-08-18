import { Application, User, Stage } from "../config/sequelize.js";

// controllers/application.controller.js

// Postuler à une offre
export const applyToOffer = async (req, res) => {
  try {
    const { stageId } = req.params;
    const { coverLetter } = req.body;

    const studentId = req.user.id; // récup via auth

    const application = await Application.create({
      stageId,
      studentId,
      coverLetter,
    });

    res.status(201).json({ message: "Candidature envoyée", application });
  } catch (error) {
    console.log("Erreur in applyToOffer me: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error: ", Error: error.message });
  }
};

// Voir SES candidatures
export const getMyApplications = async (req, res) => {
  try {
    const studentId = req.user.id;

    const applications = await Application.findAll({
      where: { studentId },
      include: [{ model: Stage, as: "stage" }],
    });

    if(!applications.length){
        return res.json({message: "Vous avez aucune candidatures"})
    }

    res.json(applications);
  } catch (error) {
    console.log("Erreur in getMyApplications me: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error: ", Error: error.message });
  }
};

// Voir les candidatures pour une offre de l’entreprise
export const getOfferApplications = async (req, res) => {
  try {
    const { stageId } = req.params;

    // vérifier que l’offre appartient à l’entreprise connectée
    const stage = await Stage.findOne({
      where: {
        id: stageId,
        companyId: req.user.id,
      },
    });

    if (!stage) {
      return res.status(403).json({ error: "Accès interdit à cette offre" });
    }

    const applications = await Application.findAll({
      where: { stageId },
      include: [
        {
          model: User,
          as: "student",
        },
      ],
    });

    res.json(applications);
  } catch (error) {
    console.log("Erreur in getOfferApplications me: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error: ", Error: error.message });
  }
};

// Accepter / refuser une candidature
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body; // "accepted" | "rejected"

    const application = await Application.findByPk(applicationId, {
      include: [{ model: Stage, as: "stage" }],
    });

    if (!application) {
      return res.status(404).json({ error: "Candidature non trouvée" });
    }

    // Vérif que l'offre appartient bien à l'entreprise
    if (application.stage.companyId !== req.user.id) {
      return res.status(403).json({ error: "Non autorisé" });
    }

    application.status = status;
    await application.save();

    res.json({ message: "Statut mis à jour", application });
  } catch (error) {
    console.log("Erreur in updateApplicationStatus me: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error: ", Error: error.message });
  }
};
