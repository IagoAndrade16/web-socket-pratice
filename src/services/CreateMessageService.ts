import { injectable } from "tsyringe";
import { Message } from "../schemas/Message";

type CreateMessageDTO = {
    to: string,
    text: string,
    created_at?: Date,
    roomId: string
}

@injectable()
export class CreateMessageService {
  async execute({ to , text, roomId }: CreateMessageDTO) {
    const message = await Message.create({
      to, 
      text,
      roomId
    });

    return message;
  }
}