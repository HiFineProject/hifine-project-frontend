import { useNavigate } from "react-router-dom"

function BackButton() {
    const navigate = useNavigate();
    return (
        <button
            type="back"
            onClick={(event) => {
                event.preventDefault();
                navigate(-1);
            }}>
            <span className="material-symbols-rounded">
                arrow_back
            </span>
        </button>
    )
}

export default BackButton