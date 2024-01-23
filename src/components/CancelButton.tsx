import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PropsCancelButton = {
    onClick: () => void;
}

export default function CancelButton ({onClick}: PropsCancelButton) {
    return (
        
        <button 
            onClick={onClick} 
            className="mt-4 w-full flex justify-center uppercase text-sm text-gray-400 gap-2 items-center"
        >
            Cancel edit
            <FontAwesomeIcon icon={faClose} />
        </button>
    )
}