import Vue from "vue";
import VueRouter from "vue-router";
//组件
import Main from "@/components/Main.vue";
import home from "@/components/home/home.vue";
import affiche from "@/components/adminInform/affiche.vue";
import notice from "@/components/adminInform/notice.vue";
import studentsUser from "@/components/adminUser/studentsUser.vue";
import teachersUser from "@/components/adminUser/teachersUser.vue";
import lineChart from "@/components/teacherEcharts/lineChart.vue";
import ContractRate from "@/components/teacherEcharts/ContractRate.vue";
import pie from "@/components/teacherEcharts/pie.vue";
import personalInfo from "@/components/StudentInfoCollection/personalInfo.vue";
import studentsEmployment from "@/components/StudentInfoCollection/studentsEmployment.vue";
import credential from "@/components/StudentInfoCollection/credential.vue";
import record from "@/components/StudentInfoCollection/record.vue";
import internshipUnits from "@/components/StudentInfoCollection/internshipUnits.vue";
import intention from "@/components/StudentInfoCollection/intention.vue";
import StudentsContact from "@/components/StudentInfoCollection/StudentsContact.vue";
import teacherEmployment from "@/components/teacher/teacherEmployment.vue";
import teacherContact from "@/components/teacher/teacherContact.vue";
import teacherCredential from "@/components/teacher/teacherCredential.vue";
import teacherIntention from "@/components/teacher/teacherIntention.vue";
import teacherRecord from "@/components/teacher/teacherRecord.vue";
import teacherStudentInfo from "@/components/teacher/teacherStudentInfo.vue";
import teacherUnits from "@/components/teacher/teacherUnits.vue";
import FillProgress from "@/components/teacher/FillProgress.vue";

import login from "@/components/login/login.vue";

Vue.use(VueRouter);

//定义路由
export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
      redirect: "/home",
      children: [
        //   {
        //     path: "/home",
        //     name: "home",
        //     //按需引入，不再需要在上方引入组件
        //     component: home,
        //   },
        //   {
        //     path: "/affiche",
        //     name: "affiche",
        //     component: affiche,
        //   },
        //   {
        //     path: "/notice",
        //     name: "notice",
        //     component: notice,
        //   },
        //   {
        //     path: "/studentsUser",
        //     name: "studentsUser",
        //     component: studentsUser,
        //   },
        //   {
        //     path: "/teachersUser",
        //     name: "teachersUser",
        //     component: teachersUser,
        //   },
        //   {
        //     path: "/lineChart",
        //     name: "lineChart",
        //     component: lineChart,
        //   },
        //   {
        //     path: "/ContractRate",
        //     name: "ContractRate",
        //     component: ContractRate,
        //   },
        //   {
        //     path: "/pie",
        //     name: "pie",
        //     component: pie,
        //   },
        //   {
        //     path: "/personalInfo",
        //     name: "personalInfo",
        //     component: personalInfo,
        //   },
        //   {
        //     path: "/studentsEmployment",
        //     name: "studentsEmployment",
        //     component: studentsEmployment,
        //   },
        //   {
        //     path: "/credential",
        //     name: "credential",
        //     component: credential,
        //   },
        //   {
        //     path: "/record",
        //     name: "record",
        //     component: record,
        //   },
        //   {
        //     path: "/internshipUnits",
        //     name: "internshipUnits",
        //     component: internshipUnits,
        //   },
        //   {
        //     path: "/intention",
        //     name: "intention",
        //     component: intention,
        //   },
        //   {
        //     path: "/StudentsContact",
        //     name: "StudentsContact",
        //     component: StudentsContact,
        //   },
        //   {
        //     path: "/teacherEmployment",
        //     name: "teacherEmployment",
        //     component: teacherEmployment,
        //   },
        //   {
        //     path: "/teacherContact",
        //     name: "teacherContact",
        //     component: teacherContact,
        //   },
        //   {
        //     path: "/teacherCredential",
        //     name: "teacherCredential",
        //     component: teacherCredential,
        //   },
        //   {
        //     path: "/teacherIntention",
        //     name: "teacherIntention",
        //     component: teacherIntention,
        //   },
        //   {
        //     path: "/teacherRecord",
        //     name: "teacherRecord",
        //     component: teacherRecord,
        //   },
        //   {
        //     path: "/teacherStudentInfo",
        //     name: "teacherStudentInfo",
        //     component: teacherStudentInfo,
        //   },
        //   {
        //     path: "/teacherUnits",
        //     name: "teacherUnits",
        //     component: teacherUnits,
        //   },
        //   {
        //     path: "/FillProgress",
        //     name: "FillProgress",
        //     component: FillProgress,
        //   },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
  ],
});
