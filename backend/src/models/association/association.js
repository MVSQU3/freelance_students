export default function setupAssociations(db) {
  const {
    Student,
    Company,
    StudentProfile,
    CompanyProfile,
    Skill,
    StudentSkill,
    StageSkill,
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

  // M-M Stage ↔ Skill via StageSkill
  Stage.belongsToMany(Skill, {
    through: StageSkill,
    foreignKey: "stageId",
    otherKey: "skillId",
    as: "skills", // alias clair
  });
  Skill.belongsToMany(Stage, {
    through: StageSkill,
    foreignKey: "skillId",
    otherKey: "stageId",
    as: "stages", // alias clair
  });

  // 1-N CompanyProfile → Stage (liaison via CompanyProfile.userId <-> Stage.companyId)
  CompanyProfile.hasMany(Stage, {
    foreignKey: "companyId",
    sourceKey: "userId",
    as: "stages",
    onDelete: "CASCADE",
  });

  // garder l'alias `company` pour compatibilité : Stage.company renverra le CompanyProfile
  Stage.belongsTo(CompanyProfile, {
    foreignKey: "companyId",
    targetKey: "userId",
    as: "company",
  });

  Application.belongsTo(Student, {
    foreignKey: "studentId",
    as: "student",
  });
  Application.belongsTo(Stage, { foreignKey: "stageId", as: "stage" });
}

// Relation directe pour simplifier les include
