import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStore, createRandomColorRgb } from "data";
import { multiLangRegex } from "data/utils";
import cn from "classnames";
import s from "./styles.module.scss";

interface FormValues {
  nickname: string;
}

const HomePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ reValidateMode: "onChange" });

  const { setNickname, setColor } = useStore();

  const navigate = useNavigate();

  const onSubmit = ({ nickname }: FormValues) => {
    setNickname(nickname);
    setColor(createRandomColorRgb());
    navigate("/menu");
  };

  return (
    <div className={s.wrap}>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className={cn(s.form, s.formBg)}
      >
        <div className={s.formGroup}>
          <p className={s.formTitle}>Enter your nickname</p>
        </div>
        <div className={s.formGroup}>
          <input
            className={cn(s.formInput, errors.nickname && s.formInputError)}
            type="text"
            {...register("nickname", {
              required: "Field is required",
              validate: (value) =>
                multiLangRegex.test(value)
                  ? "Field contains forbidden characters"
                  : true,
            })}
          />
          {errors.nickname && (
            <div className={s.formGroupError}>{errors.nickname.message}</div>
          )}
        </div>
        <div className={s.formGroup}>
          <button className={s.formEnter} type="submit">
            Start
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
