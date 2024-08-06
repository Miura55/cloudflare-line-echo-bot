/**
 * Cloudflare Workersで動くLINE Botのサンプル 
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const endpoint = "https://api.line.me/v2/bot/message/reply";

export default {
  async fetch(request, env) {
    /**
     * readRequestBody:　リクエストボディを読み込む 
     * @param {Request} request the incoming request to read from
     */
    async function readRequestBody(request) {
      const contentType = request.headers.get("content-type");
      if (contentType.includes("application/json")) {
        const body = await request.json();
        return body;
      } else {
        return "Invalid content-type";
      }
    }

    /**
     * replyMessage: LINEにメッセージを返信する 
     * @param {string} replyToken the reply token to send back to LINE
     * @param {string} message the message to send back to LINE
     */
    async function replyMessage(replyToken, message) {
      const requestBody = JSON.stringify({
        replyToken: replyToken,
        messages: [
          {
            type: "text",
            text: message,
          },
        ],
      });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}`,
        },
        body: requestBody,
      });

      return response;
    }

    if (request.method === "POST") {
      const reqBody = await readRequestBody(request);
      console.log(`The request body sent in was ${JSON.stringify(reqBody)}`);

      if (reqBody.events) {
        for (const event of reqBody.events) {
          if (event.type === "message" && event.message.type === "text") {
            await replyMessage(event.replyToken, event.message.text);
          }
        }
      }
      return new Response('OK');
    } else if (request.method === "GET") {
      return new Response("OK");
    }
  },
};
