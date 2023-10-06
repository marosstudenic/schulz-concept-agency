import Checkbox from "./Checkbox";

const OPTIONS = [
    "Branding", "Marketing", "Web", "E-commerce", "SEO", "PPC", "Social media", "Copywriting", "Video", "Fotografia", "Grafický dizajn", "Aplikáciu", "Iné"
]

const BUDGET_OPTIONS = [
    "menej ako 500 €", "500 - 1000 €", "1000 - 2000 €", "2000 - 5000 €", "5000 - 10000 €", "viac ako 10000 €"];



const Formular = () => {

    const section = 1;


    const Section1 =  <>
        <p className="text-3xl">Mam záujem o</p>
    <div className="grid grid-cols-2 gap-2 my-4">
        {OPTIONS.map((item) =>
            <Checkbox label={item} id={item} key={item}/>
        )}
    </div>
    </>;

    const section2 = <>
        <p className="text-3xl">Váš rozpočet</p>
            <div className="grid grid-cols-1 gap-2 my-4">
                {BUDGET_OPTIONS.map((item) =>
                    <Checkbox label={item} id={item} key={item} onClick={(e) => console.log(e.target.checked)}/>
                )}
            </div>
    </>;

    const section3 = <>
        <p className="text-3xl">O vás</p>
        </>


    const currentSection = section === 1 ? Section1 : section2;
    return (
        <section className="bg-white px-4">
            <div className="container mx-auto bg-gray-300 rounded-3xl py-8 px-4">
                <p className="text-black/50 mb-10">Formular</p>
                <form id="contactForm">

                    <p className="text-3xl">Mam záujem o</p>
                    {section2}
                    <div className="flex justify-center">
                        <button className="bg-black text-white px-8 py-2 rounded-3xl" type="button" onClick={console.log("hello")}>ďalej</button>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default Formular;