import {
  Bell,
  CircleUser,
  Dot,
  Home,
  Menu,
  Minus,
  Package2,
  PersonStanding,
  Plus,
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
import { useContext, useState } from "react";
import { AuthContext } from "@/Providers/AuthProvider"


const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState();
  const { changeUserState, admin, AdminLogout } = useContext(AuthContext)
  const [navOn, setNavOn] = useState(false);

  const navHandler = () => {
    setNavOn(!navOn);
  };
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
  return (
    <>
      <div className="sidebar grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
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
                <NavLink
                  to="/dashboard"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-success ${
                    selectedMenu === "dashboard"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                  onClick={() => setSelectedMenu("dashboard")}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/dashboard/teachers"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all hover:text-success ${
                    selectedMenu === "teachers"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                  onClick={() => setSelectedMenu("teachers")}
                >
                  <PersonStanding className="h-4 w-4" />
                  Teachers
                </NavLink>
                {/* student  */}

                <button onClick={navHandler}>
                  <div className="flex items-center justify-between">
                    <a
                      onClick={navHandler}
                      href="#"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all hover:text-success `}
                      //onClick={() => setSelectedMenu("teachers")}
                    >
                      <PersonStanding className="h-4 w-4" />
                      Students
                    </a>
                    {navOn ? (
                      <Minus className="mt-2 h-4" />
                    ) : (
                      <Plus className="mt-2 h-4" />
                    )}
                  </div>
                </button>

                {navOn ? (
                  <div>
                    <Link
                      to="/dashboard/teachers"
                      className={`flex items-center rounded-lg px-3 py-2 ml-3 text-muted-foreground transition-all hover:text-success ${
                        selectedMenu === "teachers"
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }`}
                      //onClick={() => setSelectedMenu("teachers")}
                    >
                      <Dot className="h-8 w-8" />
                      Add Student
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </nav>
            </div>
          </div>
        </div>
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
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
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
                  <h1>Welcome To SMS</h1>
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
                <DropdownMenuItem>Settings</DropdownMenuItem>
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
