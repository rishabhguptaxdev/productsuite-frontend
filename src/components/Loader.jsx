import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "../styles/loader.css";

const Loader = ({ loadingText = "Loading..." }) => {
	return (
		<div className="loader-container">
			<FontAwesomeIcon
				icon={faSpinner}
				spin
				size="3x"
				className="loader-icon"
			/>
			<p>{loadingText}</p>
		</div>
	);
};

export default Loader;
