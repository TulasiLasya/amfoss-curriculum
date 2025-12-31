import Menu from "../Components/Menu";
import Header from "../Components/Header";
import Playbar from "../Components/Playbar";


function Dashboard(){
    return (
        <>
       <Header/>
        <div>
            <Menu/>
        </div>
         <Playbar/>
        </>
    );
}

export default Dashboard;