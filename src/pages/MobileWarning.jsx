import "../styles/mobileWarning.css";
import { useNavigate } from "react-router-dom";

const MobileWarning = ({ onProceed }) => {
	const navigate = useNavigate();

	const handleProceed = () => {
		localStorage.setItem("mobileWarningDismissed", "true");
		onProceed();
		navigate("/dashboard", { replace: true });
	};

	return (
		<div className="mobile-warning-container">
			<div className="mobile-warning-content">
				<h1>📱 Mobile Experience Notice</h1>
				<p>
					For the best experience, we recommend using Productsuite.ai on a
					desktop computer. Some features might be limited on mobile devices.
				</p>
				<button className="proceed-button" onClick={handleProceed}>
					Proceed Anyway
				</button>
			</div>
		</div>
	);
};

export default MobileWarning;
