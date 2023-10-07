import React, { useState } from 'react';
import Checkbox from "./Checkbox";
import {Button} from "@material-tailwind/react";
import emailjs from 'emailjs-com';



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
    return str.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
}
const OPTIONS = [
    "Branding", "Marketing", "Web", "E-commerce", "SEO", "PPC", "Social media",
    "Copywriting", "Video", "Fotografia", "Grafický dizajn", "Aplikáciu", "Iné"
].map(option => ({ name: slugify(option), label: option }));

const BUDGET_OPTIONS = [
    "menej ako 500 €", "500 - 1000 €", "1000 - 2000 €", "2000 - 5000 €", "5000 - 10000 €", "viac ako 10000 €"].map(option => ({ name: slugify(option), label: option }));



emailjs.init('vrpHqsq7jPzJ13OtB');

const Formular = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [sending, setSending] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        products: OPTIONS.reduce((acc, option) => ({ ...acc, [option.name]: false }), {}),
        budget: '',
        name: '',
        email: '',
        phone: '',
        vision: ''
    });

    const handleChange = (e: any) => {
        setFormData({ ...formData, budget: e.target.name });
    };

    const handleCheckboxChange = (e: any) => {
        setFormData(prevState => ({
            ...prevState,
            products: {
                ...prevState.products,
                [e.target.name]: !prevState.products[e.target.name]
            }
        }));
    }

    const handleTextChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        setSending(true);

        emailjs.send("webglobe","template_p6y1336",{
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            products: OPTIONS.filter((item) => formData.products[item.name] ).map((item) => item.label).join(','),
            budget: BUDGET_OPTIONS.find((item) => item.name === formData.budget)?.label || "chyba",
            reply_to: formData.email,
            vision: formData.vision,
        }).then((result:any) => {
            setSending(false);
            nextStep();
                }, (error:any) => {
                    console.log(error.text);
                });
    };


    const Section1 =  <>
        <p className="text-3xl">Mam záujem o</p>
    <div className="grid grid-cols-2 gap-2 my-4 px-2">
        {OPTIONS.map(({ name, label }) => (
            <Checkbox  name={name} label={label} id={name} key={name} checked={formData.products[name]}
                       type="checkbox"                onChange={handleCheckboxChange}
            />

        ))}


    </div>
        <div className="flex justify-center pt-10">
            <Button className="text-black/40 px-8 py-2 rounded-3xl" type="button" onClick={()=>prevStep()}>spať</Button>
            <Button className="bg-black text-white px-8 py-2 rounded-3xl" type="button" onClick={()=>nextStep()}>ďalej</Button>
        </div>
    </>;

    const section2 = <>
        <p className="text-3xl">Váš rozpočet</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 my-4 px-2">
                {BUDGET_OPTIONS.map(({name, label}) =>
                    <Checkbox name={name} label={label} id={name} key={name} type="radio" checked={formData.budget === name} onChange={(e)=> handleChange(e)}/>
                )}
            </div>
        <div className="flex justify-center pt-10">
            <Button className="text-black/40 px-8 py-2 rounded-3xl" type="button" onClick={()=>prevStep()}>spať</Button>
            <Button className="bg-black text-white px-8 py-2 rounded-3xl" type="button" onClick={()=>nextStep()}>ďalej</Button>
        </div>
    </>;

    const section3 = <>
        <p className="text-3xl">O vás</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-4">
            <div>
                <input className="appearance-none bg-transparent border-black w-full text-black/80 mr-3 py-4 px-2 leading-tight focus:outline-none border-b-2 border-b-gray-400 placeholder:text-black/60"
                       type="text" placeholder="Meno" aria-label="Full name" name="name"
                       onChange={(e)=> handleTextChange(e)}
                        value={formData.name}
                />
                <input className="appearance-none bg-transparent border-black w-full text-black/80 mr-3 py-4 px-2 leading-tight focus:outline-none border-b-2 border-b-gray-400 placeholder:text-black/60"
                       type="email" placeholder="Email" aria-label="Full name" name="email"
                       onChange={(e)=> handleTextChange(e)}
                        value={formData.email}
                />
                <input className="appearance-none bg-transparent border-black w-full text-black/80 mr-3 py-4 px-2 leading-tight focus:outline-none border-b-2 border-b-gray-400 placeholder:text-black/60"
                       type="text" placeholder="Telefon" aria-label="Full name" name="phone"
                       onChange={(e)=> handleTextChange(e)}
                        value={formData.phone}
                />
             </div>

            <input className="appearance-none bg-transparent border-black w-full text-black/80 mr-3 py-4 px-2 leading-tight focus:outline-none border-b-2 border-b-gray-400 placeholder:text-black/60"
                   type="text" placeholder="Vaša vízia" aria-label="Full name" name="vision"
                   onChange={(e)=> handleTextChange(e)}
                   value={formData.vision}
            />        </div>

        <div className="flex justify-center pt-10">
            <Button className="text-black/40 px-8 py-2 rounded-3xl" type="button" onClick={()=>prevStep()}>spať</Button>
            <Button className="bg-black text-white px-8 py-2 rounded-3xl" type="button" onClick={(e)=>handleSubmit(e)}>{sending ? "Odosielam ..." : "Odoslať"}</Button>
        </div>

        </>

    const section4 = <>
        <img src="/assets/logos/logo.svg" alt="checked" className="mx-auto h-28 my-10"/>
        {/*<p className="text-xl text-center text-black/80">Ďakujeme za vyplnenie formulára</p>*/}
        <p className="text-xl text-center  text-black/80 py-2"><b>Čoskoro sa vám ozveme</b></p>
    </>;



    const sections = [Section1, section2, section3, section4];

    const currentSection = sections[currentStep-1];
    return (
        <section className="bg-white px-4">
            <div className="container mx-auto bg-gray-300 rounded-3xl py-8 px-4">
                <p className="text-black/50 mb-10">Formular <b>{currentStep} / 4</b></p>
                <form id="contactForm">
                    {currentSection}
                </form>
            </div>
        </section>
    )
}

export default Formular;