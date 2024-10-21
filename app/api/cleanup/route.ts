import { deleteApiKey, getAllApiKeys } from "@/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const now = new Date().getTime();
  let { result, error } = await getAllApiKeys({ limit: 50 });
  if (error) return new Response(error.message, { status: 500 });

  const deletePromises = [];
  let failedDeletions = 0;

  // Function to handle deletion safely
  const safeDelete = async (keyId: string) => {
    try {
      await deleteApiKey(keyId);
    } catch (err) {
      console.error(
        `Failed to delete API key with id ${keyId}: ${(err as Error).message}`
      );
      failedDeletions++;
    }
  };

  for (const key of result?.keys || []) {
    if (key.expires && key.expires < now) {
      deletePromises.push(safeDelete(key.id));
    }
  }

  let cursor = result?.cursor;
  while (cursor) {
    ({ result, error } = await getAllApiKeys({ limit: 50, cursor }));

    if (error) {
      console.error(
        `Error fetching keys with cursor ${cursor}: ${error.message}`
      );
      break;
    }

    for (const key of result?.keys || []) {
      if (key.expires && key.expires < now) {
        deletePromises.push(safeDelete(key.id));
      }
    }

    cursor = result?.cursor;
  }

  // Wait for all deletion promises to complete
  await Promise.all(deletePromises);

  return new Response(
    JSON.stringify({
      message: "Operation completed",
      deletedCount: deletePromises.length - failedDeletions,
      failedDeletions,
    }),
    { status: 200 }
  );
}
