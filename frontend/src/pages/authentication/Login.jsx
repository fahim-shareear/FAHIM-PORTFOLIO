import "../../all-css/login.css";

const Login = () => {
    return (
        <div className="login_container">
            <div className="auth-card">
                <div className="auth-card__chrome">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                </div>

                <h2 className="auth-card__title">
                    <span className="prompt">&gt;</span> access_terminal<span className="cursor">_</span>
                </h2>

                <form className="auth-form">
                    <label className="field-label" htmlFor="email">
                        <span className="prompt">$</span> email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="field-input"
                        placeholder="name@domain.com"
                        autoComplete="email"
                    />

                    <label className="field-label" htmlFor="password">
                        <span className="prompt">$</span> password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="field-input"
                        placeholder="••••••••"
                        autoComplete="current-password"
                    />

                    <div className="auth-form__meta">
                        <a className="auth-link">forgot password?</a>
                    </div>

                    <button type="submit" className="auth-btn">
                        log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;