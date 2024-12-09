import prociousLogo from "./images/procious-chef.png";

export default function Header() {
    return (
        <header>
            <img src={prociousLogo} alt="Procious Logo" />
            <div className="header-text">
                <h1>Procious</h1>
                <p className="tagline">Elevate your plate</p>
            </div>
        </header>
    );
}
