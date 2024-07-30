import { useRef } from "react";

interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const InputField = ({ task, setTask, handleSubmit }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="container">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          handleSubmit(e);
          inputRef.current?.blur();
        }}
        className="flex justify-center mt-5 px-3"
      >
        <div className="w-full max-w-[500px] relative">
          <input
            ref={inputRef}
            value={task}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTask(e.target.value)
            }
            className="w-full px-8 py-5 rounded-full outline-none input_box"
            type="text"
            placeholder="Type your task..."
            required
          />

          <button className="bg-[#84a1ec] text-white w-[50px] h-[50px] rounded-full cursor-pointer text-[18px] font-semibold absolute right-2 top-2 shadow-xl hover:bg-[#6d8cdb] transition-all ease-in-out duration-200 active:w-[45px] active:h-[45px] active:text-[16px] active:top-3">
            Go
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputField;
