import {
  sequelize,
  StudentProfile,
  CompanyProfile,
  Skill,
  Stage,
  Application,
  User,
} from "../config/sequelize.js";
import bcrypt from "bcrypt";
import { fakerFR as faker } from "@faker-js/faker";

export const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("DB synchronisée pour le seed !");

    const passwordHash = await bcrypt.hash("123456", 10);

    // ====== CRÉATION DES USERS ÉTUDIANTS ======
    const studentsData = Array.from({ length: 50 }, (_, i) => ({
      email: `student${i + 1}@gmail.com`, // <-- format demandé
      role: "student",
      password: passwordHash,
    }));

    const studentUsers = await User.bulkCreate(studentsData, {
      returning: true,
    });

    // ====== CRÉATION DES USERS ENTREPRISES ======
    const companiesData = Array.from({ length: 20 }, (_, i) => ({
      email: `company${i + 1}@mail.com`,
      role: "company",
      password: passwordHash,
    }));

    const companyUsers = await User.bulkCreate(companiesData, {
      returning: true,
    });

    // ====== PROFILS ÉTUDIANTS ======
    const schools = [
      "Université Félix Houphouët-Boigny",
      "Université Nangui Abrogoua",
      "Université Jean Lorougnon Guédé",
      "Institut National Polytechnique Houphouët-Boigny",
      "École Supérieure Africaine des Technologies de l'Information",
      "Université Alassane Ouattara",
      "Université Péléforo Gbon Coulibaly",
      "École Supérieure des Métiers des Technologies de l'Information",
      "Institut National de la Jeunesse et des Sports",
      "École de Spécialisation en Économie et Gestion",
    ];

    const fieldsOfStudy = [
      "Informatique",
      "Marketing",
      "Gestion",
      "Finance",
      "Commerce",
      "Droit",
      "Communication",
      "Ressources Humaines",
      "Logistique",
      "Tourisme",
      "Médecine",
      "Ingénierie",
      "Design",
      "Architecture",
    ];

    const levels = [
      "Licence 1",
      "Licence 2",
      "Licence 3",
      "Master 1",
      "Master 2",
    ];

    const studentProfilesData = studentUsers.map((user, index) => ({
      userId: user.id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      school: faker.helpers.arrayElement(schools),
      level: faker.helpers.arrayElement(levels),
      fieldOfStudy: faker.helpers.arrayElement(fieldsOfStudy),
      location: faker.location.city(),
      bio: faker.lorem.paragraph(),
    }));

    const studentProfiles = await Promise.all(
      studentProfilesData.map((s) => StudentProfile.create(s))
    );

    // ====== PROFILS ENTREPRISES ======
    const sectors = [
      "Informatique",
      "Marketing",
      "Finance",
      "Santé",
      "Éducation",
      "Construction",
      "Transport",
      "Commerce",
      "Restauration",
      "Tourisme",
      "Énergie",
      "Télécommunications",
      "Agriculture",
      "Industrie",
      "Services",
    ];

    const companyNames = [
      "TechCorp",
      "MarketPlus",
      "FinExpert",
      "Logistica",
      "BuildCon",
      "EduFuture",
      "HealthCare Plus",
      "AgroBusiness",
      "Telecom Solutions",
      "EnergyPlus",
      "ServiceMaster",
      "FoodExpress",
      "Tourism Paradise",
      "ConsultPro",
      "Innovation Labs",
      "DataSystems",
      "WebFactory",
      "DigitalMind",
      "CloudServices",
      "SmartSolutions",
    ];

    const companyProfilesData = companyUsers.map((user, index) => ({
      userId: user.id,
      companyName: companyNames[index] || faker.company.name(),
      sector: faker.helpers.arrayElement(sectors),
      location: faker.location.city(),
      website: faker.internet.url(),
      description: faker.company.catchPhrase(),
      phone: faker.phone.number(),
      employeesCount: faker.number.int({ min: 5, max: 1000 }),
    }));

    await Promise.all(companyProfilesData.map((c) => CompanyProfile.create(c)));

    // ====== COMPÉTENCES ======
    const skillsData = [
      "JavaScript",
      "React",
      "Node.js",
      "Vue.js",
      "Angular",
      "Python",
      "Java",
      "PHP",
      "Ruby",
      "C#",
      "HTML/CSS",
      "SASS/LESS",
      "TypeScript",
      "Swift",
      "Kotlin",
      "Marketing Digital",
      "SEO",
      "SEM",
      "Google Analytics",
      "Réseaux sociaux",
      "Vente",
      "Prospection",
      "Négociation",
      "Gestion de compte",
      "Recrutement",
      "Paie",
      "Formation",
      "Développement RH",
      "Comptabilité",
      "Finance",
      "Audit",
      "Contrôle de gestion",
      "Community Management",
      "Content Marketing",
      "Stratégie de marque",
      "Logistique",
      "Supply Chain",
      "Gestion des stocks",
      "Transport",
      "Design Graphique",
      "UI/UX",
      "Illustration",
      "Motion Design",
      "Rédaction",
      "Copywriting",
      "Journalisme",
      "Traduction",
      "Data Analysis",
      "Machine Learning",
      "Big Data",
      "Statistiques",
      "Gestion de Projet",
      "Agile",
      "Scrum",
      "PMI",
      "Support Client",
      "Service après-vente",
      "Résolution de problèmes",
      "E-commerce",
      "Shopify",
      "WooCommerce",
      "Marketing d'affiliation",
    ];

    const skills = await Promise.all(
      skillsData.map((s) => Skill.create({ name: s }))
    );

    // Associer les compétences aux étudiants (chaque étudiant a 3-8 compétences aléatoires)
    for (const studentProfile of studentProfiles) {
      const randomSkills = faker.helpers.arrayElements(
        skills,
        faker.number.int({ min: 3, max: 8 })
      );
      await studentProfile.addSkills(randomSkills);
    }

    // ====== OFFRES DE STAGE ======
    const stageTitles = [
      "Développeur Full Stack",
      "Data Analyst",
      "Marketing Digital",
      "Assistant Commercial",
      "Community Manager",
      "Designer UX/UI",
      "Chargé de Communication",
      "Assistant Ressources Humaines",
      "Analyste Financier",
      "Gestionnaire de Projet",
      "Support Technique",
      "Spécialiste SEO",
      "Développeur Mobile",
      "Chef de Produit",
      "Consultant en Transformation Digitale",
      "Architecte Cloud",
      "Ingénieur DevOps",
      "Spécialiste Cybersécurité",
      "Responsable Logistique",
      "Chargé de Clientèle",
      "Rédacteur Web",
      "Traffic Manager",
      "Contrôleur de Gestion",
      "Auditeur Interne",
      "Business Developer",
    ];

    const domains = [
      "Informatique",
      "Marketing",
      "Finance",
      "Commerce",
      "Ressources Humaines",
      "Communication",
      "Logistique",
      "Design",
      "Data",
      "Gestion de Projet",
      "Service Client",
      "E-commerce",
      "Recherche",
      "Éducation",
      "Santé",
    ];

    const stagesData = Array.from({ length: 100 }, (_, i) => {
      const randomCompany = faker.helpers.arrayElement(companyUsers);
      return {
        title: `${faker.helpers.arrayElement(
          stageTitles
        )} - ${faker.company.buzzVerb()}`,
        description: faker.lorem.paragraphs(3),
        location: faker.location.city(),
        duree: `${faker.number.int({ min: 2, max: 12 })} mois`,
        companyId: randomCompany.id,
        domain: faker.helpers.arrayElement(domains),
        isActive: faker.datatype.boolean(0.8), // 80% de chance d'être actif
        remuneration: faker.number.int({ min: 500, max: 2000 }),
        remotePossible: faker.datatype.boolean(),
        startDate: faker.date.future({ years: 0.5 }),
        applicationDeadline: faker.date.soon({ days: 60 }),
      };
    });

    const stages = await Promise.all(stagesData.map((s) => Stage.create(s)));

    // Associer les compétences aux stages (chaque stage a 3-6 compétences requises)
    for (const stage of stages) {
      const requiredSkills = faker.helpers.arrayElements(
        skills,
        faker.number.int({ min: 3, max: 6 })
      );
      await stage.addSkills(requiredSkills);
    }

    // ====== CANDIDATURES ======
    const statuses = ["pending", "accepted", "rejected"];

    // Créer entre 150 et 300 candidatures aléatoires
    const applicationsCount = faker.number.int({ min: 150, max: 300 });
    const applicationsData = Array.from({ length: applicationsCount }, () => ({
      stageId: faker.helpers.arrayElement(stages).id,
      studentId: faker.helpers.arrayElement(studentUsers).id,
      coverLetter: faker.lorem.paragraphs(2),
      status: faker.helpers.arrayElement(statuses),
      appliedDate: faker.date.recent({ days: 60 }),
      cvUrl: faker.internet.url(),
    }));

    // Éviter les doublons (même étudiant sur même stage)
    const uniqueApplications = [];
    const applicationKeys = new Set();

    for (const app of applicationsData) {
      const key = `${app.stageId}-${app.studentId}`;
      if (!applicationKeys.has(key)) {
        applicationKeys.add(key);
        uniqueApplications.push(app);
      }
    }

    await Application.bulkCreate(uniqueApplications);

    console.log("Seed terminé avec succès !");
    console.log(`${studentUsers.length} étudiants créés`);
    console.log(`${companyUsers.length} entreprises créées`);
    console.log(`${skills.length} compétences créées`);
    console.log(`${stages.length} offres de stage créées`);
    console.log(`${uniqueApplications.length} candidatures créées`);
  } catch (error) {
    console.error("Erreur lors du seed :", error);
    process.exit(1);
  }
};
