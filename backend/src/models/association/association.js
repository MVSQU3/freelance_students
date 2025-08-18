export default function setupAssociations(db) {
  const {
    User,
    StudentProfile,
    CompanyProfile,
    Skill,
    StudentSkill,
    Stage,
    Application,
  } = db;

  // 1-1 StudentProfile ↔ User
  User.hasOne(StudentProfile, {
    foreignKey: "userId",
    as: "studentProfile", // alias clair
    onDelete: "CASCADE",
  });
  StudentProfile.belongsTo(User, {
    foreignKey: "userId",
    as: "user", // alias clair
  });

  // 1-1 CompanyProfile ↔ User
  User.hasOne(CompanyProfile, {
    foreignKey: "userId",
    as: "companyProfile", // alias clair
    onDelete: "CASCADE",
  });
  CompanyProfile.belongsTo(User, {
    foreignKey: "userId",
    as: "user", // alias clair
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
  User.hasMany(Stage, {
    foreignKey: "companyId",
    as: "stages",
    onDelete: "CASCADE",
  });
  Stage.belongsTo(User, {
    foreignKey: "companyId",
    as: "company",
  });

  Application.belongsTo(User, {
    foreignKey: "studentId",
    as: "student",
  });
  Application.belongsTo(Stage, { foreignKey: "stageId", as: "stage" });
}

// Relation directe pour simplifier les include
