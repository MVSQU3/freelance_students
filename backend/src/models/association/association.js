export default function setupAssociations(db) {
  const {
    Student,
    Company,
    StudentProfile,
    CompanyProfile,
    Skill,
    StudentSkill,
    Stage,
    Application,
  } = db;

  // 1-1 StudentProfile ↔ User
  Student.hasOne(StudentProfile, {
    foreignKey: "userId",
    as: "studentProfile", // alias clair
    onDelete: "CASCADE",
  });
  StudentProfile.belongsTo(Student, {
    foreignKey: "userId",
    as: "student", // alias clair
  });

  // 1-1 CompanyProfile ↔ User
  Company.hasOne(CompanyProfile, {
    foreignKey: "userId",
    as: "companyProfile", // alias clair
    onDelete: "CASCADE",
  });
  CompanyProfile.belongsTo(Company, {
    foreignKey: "userId",
    as: "company", // alias clair
  });

  // M-M StudentProfile ↔ Skill via StudentSkill
  StudentProfile.belongsToMany(Skill, {
    through: StudentSkill,
    foreignKey: "studentId",
    otherKey: "skillId",
    as: "skills", // alias clair
  });
  Skill.belongsToMany(StudentProfile, {
    through: StudentSkill,
    foreignKey: "skillId",
    otherKey: "studentId",
    as: "students", // alias clair
  });

  // 1-N CompanyProfile → Stage
  Company.hasMany(Stage, {
    foreignKey: "companyId",
    as: "stages",
    onDelete: "CASCADE",
  });

  Stage.belongsTo(Company, {
    foreignKey: "companyId",
    as: "company",
  });

  Application.belongsTo(Student, {
    foreignKey: "studentId",
    as: "student",
  });
  Application.belongsTo(Stage, { foreignKey: "stageId", as: "stage" });
}

// Relation directe pour simplifier les include
