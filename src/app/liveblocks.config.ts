import { LiveList, LiveObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle: 100,
});

export type Presence = {
  boardId?: string | null;
  cardId?: string | null;
};

export type Column = {
  name: string,
  id: string,
  index: number,
};

export type Card = {
    name: string,
    id: string,
    index: number,
    columnId: string,
}

type Storage = {
  columns: LiveList<LiveObject<Column>>
  cards: LiveList<LiveObject<Card>>
};

type UserMeta = {
  id: string;
  info: {
    name: string;
    email: string;
    image: string;
  }
}

type RoomEvent = {}

type ThreadMetadata = {
  cardId: string;
}

export const {
  RoomProvider,
  useMyPresence,
  useUpdateMyPresence,
  useStorage,
  useMutation,
  useRoom,
  useSelf,
  useOthers,
  useThreads,
} = createRoomContext<
  Presence,
  Storage,
  UserMeta,
  RoomEvent,
  ThreadMetadata
>(client, {
  resolveUsers: async({userIds}) => {
    const response = await fetch(`/api/users?ids=` + userIds.join(','));
    let resolvedUsers = await response.json();
    return resolvedUsers;
  },
  resolveMentionSuggestions: async ({text}) => {
    const response = await fetch("/api/users?search="+text);
    const users = await response.json(); 
    return users.map((u: UserMeta) => u.id);
  }
});