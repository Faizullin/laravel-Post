import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import Sidebar from "@/Components/Dashboard/Sidebar";
//   DashboardNavbar,
//   Configurator,
//   Footer,

export function TestLayout({children}) {
    const sidenavType = "white";

    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            {/* <Sidebar
                brandImg={
                sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
                }
            /> */}
            <div className="p-4 xl:ml-80">
                {/* <DashboardNavbar /> */}
                <IconButton
                size="lg"
                color="white"
                className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
                ripple={false}
                onClick={() => setOpenConfigurator(dispatch, true)}
                >
                <Cog6ToothIcon className="h-5 w-5" />
                </IconButton>
                {/* <Routes>
                {routes.map(
                    ({ layout, pages }) =>
                    layout === "dashboard" &&
                    pages.map(({ path, element }) => (
                        <Route exact path={path} element={element} />
                    ))
                )}
                </Routes> */}
                {children}
                <div className="text-blue-gray-600">
                {/* <Footer /> */}
                </div>
            </div>
        </div>
    );
}

TestLayout.displayName = "/src/layout/dashboard.jsx";

export default TestLayout;
