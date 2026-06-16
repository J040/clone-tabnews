import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import user from "models/user.js"

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  // api/v1/users/[username]
  // api/v1/users/JoaoVictor
  const username = request.query.username; // "JoaoVictor"
  const userFound = await user.findOneByUsername(username);
  return response.status(200).json(userFound);
}
