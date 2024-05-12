import {
  Album,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CircleUser,
  DiamondPercent,
  Dot,
  Home,
  Menu,
  MessageSquarePlus,
  Minus,
  Package2,
  Percent,
  Plus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Providers/AuthProvider"


const Dashboard = () => {
  const { changeUserState, admin, AdminLogout } = useContext(AuthContext)

  // console.log(admin)
  const [selectedMenu, setSelectedMenu] = useState();
  const [studentNav, setStudentNav] = useState(false);
  const [teachersNav, setTeachersNav] = useState(false);
  const [staffNav, setStaffNav] = useState(false);
  const [subjectNav, setSubjectNav] = useState(false);
  const [classNav, setClassNav] = useState(false);
  const [noticeNav, setNoticeNav] = useState(false);
  const [feeNav, setFeeNav] = useState(false);
  const [resultNav, setResultNav] = useState(false);
  const [idCardNav, setIdCardNav] = useState(false);
  const [salaryNav, setSalaryNav] = useState(false);
  const [reportNav, setReportNav] = useState(false);
  const [examNav, setExamNav] = useState(false);

  const [accountsNav, setAccountsNav] = useState(false);

  const closeAllMenus = () => {
    setStudentNav(false);
    setTeachersNav(false);
    setStaffNav(false);
    setSubjectNav(false);
    setClassNav(false);
    setNoticeNav(false);
    setFeeNav(false);
    setResultNav(false);
    setSalaryNav(false);
    setReportNav(false);
    setExamNav(false);
    setIdCardNav(false);
    setAccountsNav(false);
  };

  const studentNavHandler = (e) => {
    const id = e.target.parentNode.parentNode.id
    localStorage.setItem('navItem', id)
    closeAllMenus();
    setStudentNav(!studentNav);
  };
  const teachersNavHandler = (e) => {
    const id = e.target.parentNode.parentNode.id
    localStorage.setItem('navItem', id)
    closeAllMenus();
    setTeachersNav(!teachersNav);
  };
  const staffNavHandler = (e) => {
    const id = e.target.parentNode.parentNode.id
    localStorage.setItem('navItem', id)
    closeAllMenus();
    setStaffNav(!staffNav);
  };
  const subjectNavHandler = (e) => {
    const id = e.target.parentNode.parentNode.id
    localStorage.setItem('navItem', id)
    closeAllMenus();
    setSubjectNav(!subjectNav);
  };
  const classNavHandler = (e) => {
    const id = e.target.parentNode.parentNode.id
    localStorage.setItem('navItem', id)
    closeAllMenus();
    setClassNav(!classNav);
  };
  const accountNavHandler = (e) => {
    const id = e.target.parentNode.parentNode.id
    localStorage.setItem('navItem', id)
    closeAllMenus();
    setAccountsNav(!accountsNav);
  };
  const feeHandler = (e) => {
    localStorage.setItem('navItem', e.target.id)
    closeAllMenus();
    setFeeNav(!feeNav);
  };
  const salaryHandler = (e) => {
    localStorage.setItem('navItem', e.target.id)
    closeAllMenus();
    setSalaryNav(!salaryNav);
  };
  const navMenuHandler = (e) => {
    localStorage.setItem('navItem', e.target.id)
    closeAllMenus();
  };
 
  // const noticeNavHandler = () => {
  //   closeAllMenus();
  //   setNoticeNav(!noticeNav);
  // };
  // const feeNavHandler = () => {
  //   closeAllMenus();
  //   setFeeNav(!feeNav);
  // };
  // const resultNavHandler = () => {
  //   closeAllMenus();
  //   setResultNav(!resultNav);
  // };
  // const idCardNavHandler = () => {
  //   closeAllMenus();
  //   setIdCardNav(!idCardNav);
  // };
  // const salaryNavHandler = () => {
  //   closeAllMenus();
  //   setSalaryNav(!salaryNav);
  // };
  // const reportNavHandler = () => {
  //   closeAllMenus();
  //   setReportNav(!reportNav);
  // };
  // const examNavHandler = () => {
  //   closeAllMenus();
  //   setExamNav(!examNav);
  // };
  const navigate = useNavigate()
  const handleLogout = () => {
    AdminLogout()
      .then(res=> res.json())
      .then(data=> {
          console.log(data)
          changeUserState(null)
          localStorage.removeItem('status')
          navigate('/')
      })
      .catch(err=> {
          console.log(err)
      })
  }

  useEffect(() => {
    const navItem = localStorage.getItem("navItem")
    if(navItem) {
      
      document.getElementById(navItem).click()
      localStorage.setItem("navItem", navItem)
    }
  }, [])
  return (
    <>
      <div className="sidebar grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full   max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="">SMS ADMIN</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link id="dash"
                  to="/dashboard"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white`}
                  onClick={(e) => {
                    setSelectedMenu("dashboard");
                    navMenuHandler(e);
                    
                  }}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                {/* class start*/}
                <button id="classes"  className="text-black" onClick={classNavHandler}>
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all `}
                    >
                      <BriefcaseBusiness className="h-4 w-4" />
                      Classes
                    </a>
                    {classNav ? (
                      <Minus className="mt-2 h-4" />
                    ) : (
                      <Plus className="mt-2 h-4" />
                    )}
                  </div>
                </button>
                {classNav ? (
                  <div className="fadeInDown">
                    <NavLink
                
                      to="/dashboard/classes"
                      className={`flex items-center rounded-lg px-3 py-1 mb-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("classes")}
                    >
                      <Dot className="h-8 w-8" />
                      View Classes
                    </NavLink>
                    <NavLink
                      to="/dashboard/add-classes"
                      className={`flex items-center rounded-lg px-3 py-1 ml-3 mb-1 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("add-classes")}
                    >
                      <Dot className="h-8 w-8" />
                      Add Classes
                    </NavLink>
                    <NavLink
                      to="/dashboard/add-sections"
                      className={`flex items-center rounded-lg px-3 py-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("sections")}
                    >
                      <Dot className="h-8 w-8" />
                      Add Sections
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}
                {/* class End*/}
                {/* Subject */}
                <button id="sub" className="" onClick={subjectNavHandler}>
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all `}
                    >
                      <BookOpen className="h-4 w-4" />
                      Subject / Course
                    </a>
                    {subjectNav ? (
                      <Minus className="mt-2 h-4" />
                    ) : (
                      <Plus className="mt-2 h-4" />
                    )}
                  </div>
                </button>
                {subjectNav ? (
                  <div className="fadeInDown">
                  {/*   <NavLink
                      to="/dashboard/subjects"
                      className={`flex items-center rounded-lg px-3 py-1 mb-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("subjects")}
                    >
                      <Dot className="h-8 w-8" />
                      View Subject
                    </NavLink> */}
                    <NavLink
                      to="/dashboard/add-subjects"
                      className={`flex items-center rounded-lg px-3 py-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("add-subjects")}
                    >
                      <Dot className="h-8 w-8" />
                      Add Subject
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}
                {/* Subject End */}

                {/* Student Start  */}
                <button id="std"
                  className="text-muted-foreground "
                  onClick={studentNavHandler}
                >
                  <div className="flex items-center justify-between rounded-lg  ">
                    <a
                      href="#"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all `}
                    >
                      <Users className="h-4 w-4" />
                      Students
                    </a>
                    {studentNav ? (
                      <Minus className="mt-2 h-4 text-black" />
                    ) : (
                      <Plus className="mt-2 h-4 text-black" />
                    )}
                  </div>
                </button>
                {studentNav ? (
                  <div className="fadeInDown">
                    <NavLink
                      to="/dashboard/students"
                      className={`flex items-center rounded-lg px-3 py-1 ml-3 mb-1 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("students")}
                    >
                      <Dot className="h-8 w-8" />
                      View Student
                    </NavLink>
                    <NavLink
                      to="/dashboard/add-students"
                      className={`flex items-center rounded-lg px-3 py-1 ml-3 mb-1 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("add-students")}
                    >
                      <Dot className="h-8 w-8" />
                      Admission
                    </NavLink>
                    <NavLink
                      to="/dashboard/id-cards"
                      className={`flex items-center rounded-lg px-3 py-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("id-cards")}
                    >
                      <Dot className="h-8 w-8 hover:bg-[#f2f2f2]" />
                      Generate ID Card
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}
                {/* Student End */}

                {/* Teachers Start  */}
                <button id="teacher"
                  className="text-muted-foreground "
                  onClick={ teachersNavHandler}
                >
                  <div className="flex items-center justify-between rounded-lg  ">
                    <a
                      href="#"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all `}
                    >
                      <BriefcaseBusiness className="h-4 w-4" />
                      Teachers
                    </a>
                    {teachersNav ? (
                      <Minus className="mt-2 h-4 text-black" />
                    ) : (
                      <Plus className="mt-2 h-4 text-black" />
                    )}
                  </div>
                </button>
                {teachersNav ? (
                  <div className="fadeInDown">
                    <NavLink
                      to="/dashboard/teachers"
                      className={`flex items-center rounded-lg px-3 py-1 ml-3 mb-1 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("teachers")}
                    >
                      <Dot className="h-8 w-8" />
                      View Teachers
                    </NavLink>
                    <NavLink
                      to="/dashboard/add-teachers"
                      className={`flex items-center rounded-lg px-3 py-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("add-teachers")}
                    >
                      <Dot className="h-8 w-8" />
                      Add Teachers
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}
                {/* Teachers End */}

                {/* Office Staffs Start */}
                <button id="staff" className="" onClick={staffNavHandler}>
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all `}
                    >
                      <Album className="h-4 w-4" />
                      Office Staffs
                    </a>
                    {staffNav ? (
                      <Minus className="mt-2 h-4" />
                    ) : (
                      <Plus className="mt-2 h-4" />
                    )}
                  </div>
                </button>
                {staffNav ? (
                  <div className="fadeInDown">
                    <NavLink
                      to="/dashboard/stuffs"
                      className={`flex items-center rounded-lg px-3 py-1 mb-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("staffs")}
                    >
                      <Dot className="h-8 w-8" />
                      View Staff
                    </NavLink>
                    <NavLink
                      to="/dashboard/add-staffs"
                      className={`flex items-center rounded-lg px-3 py-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("add-staffs")}
                    >
                      <Dot className="h-8 w-8" />
                      Add Staff
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}

                {/* Fee Start */}
                <button id="acc" className="" onClick={feeHandler}>
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all `}
                    >
                      <DiamondPercent className="h-4 w-4" />
                      Fees
                    </a>
                    {feeNav ? (
                      <Minus className="mt-2 h-4" />
                    ) : (
                      <Plus className="mt-2 h-4" />
                    )}
                  </div>
                </button>
                {feeNav ? (
                  <div className="fadeInDown">
                    <NavLink
                      to="/dashboard/add-fees"
                      className={`flex items-center rounded-lg px-3 py-1 mb-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("add-accounts")}
                    >
                      <Dot className="h-8 w-8" />
                      Add Fees
                    </NavLink>
                    <NavLink
                      to="/dashboard/fees"
                      className={`flex items-center rounded-lg px-3 py-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("view-accounts-report")}
                    >
                      <Dot className="h-8 w-8" />
                      View Reports
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}

                {/* Salary Start */}
                <button id="acc" className="" onClick={salaryHandler}>
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all `}
                    >
                      <Percent className="h-4 w-4" />
                      Salaries
                    </a>
                    {salaryNav ? (
                      <Minus className="mt-2 h-4" />
                    ) : (
                      <Plus className="mt-2 h-4" />
                    )}
                  </div>
                </button>
                {salaryNav ? (
                  <div className="fadeInDown">
                    <NavLink
                      to="/dashboard/pay-salaries"
                      className={`flex items-center rounded-lg px-3 py-1 mb-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("add-accounts")}
                    >
                      <Dot className="h-8 w-8" />
                      Pay Salaries
                    </NavLink>
                    <NavLink
                      to="/dashboard/salaries-report"
                      className={`flex items-center rounded-lg px-3 py-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("view-accounts-report")}
                    >
                      <Dot className="h-8 w-8" />
                      View Reports
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}

                  {/* Accounts Start */}
                  <button id="acc" className="" onClick={accountNavHandler}>
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all `}
                    >
                      <MessageSquarePlus className="h-4 w-4" />
                      Accounts
                    </a>
                    {accountsNav ? (
                      <Minus className="mt-2 h-4" />
                    ) : (
                      <Plus className="mt-2 h-4" />
                    )}
                  </div>
                </button>
                {accountsNav ? (
                  <div className="fadeInDown">
                    <NavLink
                      to="/dashboard/add-accounts"
                      className={`flex items-center rounded-lg px-3 py-1 mb-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("add-accounts")}
                    >
                      <Dot className="h-8 w-8" />
                      Add Accounts
                    </NavLink>
                    <NavLink
                      to="/dashboard/view-accounts-report"
                      className={`flex items-center rounded-lg px-3 py-1 ml-3 text-muted-foreground transition-all hover:text-white hover:bg-primary`}
                      onClick={() => setSelectedMenu("view-accounts-report")}
                    >
                      <Dot className="h-8 w-8" />
                      View Reports
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}

                {/* section */}
                {/* <Link
                  to="/dashboard/sections"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all hover:text-white hover:bg-primary ${selectedMenu === "sections"
                    ? "bg-primary text-primary-foreground"
                    : ""
                    }`}
                  onClick={() => {
                    setSelectedMenu("sections");
                    navMenuHandler();
                  }}
                >
                  <LayoutPanelTop className="h-4 w-4" />
                  Section
                </Link> */}

                {/* notices */}
                {/* <Link
                  to="/dashboard/notices"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all hover:text-white hover:bg-primary ${selectedMenu === "notices"
                    ? "bg-primary text-primary-foreground"
                    : ""
                    }`}
                  onClick={() => {
                    setSelectedMenu("notices");
                    navMenuHandler();
                  }}
                >
                  <PersonStanding className="h-4 w-4" />
                  Notice
                </Link> */}

                {/* fee */}
                {/* <Link
                  to="/dashboard/fees"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all hover:text-white hover:bg-primary ${selectedMenu === "fees"
                    ? "bg-primary text-primary-foreground"
                    : ""
                    }`}
                  onClick={() => {
                    setSelectedMenu("fees");
                    navMenuHandler();
                  }}
                >
                  <PersonStanding className="h-4 w-4" />
                  Fee
                </Link> */}
                {/* result */}
                {/*  <Link
                  to="/dashboard/results"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all hover:text-white hover:bg-primary ${selectedMenu === "result"
                    ? "bg-primary text-primary-foreground"
                    : ""
                    }`}
                  onClick={() => {
                    setSelectedMenu("results");
                    navMenuHandler();
                  }}
                >
                  <PersonStanding className="h-4 w-4" />
                  Results
                </Link> */}

                {/* salary */}
                {/* <Link
                  to="/dashboard/salaries"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all hover:text-white hover:bg-primary ${selectedMenu === "salaries"
                    ? "bg-primary text-primary-foreground"
                    : ""
                    }`}
                  onClick={() => {
                    setSelectedMenu("salaries");
                    navMenuHandler();
                  }}
                >
                  <PersonStanding className="h-4 w-4" />
                  Salaries
                </Link> */}
                {/* Exam */}
                {/* <Link
                  to="/dashboard/exams"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all hover:text-white hover:bg-primary ${selectedMenu === "exams"
                    ? "bg-primary text-primary-foreground"
                    : ""
                    }`}
                  onClick={() => {
                    setSelectedMenu("exams");
                    navMenuHandler();
                  }}
                >
                  <PersonStanding className="h-4 w-4" />
                  Exam
                </Link> */}
              </nav>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------------------- */}
        {/* ---------------------------------------------------------------------------- */}

        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </NavLink>
                </nav>
                <div className="mt-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our
                        support team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  {(admin?.info) ? <h1 className="font-bold text-xl">{admin.inst_name}</h1> : ""}
                </div>
              </form>
            </div>
            {admin ? admin.email: ''}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to='/dashboard/admin-settings'><DropdownMenuItem>
                  Settings
                </DropdownMenuItem></Link>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
