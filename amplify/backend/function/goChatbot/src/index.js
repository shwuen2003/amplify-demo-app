/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
  try {
    console.log("EVENT:", JSON.stringify(event));

    // Support both mock (event body might not exist) and API calls
    const body = event.body ? JSON.parse(event.body) : event;

    const { query, conversation_id = "", user = "abc-123", files = [] } = body;

    const payload = {
      inputs: {},
      query,
      response_mode: "blocking",
      conversation_id,
      user,
      files,
    };

    const response = await fetch("http://47.129.138.40/v1/chat-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer app-E3Kqn46CQaNSO54T0zupF0jF"
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("Error calling Dify API:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ error: "Failed to call Dify API" }),
    };
  }
};
