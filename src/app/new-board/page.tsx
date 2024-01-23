'use client'

import { redirect } from "next/navigation";
import { createBoard } from "../actions/boardActions";

export default function NewBoardPage() {

    async function handleNewBoardSubmit(formData: FormData) {
        const boardName: string = formData.get("name")?.toString() || '';
        const boardResponse = await createBoard(boardName);
        boardResponse ? redirect(`/boards/${boardResponse?.id}`) : redirect(`/`);
    }

    return (
        <div>
            <form action={handleNewBoardSubmit} className="max-w-xs block">
                <h1 className="text-2xl mb-4">Create new board</h1>
                <input type="text" name="name" placeholder="board name"/>
                <button className="mt-2 w-full" type="submit">Create board</button>
            </form>
        </div>
    )
}