import {BrowserRouter, Route, Routes} from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
    toggleIsDark: () => void;
    isDark: boolean;
}


function Router({toggleIsDark, isDark}: IRouterProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:coinId/*" element={<Coin isDark={isDark}/>}></Route>
                <Route path="/" element={<Coins toggleIsDark={toggleIsDark} isDark={isDark}/>}></Route>
            </Routes>
        </BrowserRouter>
    );


}

export default Router;
