type Status = "success" | "error";

export function createResponse(status: Status, data: any = {}): Response {
  if(status === "success") {
    return new Response(
      JSON.stringify({
        data: {
          status: "success",
          result: data,
        },
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        data: {
          status: "error",
          result: data,
        },
      })
    );
  }
}