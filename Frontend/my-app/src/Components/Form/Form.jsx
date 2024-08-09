// eslint-disable-next-line no-unused-vars
import Button from "../Button/Button";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  SForm,
  SFormTitle,
  SFormControl,
  SLable,
  SInput,
  SRedirect,
  SRedirectLink,
  SRedirectLabel,
  STextArea,
  SAreaControl,
} from "./Styles";

const prepareForm = (formArr) => {
  return formArr.reduce((r, v) => ({ ...r, [v.name]: v.value }), {});
};

function Form({
  title,
  formArr,
  submitBtn,
  onSubmit,
  redirect,
  onChange,
  withEvent,
  textares,
  textaresLabel,
}) {
  const initialForm = prepareForm(formArr);

  const [form, setForm] = useState(initialForm);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (withEvent) {
      onSubmit(e, form, () => setForm(initialForm));
    } else {
      onSubmit(form, () => setForm(initialForm));
    }
  };

  const onChangeHandler = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (onChange) onChange(e);
  };

  const hasRedirect = !!redirect;
  const hasTextArea = !!textares;
  return (
    <SForm
      onSubmit={onSubmitHandler}
      className="w-full bg-none p-6 sm:p-12 flex flex-col gap-5 border-2 rounded-2xl"
    >
      <SFormTitle className="text-primaryIndigo text-5xl font-bold font-spaceGrotesk ">
        {title}
      </SFormTitle>
      {formArr.map(
        ({ label, name, type, value, onChange, placeholder }, index) => (
          <SFormControl key={index} className="flex flex-col">
            <SLable htmlFor={name} className="text-slate-500">
              {label}
            </SLable>
            <SInput
              className="outline-none h-10 py-0 px-4 rounded-lg border-2 place-content-center items-center focus:border-indigo-300 text-slate-500 bg-primarybackground"
              autoComplete="off"
              id={name}
              name={name}
              type={type}
              value={value || form[name]}
              placeholder={placeholder}
              onChange={onChange}
            />
          </SFormControl>
        )
      )}
      {hasTextArea && (
        <SAreaControl className="w-full">
          <SLable htmlFor="textarea" className="text-slate-500">
            {textaresLabel}
          </SLable>
          <STextArea
            className="w-full h-32 outline-none py-4 px-4 rounded-lg border-2"
            id="textarea"
            name="textarea"
            value={form["textarea"] || ""}
            placeholder="Enter text here"
            onChange={onChangeHandler}
          />
        </SAreaControl>
      )}
      <Button primary extraSmall type="submit">
        {submitBtn}
      </Button>
      {hasRedirect && (
        <SRedirect className="text-sm font-semibold w-full flex gap-2 justify-center">
          <SRedirectLabel className="text-slate-600 ">
            {redirect.label}
          </SRedirectLabel>
          <SRedirectLink className="text-primaryIndigo" to={redirect.link.to}>
            {redirect.link.label}
          </SRedirectLink>
        </SRedirect>
      )}
    </SForm>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  formArr: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string,
      onChange: PropTypes.func,
    })
  ),
  submitBtn: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  redirect: PropTypes.object,
  onChange: PropTypes.func,
  withEvent: PropTypes.bool,
};

export default Form;
