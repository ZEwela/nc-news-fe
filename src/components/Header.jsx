import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Link className="logo" to="/articles" onClick={() => window.location.href="/articles"}>
                <h1>News</h1>
            </Link>
        </header>

    )
}

export default Header;