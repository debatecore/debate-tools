import { debateConf, defaultDebateConf } from "@/types/debate";
import { createContext } from "react";

const DebateContext = createContext<{
  conf: debateConf;
  setConf: (conf: debateConf) => void;
}>({
  conf: defaultDebateConf,
  setConf: (conf) => {},
});
export { DebateContext };
