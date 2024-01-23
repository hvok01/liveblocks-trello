/* eslint-disable react-hooks/exhaustive-deps */
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteWithConfirmation from "./DeleteWithConfirmation";
import CancelButton from "./CancelButton";
import { faComments, faFileLines } from "@fortawesome/free-regular-svg-icons";
import CardDescription from "./CardDescription";
import { Composer, Thread } from "@liveblocks/react-comments";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { BoardContext, BoardContextProps } from "./BoardContext";
import { Card, useMutation, useStorage, useThreads } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";

export default function CardModalBody() {
    const router = useRouter();
    const params = useParams();
    const { setOpenCard } = useContext<BoardContextProps>(BoardContext);
    const [ editMode, setEditMode ] = useState(false);
    const { threads } = useThreads({
        query:{ 
            metadata: {
                cardId: params.cardId.toString(),
            }
        }
    });

    const card = useStorage(root => {
        return root.cards.find(c => c.id == params.cardId);
    }, shallow);

    const updateCard = useMutation(({storage}, cardId, updateData) => {
        const cards = storage.get('cards').map(c => c.toObject());
        const index = cards.findIndex(c => c.id == cardId);
        const card = storage.get('cards').get(index);
        for (let updateKey in updateData) {
            card?.set(updateKey as keyof Card, updateData[updateKey]);
        }
    }, [])

    const deleteCard = useMutation(({storage}, id) => {
        const cards = storage.get('cards');
        const cardIndex = cards.findIndex(c => c.toObject().id == id);
        cards.delete(cardIndex);
    }, [])

    useEffect(() => {
      if(params.cardId && setOpenCard) {
        setOpenCard(params.cardId.toString());
      }
    }, [params]);

    function handleDelete () {
        deleteCard(params.cardId);
        if(setOpenCard) {
            setOpenCard(null);
        }
        router.back();
    }

    function handleNewChangeSubmit (ev:FormEvent) {
        ev.preventDefault();
        const input = (ev.target as HTMLFormElement).querySelector('input');
        if (input) {
            const newName = input.value;
            updateCard(params.cardId, {name: newName});
            setEditMode(false);
        }
    }

    return (
        <div>
            {
                !editMode && (
                    <div className="flex justify-between">
                        <h4 className="text-2xl">{card?.name}</h4>
                        <button className="text-gray-400" onClick={() => setEditMode(true)}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                    </div>
                )
            }
            {
                editMode && (
                    <div>
                        <form onSubmit={(ev) => handleNewChangeSubmit(ev)}>
                            <input type="text" defaultValue={card?.name} className="mb-2"/>
                            <button type="submit" className="w-full">Save</button>
                        </form>
                        <div className="mt-2">
                            <DeleteWithConfirmation 
                                onDelete={() => handleDelete()}
                            />
                        </div>
                        <CancelButton onClick={() => setEditMode(false)}/>
                    </div>
                )
            }
            {
                !editMode && (
                    <div>
                        <h2 className="flex gap-2 items-center mt-4">
                            Description
                            <FontAwesomeIcon icon={faFileLines} />
                        </h2>
                        <CardDescription />
                        <h2 className="flex gap-2 items-center mt-4">
                            Comments
                            <FontAwesomeIcon icon={faComments} />
                        </h2>
                        <div className="-mx-4">
                            {
                                threads && threads.map(thread => (
                                    <div key={thread.id}>
                                        <Thread thread={thread} id={thread.id}/>
                                    </div>
                                )) 
                            }
                            {
                                threads?.length === 0 && (
                                    <div>
                                        <Composer metadata={{cardId: params.cardId.toString()}} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}