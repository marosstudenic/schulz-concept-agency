import React, { useState } from "react";
import Checkbox from "./Checkbox";
import emailjs from "emailjs-com";

import styles from "../css/Formular.module.css";
import { getLangFromUrl, useTranslations } from "../i18n/utils";
import type { ui } from "../i18n/ui";

type ProductOptions = {
  [key: string]: boolean;
};

type FormData = {
  products: ProductOptions;
  budget: string;
  name: string;
  email: string;
  phone: string;
  vision: string;
};

type Option = {
  name: string;
  label: string;
};

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

const BUDGET_OPTIONS = [
  "< 500 €",
  "500 – 1000 €",
  "1000 – 2500 €",
  "2500 – 5000 €",
  "5 000 – 10 000 €",
  "10 000 – 25 000 €",
  "25 000 – 50 000 €",
  "50 000 – 100 000 €",
  "100 000 €",
].map((option) => ({
  name: slugify(option),
  label: option,
}));

emailjs.init("vrpHqsq7jPzJ13OtB");

const Formular = ({ lang }: { lang: keyof typeof ui }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sending, setSending] = useState(false);
  const t = useTranslations(lang);
  
  const OPTIONS = (t("form.options") as string[]).map((option) => ({
    name: slugify(option),
    label: option,
  }));

  const [formData, setFormData] = useState<FormData>({
    products: OPTIONS.reduce(
      (acc, option) => ({ ...acc, [option.name]: false }),
      {}
    ),
    budget: "",
    name: "",
    email: "",
    phone: "",
    vision: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, budget: e.target.name });
  };

  const handleCheckboxChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      products: {
        ...prevState.products,
        [e.target.name]: !prevState.products[e.target.name],
      },
    }));
  };

  const handleTextChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .send("webglobe", "template_p6y1336", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        products: OPTIONS.filter((item) => formData.products[item.name])
          .map((item) => item.label)
          .join(","),
        budget:
          BUDGET_OPTIONS.find((item) => item.name === formData.budget)?.label ||
          "chyba",
        reply_to: formData.email,
        vision: formData.vision,
      })
      .then(
        (result: any) => {
          setSending(false);
          nextStep();
        },
        (error: any) => {
          console.log(error.text);
        }
      );
  };

  const Section1 = (
    <>
      <p className="text-3xl">{t("form.section-1.title") as string}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8 px-2">
        {OPTIONS.map(({ name, label }) => (
          <Checkbox
            name={name}
            label={label}
            id={name}
            key={name}
            checked={formData.products[name]}
            type="checkbox"
            onChange={handleCheckboxChange}
          />
        ))}
      </div>
      <div className="flex justify-center pt-10">
        <button
          className="bg-black text-white px-8 py-2 rounded-3xl"
          type="button"
          onClick={() => nextStep()}
        >
          {t("form.next") as string}
        </button>
      </div>
    </>
  );

  const section2 = (
    <>
      <p className="text-3xl">{t("form.section-2.title") as string}</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8 px-2">
        {BUDGET_OPTIONS.map(({ name, label }) => (
          <Checkbox
            name={name}
            label={label}
            id={name}
            key={name}
            type="radio"
            checked={formData.budget === name}
            onChange={(e) => handleChange(e)}
          />
        ))}
      </div>
      <div className="flex justify-center pt-10">
        <button
          className="text-black/40 px-8 py-2 rounded-3xl"
          type="button"
          onClick={() => prevStep()}
        >
          spať
        </button>
        <button
          className="bg-black text-white px-8 py-2 rounded-3xl"
          type="button"
          onClick={() => nextStep()}
        >
          ďalej
        </button>
      </div>
    </>
  );

  const section3 = (
    <>
      <p className="text-3xl">{t("form.section-3.title") as string}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-4">
        <div>
          <input
            className="appearance-none bg-transparent border-black w-full text-black/80 mr-3 py-2 px-0 my-2 leading-tight focus:outline-none border-b-2 border-b-gray-400 placeholder:text-black/60"
            type="text"
            placeholder={t("form.name") as string}
            aria-label="Full name"
            name="name"
            onChange={(e) => handleTextChange(e)}
            value={formData.name}
          />
          <input
            className="appearance-none bg-transparent border-black w-full text-black/80 mr-3 py-2 px-0 my-2 leading-tight focus:outline-none border-b-2 border-b-gray-400 placeholder:text-black/60"
            type="email"
            placeholder={t("form.email") as string}
            aria-label="Full name"
            name="email"
            onChange={(e) => handleTextChange(e)}
            value={formData.email}
          />
          <input
            className="appearance-none bg-transparent border-black w-full text-black/80 mr-3 py-2 px-0 my-2  leading-tight focus:outline-none border-b-2 border-b-gray-400 placeholder:text-black/60"
            type="text"
            placeholder={t("form.phone") as string}
            aria-label="Full name"
            name="phone"
            onChange={(e) => handleTextChange(e)}
            value={formData.phone}
          />
        </div>

        <div className={`input-wrapper ${styles["input-wrapper"]}`}>
          <input
            id="vision"
            className="appearance-none bg-transparent border-black w-full text-black/80 mr-3 py-2 px-0 leading-tight focus:outline-none border-b-2 border-b-gray-400 placeholder:text-black/60"
            type="text"
            placeholder=" "
            aria-label="Full name"
            name="vision"
            onChange={(e) => handleTextChange(e)}
            value={formData.vision}
          />
          <label htmlFor="vision">{t("form.vision") as string}</label>
        </div>
      </div>

      <div className="flex justify-center pt-10">
        <button
          className="text-black/40 px-8 py-2 rounded-3xl"
          type="button"
          onClick={() => prevStep()}
        >
          spať
        </button>
        <button
          className="bg-black text-white px-8 py-2 rounded-3xl"
          type="button"
          onClick={(e) => handleSubmit(e)}
        >
          {sending ? (t("form.sending") as string) : (t("form.send") as string)}
        </button>
      </div>
    </>
  );

  const section4 = (
    <>
      <img
        src="/assets/logos/logo.svg"
        alt="checked"
        className="mx-auto h-28 my-10"
      />
      {/*<p className="text-xl text-center text-black/80">Ďakujeme za vyplnenie formulára</p>*/}
      <p className="text-xl text-center  text-black/80 py-2">
        <b>{t("form.contact-soon") as string}</b>
      </p>
    </>
  );

  const sections = [Section1, section2, section3, section4];

  const currentSection = sections[currentStep - 1];
  return (
    <section className="bg-white px-4">
      <div className="container mx-auto bg-gray-300 rounded-3xl py-8 px-4">
        {currentStep < 4 && (
          <p className="text-black/50 mb-10 uppercase">
            {t("form.title") as string} &nbsp;&nbsp;<b>{currentStep} / 3</b>
          </p>
        )}
        <form id="contactForm">{currentSection}</form>
      </div>
    </section>
  );
};

export default Formular;
