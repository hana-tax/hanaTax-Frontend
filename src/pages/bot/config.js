import { createChatBotMessage } from "react-chatbot-kit";
import ChatbotHeader from "../../components/header/ChatbotHeader";
import BotAvatar from "../../assets/svg/talks.svg";
import ChatMessage from "../../components/ChatMessage";
const config = {
  initialMessages: [
    createChatBotMessage(
      "안녕하세요! 톡스 AI입니다. 궁금한 내용을 입력해주세요."
    ),
  ],
  customComponents: {
    header: () => <ChatbotHeader />,
    botAvatar: () => (
      <img
        src={BotAvatar}
        alt="Bot Avatar"
        style={{
          width: "30px",
          height: "30px",
          marginRight: "10px",
        }}
      />
    ),
    userAvatar: (props) => <div {...props} />,
    botChatMessage: (props) => <ChatMessage {...props} bot />,
    userChatMessage: (props) => <ChatMessage {...props} />,
  },
};

export default config;
