'use client';

import { deleteBoard, removeEmailFromBoard, updateBoard } from "@/app/actions/boardActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomAccesses } from "@liveblocks/node";
import { useRouter } from "next/navigation";

export default function EmailsAccessList({boardId, userAccesses} : {boardId: string, userAccesses: RoomAccesses}) {
    const router = useRouter();

    async function handleDelete(emailToDelete: string) {
        await removeEmailFromBoard(boardId, emailToDelete);
        router.refresh();
    }

    return(
        <div className="max-w-sx">
            {
                Object.keys(userAccesses).map((email, index) => (
                    <div key={index} className="flex gap-2 my-4 items-center max-w-xs justify-between border rounded-lg pl-4">
                        {email}
                        <button className="btn pd-1" onClick={() => handleDelete(email)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                )) 
            }
        </div>
    )
}