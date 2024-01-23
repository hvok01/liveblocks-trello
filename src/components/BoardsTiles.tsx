/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Link from "next/link";
import PresenceAvatars from "./PresenceAvatars";
import { RoomInfo } from "@liveblocks/node";
import { RoomProvider } from "@/app/liveblocks.config";

export default function BoardsTiles ({ boards } : {boards: RoomInfo[]}) {

    return (
        <>
                <div className="my-4 grid md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {
                        boards?.length > 0 && boards.map((board) => (
                            <RoomProvider
                                id={board.id}
                                initialPresence={{}} 
                                key={board.id}
                            >
                                <Link 
                                    className="bg-gray-200 px-8 py-12 rounded-md block relative"
                                    key={board.id} 
                                    href={`/boards/${board.id}`}
                                >
                                    {board.metadata.boardName}
                                    <div
                                        className="absolute bottom-1 right-1"
                                    >
                                        <PresenceAvatars presenceKey={'boardId'} presenceValue={board.id} />
                                    </div>
                                </Link>
                            </RoomProvider>
                        ))
                    }
                </div>
        </>
    )
}