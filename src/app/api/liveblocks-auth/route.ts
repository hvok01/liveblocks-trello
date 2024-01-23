import { authOptions } from "@/lib/authOptions";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  // Get the current user from your database
  const session = await getServerSession(authOptions);
  if(session && session.user && session.user.email) {
    const user = session?.user;
  
    // Identify the user and return the result
    const { status, body } = await liveblocksClient.identifyUser(
        {
            userId: user.email || '',
            groupIds: [],
        },
        {   userInfo: 
            {
                name: user.name || '',
                email: user.email,
                image: user.image,
            } 
        },
    );
  
    return new Response(body, { status });

  } else {
    return new Response('Unauthorized', { status: 401})
  }
}