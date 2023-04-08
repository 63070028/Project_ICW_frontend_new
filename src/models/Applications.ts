import ApplicationJob from "./ApplicationJob";
import ApplicationProgram from "./ApplicationProgram";
export default interface Applications {
  applicationJob:ApplicationJob[] | number[],
  applicationProgram:ApplicationProgram[] | number[]
}
  