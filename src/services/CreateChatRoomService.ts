import { injectable } from "tsyringe";
import { ChatRoom } from "../schemas/ChatRoom";

@injectable()
export class CreateChatRoomService {
  async execute(idUsers: String[]) {
    const room = await ChatRoom.create({
      idUsers
    });

    return room;
  }
}