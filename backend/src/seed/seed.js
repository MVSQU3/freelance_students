import {
  sequelize,
  StudentProfile,
  CompanyProfile,
  Skill,
  Stage,
  Application,
  Student,
  Company,
} from "../config/sequelize.js";
import bcrypt from "bcrypt";

export const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("DB synchronisée pour le seed !");

    const passwordHash = await bcrypt.hash("123456", 10);

    // ====== USERS ======
    const studentsData = [
      { email: "student1@mail.com", role: "student" },
      { email: "student2@mail.com", role: "student" },
      { email: "student3@mail.com", role: "student" },
    ];

    const companiesData = [
      { email: "company1@mail.com", role: "company" },
      { email: "company2@mail.com", role: "company" },
    ];

    const studentUsers = await Promise.all(
      studentsData.map((u) => Student.create({ ...u, password: passwordHash }))
    );
    const companyUsers = await Promise.all(
      companiesData.map((u) => Company.create({ ...u, password: passwordHash }))
    );

    // ====== STUDENT PROFILES ======
    const studentProfiles = [
      {
        userId: studentUsers[0].id,
        firstName: "Paul",
        lastName: "Kevin",
        school: "Université Abidjan",
        level: "Licence 3",
        fieldOfStudy: "Informatique",
        location: "Abidjan",
        availability: true,
        is_public: "Oui",
        bio: "Étudiant motivé",
      },
      {
        userId: studentUsers[1].id,
        firstName: "Marie",
        lastName: "Claire",
        school: "Université Bouaké",
        level: "Licence 2",
        fieldOfStudy: "Marketing",
        location: "Bouaké",
        availability: true,
        is_public: "Oui",
        bio: "Étudiante dynamique",
      },
      {
        userId: studentUsers[2].id,
        firstName: "Jean",
        lastName: "Luc",
        school: "Université San Pedro",
        level: "Licence 3",
        fieldOfStudy: "Gestion",
        location: "San Pedro",
        availability: false,
        is_public: "Oui",
        bio: "Cherche stage en gestion",
      },
    ];

    await Promise.all(studentProfiles.map((s) => StudentProfile.create(s)));

    // ====== COMPANY PROFILES ======
    const companyProfiles = [
      {
        userId: companyUsers[0].id,
        companyName: "TechCorp",
        sector: "Informatique",
        location: "Abidjan",
        website: "https://techcorp.ci",
        description: "Entreprise spécialisée dans le développement web",
      },
      {
        userId: companyUsers[1].id,
        companyName: "MarketPlus",
        sector: "Marketing",
        location: "Bouaké",
        website: "https://marketplus.ci",
        description: "Agence de marketing digital",
      },
    ];

    await Promise.all(companyProfiles.map((c) => CompanyProfile.create(c)));

    // ====== SKILLS ======
    const skillsData = [
      "JavaScript",
      "React",
      "Node.js",
      "Marketing Digital",
      "SEO",
      "Vente",
      "Prospection",
      "Recrutement",
      "Paie",
      "Comptabilité",
      "Community Management",
      "Logistique",
      "Design Graphique",
      "Rédaction",
      "Data Analysis",
      "Gestion de Projet",
      "Support Client",
      "E-commerce",
    ];
    const skills = await Promise.all(
      skillsData.map((s) => Skill.create({ name: s }))
    );

    // Associer les skills aux étudiants
    const student1 = await StudentProfile.findOne({
      where: { userId: studentUsers[0].id },
    });
    const student2 = await StudentProfile.findOne({
      where: { userId: studentUsers[1].id },
    });
    await student1.addSkills([skills[0], skills[1], skills[2]]);
    await student2.addSkills([skills[3], skills[4]]);

    // ====== STAGES ======
    const stagesData = [
      {
        title: "Stage Développement Web",
        description: "Projet Node.js/React",
        location: "Abidjan",
        duree: "6 mois",
        companyId: companyUsers[0].id,
        domain: "Informatique",
        isActive: true,
      },
      {
        title: "Stage Marketing Digital",
        description: "Optimisation SEO et réseaux sociaux",
        location: "Bouaké",
        duree: "6 mois",
        companyId: companyUsers[1].id,
        domain: "Marketing",
        isActive: true,
      },
      {
        title: "Stage Commercial",
        description: "Prospection et suivi client",
        location: "Yamoussoukro",
        duree: "6 mois",
        companyId: companyUsers[0].id,
        domain: "Commerce",
        isActive: true,
      },
      {
        title: "Stage Ressources Humaines",
        description: "Recrutement et gestion du personnel",
        location: "San Pedro",
        duree: "6 mois",
        companyId: companyUsers[1].id,
        domain: "RH",
        isActive: true,
      },
      {
        title: "Stage Comptabilité",
        description: "Suivi des comptes et facturation",
        location: "Korhogo",
        duree: "6 mois",
        companyId: companyUsers[0].id,
        domain: "Finance",
        isActive: true,
      },
      {
        title: "Stage Community Manager",
        description: "Gestion des réseaux sociaux",
        location: "Abidjan",
        duree: "6 mois",
        companyId: companyUsers[1].id,
        domain: "Marketing",
        isActive: true,
      },
      {
        title: "Stage Logistique",
        description: "Organisation des livraisons et stocks",
        location: "Bouaké",
        duree: "6 mois",
        companyId: companyUsers[0].id,
        domain: "Logistique",
        isActive: true,
      },
      {
        title: "Stage Design Graphique",
        description: "Création de supports visuels",
        location: "San Pedro",
        duree: "6 mois",
        companyId: companyUsers[1].id,
        domain: "Design",
        isActive: true,
      },
      {
        title: "Stage Marketing Stratégique",
        description: "Plan de campagne et analyse",
        location: "Yamoussoukro",
        duree: "6 mois",
        companyId: companyUsers[0].id,
        domain: "Marketing",
        isActive: true,
      },
      {
        title: "Stage Gestion de Projet",
        description: "Coordination d'équipes et suivi de projet",
        location: "Korhogo",
        duree: "6 mois",
        companyId: companyUsers[1].id,
        domain: "Management",
        isActive: true,
      },
      {
        title: "Stage Support Client",
        description: "Assistance et relation client",
        location: "Abidjan",
        duree: "6 mois",
        companyId: companyUsers[0].id,
        domain: "Service Client",
        isActive: true,
      },
      {
        title: "Stage E-commerce",
        description: "Gestion d'une boutique en ligne",
        location: "Bouaké",
        duree: "6 mois",
        companyId: companyUsers[1].id,
        domain: "Commerce",
        isActive: true,
      },
      {
        title: "Stage Rédaction",
        description: "Création de contenu pour site web et blog",
        location: "San Pedro",
        duree: "6 mois",
        companyId: companyUsers[0].id,
        domain: "Communication",
        isActive: true,
      },
      {
        title: "Stage Data Marketing",
        description: "Analyse des données clients et campagnes",
        location: "Yamoussoukro",
        duree: "6 mois",
        companyId: companyUsers[1].id,
        domain: "Marketing",
        isActive: true,
      },
      {
        title: "Stage Vente",
        description: "Techniques de vente et négociation",
        location: "Korhogo",
        duree: "6 mois",
        companyId: companyUsers[0].id,
        domain: "Commerce",
        isActive: true,
      },
    ];

    const stages = await Promise.all(stagesData.map((s) => Stage.create(s)));
    // ====== ASSOCIER SKILLS AUX STAGES ======
    // Stage Développement Web -> JavaScript, React, Node.js
    if (stages[0]) await stages[0].addSkills([skills[0], skills[1], skills[2]]);
    // Stage Marketing Digital -> Marketing Digital, SEO, Community Management
    if (stages[1])
      await stages[1].addSkills([skills[3], skills[4], skills[10]]);
    // Stage Commercial -> Vente, Prospection
    if (stages[2]) await stages[2].addSkills([skills[5], skills[6]]);
    // Stage Ressources Humaines -> Recrutement, Paie
    if (stages[3]) await stages[3].addSkills([skills[7], skills[8]]);
    // Stage Comptabilité -> Comptabilité
    if (stages[4]) await stages[4].addSkills([skills[9]]);
    // Stage Community Manager -> Community Management, Social Media
    if (stages[5]) await stages[5].addSkills([skills[10]]);
    // Stage Logistique -> Logistique
    if (stages[6]) await stages[6].addSkills([skills[11]]);
    // Stage Design Graphique -> Design Graphique
    if (stages[7]) await stages[7].addSkills([skills[12]]);
    // Stage Marketing Stratégique -> Marketing Digital, SEO
    if (stages[8]) await stages[8].addSkills([skills[3], skills[4]]);
    // Stage Gestion de Projet -> Gestion de Projet
    if (stages[9]) await stages[9].addSkills([skills[15]]);
    // Stage Support Client -> Support Client
    if (stages[10]) await stages[10].addSkills([skills[16]]);
    // Stage E-commerce -> E-commerce
    if (stages[11]) await stages[11].addSkills([skills[17]]);
    // Stage Rédaction -> Rédaction
    if (stages[12]) await stages[12].addSkills([skills[13]]);
    // Stage Data Marketing -> Data Analysis, Marketing Digital
    if (stages[13]) await stages[13].addSkills([skills[14], skills[3]]);
    // Stage Vente -> Vente
    if (stages[14]) await stages[14].addSkills([skills[5]]);

    // ====== APPLICATIONS ======
    await Application.create({
      stageId: stages[0].id,
      studentId: studentUsers[0].id,
      coverLetter: "Je suis très motivé pour ce stage en développement web",
      status: "pending",
    });

    await Application.create({
      stageId: stages[1].id,
      studentId: studentUsers[1].id,
      coverLetter:
        "Je souhaite approfondir mes compétences en marketing digital",
      status: "pending",
    });

    console.log("Seed terminé avec succès !");
  } catch (error) {
    console.error("Erreur lors du seed :", error);
    process.exit(1);
  }
};
