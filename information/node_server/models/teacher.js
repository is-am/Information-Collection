const db = require("./db");
module.exports = {
  // 获取所有学生就业信息页数
  Employments: async () =>
    await db.q("SELECT COUNT(*) AS id FROM students_employment", []),
  // 分页学生就业信息
  allEmployment: async (page, pageSize) =>
    await db.q(`SELECT * FROM students_employment LIMIT ${page},${pageSize}`),
  // 删除学生就业信息
  deleteEmployment: async (Sno) =>
    await db.q("DELETE FROM students_employment WHERE Sno=? ", Sno),
  // 查询学生就业信息
  queryEmployments: async (keyword) =>
    await db.q(
      "SELECT * FROM students_employment WHERE CONCAT(  `sno`,`Whereabouts`,`EnterpriseName`,`AddressOfEmployer`,`EnterpriseNature`,`InstitutionCode`,`Industry`,`TypeOfJob`,`EnterpriseIocality`,`EnterprisePerson`,`EnterprisePhone`,`EnterpriseCredentialTime`,`Work`,`Remuneration`,`Counterparts`,`FileType`,`Accessory`,`FileReceivingUnit`,`InternshipPosition`,`Remark`) LIKE '%" +
        keyword +
        "%'"
    ),

  // 获取所有学生联系方式信息页数
  Contacts: async () =>
    await db.q("SELECT COUNT(*) AS id FROM student_contact", []),
  // 分页学生联系方式信息
  allContact: async (page, pageSize) =>
    await db.q(`SELECT * FROM student_contact LIMIT ${page},${pageSize}`),
  // 删除学生联系方式信息
  deleteContact: async (sno) =>
    await db.q("DELETE FROM student_contact WHERE sno=? ", sno),
  // 查询学生联系方式信息
  queryContacts: async (keyword) =>
    await db.q(
      "SELECT * FROM student_contact WHERE CONCAT(`sno`,`HomeAddress`,`qq`,`wx`,`phone`,`email`,`emergencyContact`,`contactNumber`,`Remark`) LIKE '%" +
        keyword +
        "%'"
    ),

  // 获取所有学生报到证信息页数
  Credentials: async () =>
    await db.q("SELECT COUNT(*) AS id FROM students_credential", []),
  // 分页学生报到证信息
  allCredential: async (page, pageSize) =>
    await db.q(`SELECT * FROM students_credential LIMIT ${page},${pageSize}`),
  // 删除学生报到证信息
  deleteCredential: async (sno) =>
    await db.q("DELETE FROM students_credential WHERE sno=? ", sno),
  // 查询学生报到证信息
  queryCredential: async (keyword) =>
    await db.q(
      "SELECT * FROM students_credential WHERE CONCAT( `sno`,`RegistrationCategory`,`EnterpriseName`,`AddressOfEmployer`,`Deadline`,`Materials`,`Remark`) LIKE '%" +
        keyword +
        "%'"
    ),
  // students_intention

  // 获取所有学生报到证信息页数
  Intentions: async () =>
    await db.q("SELECT COUNT(*) AS id FROM students_intention", []),
  // 分页学生报到证信息
  allIntention: async (page, pageSize) =>
    await db.q(`SELECT * FROM students_intention LIMIT ${page},${pageSize}`),
  // 删除学生报到证信息
  deleteIntention: async (sno) =>
    await db.q("DELETE FROM students_intention WHERE sno=? ", sno),
  // 查询学生报到证信息
  queryIntention: async (keyword) =>
    await db.q(
      "SELECT * FROM students_intention WHERE CONCAT( `sno`,`DistrictOne`,`DistrictTwo`,`EnterpriseOne`,`EnterpriseTwo`,`WorkOne`,`WorkTwo`,`Remuneration`,`Remark`) LIKE '%" +
        keyword +
        "%'"
    ),
  // 获取所有户口档案信息页数
  Records: async () =>
    await db.q("SELECT COUNT(*) AS id FROM students_record", []),
  // 分页户口档案信息
  allRecord: async (page, pageSize) =>
    await db.q(`SELECT * FROM students_record LIMIT ${page},${pageSize}`),
  // 删除户口档案信息
  deleteRecord: async (sno) =>
    await db.q("DELETE FROM students_record WHERE sno=? ", sno),
  // 查询户口档案信息
  queryRecord: async (keyword) =>
    await db.q(
      "SELECT * FROM students_record WHERE CONCAT( `sno`,`AccountTransfer`,`AddressTransfer`,`Postcode`,`Contacts`,`contactNumber`,`Remark`) LIKE '%" +
        keyword +
        "%'"
    ),

  // 获取所有学生个人信息页数
  StudentInfos: async () =>
    await db.q("SELECT COUNT(*) AS id FROM student_information", []),
  // 分页学生个人信息
  allStudentInfo: async (page, pageSize) =>
    await db.q(`SELECT * FROM student_information LIMIT ${page},${pageSize}`),
  // 删除学生个人信息
  deleteStudentInfo: async (sno) =>
    await db.q("DELETE FROM student_information WHERE sno=? ", sno),
  // 查询学生个人信息
  queryStudentInfo: async (keyword) =>
    await db.q(
      "SELECT * FROM student_information WHERE CONCAT(`name`,`sex`,`sno`,`IdentityCard`,`Birth`,`Source`,`Nation`,`Ace`,`College`,`Specialty`,`ClassName`,`EnterYear`,`Education`,`Syesr`,`TrainingMode`,`StudentCategory`,`Difficult`,`OrientationOrTubeTrainingUnit`,`Koseki`) LIKE '%" +
        keyword +
        "%'"
    ),

  // 获取所有学生实习单位信息页数
  Units: async () =>
    await db.q("SELECT COUNT(*) AS id FROM students_internshipunits", []),
  // 分页学生实习单位信息
  allUnits: async (page, pageSize) =>
    await db.q(
      `SELECT * FROM students_internshipunits LIMIT ${page},${pageSize}`
    ),
  // 删除学生实习单位信息
  deleteUnits: async (sno) =>
    await db.q("DELETE FROM students_internshipunits WHERE sno=? ", sno),
  // 查询学生实习单位信息
  queryUnits: async (keyword) =>
    await db.q(
      "SELECT * FROM students_internshipunits WHERE CONCAT(`sno`,`InternshipUnit`,`Location`,`Postcode`,`EnterprisePerson`,`EnterprisePhone`,`Remark`,`startTime`,`endTime`) LIKE '%" +
        keyword +
        "%'"
    ),
  // 获取表格的填写数据
  students: async (sno) =>
    await db.q("SELECT * FROM student_account WHERE Class=?", sno),
  contactContainers: async (sno) =>
    await db.q(
      "SELECT COUNT(*) AS num FROM student_contact  WHERE Class=?",
      sno
    ),
  informationContainers: async (sno) =>
    await db.q(
      "SELECT COUNT(*) AS num FROM student_information  WHERE Class=?",
      sno
    ),
  recordContainers: async (sno) =>
    await db.q(
      "SELECT COUNT(*) AS num FROM student_record  WHERE Class=?",
      sno
    ),
  credentialContainers: async (sno) =>
    await db.q(
      "SELECT COUNT(*) AS num FROM students_credential  WHERE Class=?",
      sno
    ),
  employmentContainers: async (sno) =>
    await db.q(
      "SELECT COUNT(*) AS num FROM students_employment  WHERE Class=?",
      sno
    ),
  intentionContainers: async (sno) =>
    await db.q(
      "SELECT COUNT(*) AS num FROM students_intention  WHERE Class=?",
      sno
    ),
  internshipunitsContainers: async (sno) =>
    await db.q(
      "SELECT COUNT(*) AS num FROM students_internshipunits  WHERE Class=?",
      sno
    ),

  // 修改学生总人数
  alterheadcount: async (count) =>
    await db.q(
      "update teacher set headcount=? where sno=? ",
      Object.values(count)
    ),
  // 读取班级总人数
  headcounts: async (sno) =>
    await db.q("SELECT headcount FROM teacher WHERE sno=? ", sno),

  // 获取学生期待薪资
  chartintention: async (Class) =>
    await db.q(
      "SELECT Remuneration FROM students_intention WHERE Class=?",
      Class
    ),

  // 获取学生毕业去向
  chartWhereabouts: async (Class) =>
    await db.q(
      "SELECT Whereabouts FROM students_employment WHERE Class=?",
      Class
    ),
  // 获取学生意向城市
  chartCity: async (Class) =>
    await db.q(
      "SELECT DistrictOne,DistrictTwo FROM students_intention WHERE Class=?",
      Class
    ),
  // 获取工作职位类型
  chartTypeOfJob: async (Class) =>
    await db.q(
      "SELECT TypeOfJob FROM students_employment WHERE Class=?",
      Class
    ),

  // 获取学生期待薪资
  adminintention: async () =>
    await db.q("SELECT Remuneration FROM students_intention"),
  // 获取学生毕业去向
  adminWhereabouts: async () =>
    await db.q("SELECT Whereabouts FROM students_employment"),
  // 获取学生意向城市
  adminCity: async () =>
    await db.q("SELECT DistrictOne,DistrictTwo FROM students_intention"),
  // 获取工作职位类型
  adminTypeOfJob: async () =>
    await db.q("SELECT TypeOfJob FROM students_employment"),
};
