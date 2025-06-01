import { createContext } from "react";

interface UserContext {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

const UserContext = createContext<UserContext | null>(null);

export default UserContext;
