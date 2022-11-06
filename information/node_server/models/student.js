const db = require("./db");
module.exports = {
  // 检查该用户是否存在
  getStudent: async () => await db.q("select * from student_account", []),
  // 登录
  findname: async (sno) =>
    await db.q("select * from student_account  where sno = ?", sno),
  // 注册 传入是对象，使用Object.values转变成数组
  addStudentUsers: async (saveStudentsInfo) =>
    await db.q(
      "insert into student_account (sno,name,Class,password,photo,priviege) values (?,?,?,?,?,?)",
      Object.values(saveStudentsInfo)
    ),
  // 更新用户账号信息
  updateAccount: async (saveStudentsInfo) =>
    await db.q(
      "update student_account set sno=?,name=?,Class=?,password=?,photo=?,priviege=? where sno=? ",
      Object.values(saveStudentsInfo)
    ),
  // 获取所有学生用户页数
  studentPages: async () =>
    await db.q("SELECT COUNT(*) AS id FROM student_account", []),
  // 分页学生用户
  StudentUser: async (page, pageSize) =>
    await db.q(`SELECT * FROM student_account LIMIT ${page},${pageSize}`),
  // 查询学生
  queryingStudent: async (keyword) =>
    await db.q(
      "SELECT * FROM student_account WHERE CONCAT(`id`,`sno`,`name`,`password`,`photo`,`priviege`) LIKE '%" +
        keyword +
        "%'"
    ),

  // 个人信息录入 传入是对象，使用Object.values转变成数组
  personalInfo: async (Info) =>
    await db.q(
      "insert into student_information (Class,name,sex,sno,IdentityCard,Birth,Source,Nation,Ace,College,Specialty,ClassName,EnterYear,Education,Syesr,TrainingMode,StudentCategory,Difficult,OrientationOrTubeTrainingUnit,Koseki) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      Object.values(Info)
    ),
  // 个人信息更新
  updateInfo: async (sno) =>
    await db.q(
      "update student_information set Class=?,name=?,sex=?,sno=?,IdentityCard=?,Birth=?,Source=?,Nation=?,Ace=?,College=?,Specialty=?,ClassName=?,EnterYear=?,Education=?,Syesr=?,TrainingMode=?,StudentCategory=?,Difficult=?,OrientationOrTubeTrainingUnit=?,Koseki=? where sno=? ",
      Object.values(sno)
    ),
  // 个人信息查询
  queryPersonalInfo: async (sno) =>
    await db.q("select * from student_information WHERE sno = ?", sno),

  // 学生联系方式录入 传入是对象，使用Object.values转变成数组
  studentContact: async (Info) =>
    await db.q(
      "insert into student_contact (sno,Class,HomeAddress,qq,wx,phone,email,emergencyContact,contactNumber,Remark) values (?,?,?,?,?,?,?,?,?,?)",
      Object.values(Info)
    ),
  // 学生联系方式更新
  updateContact: async (sno) =>
    await db.q(
      "update student_contact set sno=?,Class=?,HomeAddress=?,qq=?,wx=?,phone=?,email=?,emergencyContact=?,contactNumber=?,Remark=? where sno=? ",
      Object.values(sno)
    ),
  // 学生联系方式查询
  queryStudentContact: async (sno) =>
    await db.q("select * from student_contact WHERE sno = ?", sno),

  // 户口档案转移信息录入 传入是对象，使用Object.values转变成数组
  studentRecord: async (Info) =>
    await db.q(
      "insert into student_record ( sno,Class,AccountTransfer,AddressTransfer,Postcode,Contacts,contactNumber,Remark) values (?,?,?,?,?,?,?,?)",
      Object.values(Info)
    ),
  // 户口档案转移信息更新
  updateRecord: async (sno) =>
    await db.q(
      "update student_record set sno=?,Class=?,AccountTransfer=?,AddressTransfer=?,Postcode=?,Contacts=?,contactNumber=?,Remark=? where sno=? ",
      Object.values(sno)
    ),

  // 户口档案转移信息查询
  queryStudentRecord: async (sno) =>
    await db.q("select * from student_record WHERE sno = ?", sno),

  // 实习单位信息录入 传入是对象，使用Object.values转变成数组
  internshipUnits: async (Info) =>
    await db.q(
      "insert into students_internshipunits (sno,Class,InternshipUnit,Location,Postcode,EnterprisePerson,EnterprisePhone,Remark,startTime,endTime) values (?,?,?,?,?,?,?,?,?,?)",
      Object.values(Info)
    ),
  // 实习单位信息更新
  updateInternshipUnits: async (sno) =>
    await db.q(
      "update students_internshipunits set sno=?,Class=?,InternshipUnit=?,Location=?,Postcode=?,EnterprisePerson=?,EnterprisePhone=?,Remark=?,startTime=?,endTime=? where sno=? ",
      Object.values(sno)
    ),
  // 实习单位信息查询
  queryInternshipUnits: async (sno) =>
    await db.q("select * from students_internshipunits WHERE sno = ?", sno),

  // 就业信息收录
  studentsEmployment: async (Employment) =>
    await db.q(
      "insert into students_employment (sno,Class,Whereabouts,EnterpriseName,AddressOfEmployer,EnterpriseNature,InstitutionCode,Industry,TypeOfJob,EnterpriseIocality,EnterprisePerson,EnterprisePhone,EnterpriseCredentialTime,Work,Remuneration,Counterparts,FileType,Accessory,FileReceivingUnit,InternshipPosition,Remark) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      Object.values(Employment)
    ),
  // 就业信息更新
  updateEmployment: async (sno) =>
    await db.q(
      "update students_employment set sno=?,Class=?,Whereabouts=?,EnterpriseName=?,AddressOfEmployer=?,EnterpriseNature=?,InstitutionCode=?,Industry=?,TypeOfJob=?,EnterpriseIocality=?,EnterprisePerson=?,EnterprisePhone=?,EnterpriseCredentialTime=?,Work=?,Remuneration=?,Counterparts=?,FileType=?,Accessory=?,FileReceivingUnit=?,InternshipPosition=?,Remark=? where sno=? ",
      Object.values(sno)
    ),
  // 就业信息查询
  queryStuEmployment: async (sno) =>
    await db.q("select * from students_employment WHERE sno = ?", sno),

  // 报道证收录
  credential: async (Employment) =>
    await db.q(
      "insert into students_credential (sno,Class,RegistrationCategory,EnterpriseName,AddressOfEmployer,Deadline,Materials,Remark) values (?,?,?,?,?,?,?,?)",
      Object.values(Employment)
    ),
  // 报道证信息更新
  updatecredential: async (sno) =>
    await db.q(
      "update students_credential set sno=?,Class=?,RegistrationCategory=?,EnterpriseName=?,AddressOfEmployer=?,Deadline=?,Materials=?,Remark=? where sno=? ",
      Object.values(sno)
    ),
  // 报道证查询
  queryCredential: async (sno) =>
    await db.q("select * from students_credential WHERE sno = ?", sno),

  // 就业意向收录
  studentsIntention: async (Info) =>
    await db.q(
      "insert into students_intention (sno,Class,DistrictOne,DistrictTwo,EnterpriseOne,EnterpriseTwo,WorkOne,WorkTwo,Remuneration,Remark) values (?,?,?,?,?,?,?,?,?,?)",
      Object.values(Info)
    ),
  // 就业意向更新
  updateIntention: async (sno) =>
    await db.q(
      "update students_intention set sno=?,Class=?,DistrictOne=?,DistrictTwo=?,EnterpriseOne=?,EnterpriseTwo=?,WorkOne=?,WorkTwo=?,Remuneration=?,Remark=? where sno=? ",
      Object.values(sno)
    ),
  // 就业意向查询
  queryStudentsIntention: async (sno) =>
    await db.q("select * from students_intention WHERE sno = ?", sno),
};
