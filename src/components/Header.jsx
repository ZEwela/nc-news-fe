import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Link to="/articles" onClick={() => window.location.href="/articles"}>
                <h1 className="logo">News</h1>
            </Link>
        </header>

    )
}

export default Header;