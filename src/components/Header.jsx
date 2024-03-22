import { useContext } from "react";
import { Link } from "react-router-dom";
import { ArticlesDisplayToggleContext } from "../context/ArticlesDisplayToggle";

const Header = () => {
    const {setArticlesDisplayToggle} = useContext(ArticlesDisplayToggleContext)
    return (
        <header>
            <Link className="logo" to="/articles" onClick={() => setArticlesDisplayToggle(curr => !curr)}>
                <h1>News</h1>
            </Link>
        </header>

    )
}

export default Header;