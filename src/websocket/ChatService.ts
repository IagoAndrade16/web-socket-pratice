import { container } from "tsyringe"
import { io } from "../http"
import { CreateUserService } from "../services/CreateUserService"
import { GetAllUsersService } from "../services/GetAllUsersService"
import { CreateChatRoomService } from "../services/CreateChatRoomService"
import { GetUserBySocketId } from "../services/GetUserBySocketIdService"
import { GetChatRoomByUserService } from "../services/GetChatRoomByUsersService"

io.on("connect", socket => {
  socket.on("start", async (data) => {
    const { name, email, avatar } = data;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email, 
      avatar, 
      name, 
      socket_id: socket.id
    });

    socket.broadcast.emit("new_users", user);
  })

  socket.on("get_users", async (callback) => {
    const getAllUsersService = container.resolve(GetAllUsersService);
    const users = await getAllUsersService.execute();

    callback(users)
  })

  socket.on("start_chat", async (data, callback) => {
    const createChatRoomService = container.resolve(CreateChatRoomService);
    const getUserBySocketId = container.resolve(GetUserBySocketId);
    const getChatRoomByUserService = container.resolve(GetChatRoomByUserService)

    const userLogged = await getUserBySocketId.execute(socket.id);


    let room = await getChatRoomByUserService.execute([
      data.idUser, userLogged._id
    ])

    if(!room) {
      room = await createChatRoomService.execute([data.idUser, userLogged._id])
    }

    callback(room);
  })
})