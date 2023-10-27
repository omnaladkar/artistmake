import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Routers from "../../routes/Routers.jsx"
 
const Layout = () => {
    return (
        <>
  <Header/>
        <main>
 <Routers/>
        </main>
        <Footer/>
        </>
    )
}
export default Layout;