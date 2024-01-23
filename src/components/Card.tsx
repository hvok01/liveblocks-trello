/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { BoardContext } from "./BoardContext";
import PresenceAvatars from "./PresenceAvatars";

export default function Card({id, name, key}: {id: string, name: string, key: number}) {
    const params = useParams();
    const router = useRouter();
    const { openCard } = useContext(BoardContext);

    useEffect(() => {
        if (params.cardId && !openCard) {
            const { boardId, cardId } = params;
            router.push(`/boards/${boardId}`);
            router.push(`/boards/${boardId}/cards/${cardId}`);
        }

        if (!params.cardId && openCard) {
            const { boardId } = params;
            router.push(`/boards/${boardId}`);
        }

    }, [params.cardId]);

    return (
        <Link 
            href={`/boards/${params.boardId}/cards/${id}`} 
            className="relative border block bg-white my-2 py-8 px-4 rounded-md"
        >
            <span>{name}</span>
            <div
                className="absolute bottom-1 right-1"
            >
                <PresenceAvatars presenceKey={'cardId'} presenceValue={id} />
            </div>
        </Link>
    )

}