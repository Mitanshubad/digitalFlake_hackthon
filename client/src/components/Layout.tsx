import Navbar from "./Navbar"
import Sidebar from "./Sidebar";
interface LayoutProps {
    children: React.ReactNode;
  }
  

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <div className="flex overflow-hidden flex-col bg-white">
        <Navbar/>
        <div className="self-start max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <Sidebar/>
            <main className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
              {children}
            </main>
          </div>
        </div>
      </div>
    );
  };