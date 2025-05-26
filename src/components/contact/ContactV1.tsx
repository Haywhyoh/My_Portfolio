import illustration5 from "/assets/img/illustration/5.png"
import shape13 from "/assets/img/shape/13.png"
import { toast } from 'react-toastify';

interface FormEventHandler {
    (event: React.FormEvent<HTMLFormElement>): void;
}

interface DataType {
    sectionClass?: string;
}

const ContactV1 = ({ sectionClass }: DataType) => {

    const handleForm: FormEventHandler = (event) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        form.reset()
        toast.success("Thanks For Your Message")
    }

    return (
        <>
            <div id="contact" className={`contact-style-one-area ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="contact-style-one-items">
                        <h1 className="fixed-text">Contact Me</h1>
                        <div className="row">
                            <div className="col-lg-6">
                                <form className="contact-form contact-form" onSubmit={handleForm}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input className="form-control" id="name" name="name" placeholder="Name" type="text" autoComplete='off' required />
                                                <span className="alert-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input className="form-control" id="email" name="email" placeholder="Email*" type="email" autoComplete='off' required />
                                                <span className="alert-error" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input className="form-control" id="phone" name="phone" placeholder="Phone" type="text" autoComplete='off' required />
                                                <span className="alert-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group comments">
                                                <textarea className="form-control" id="comments" name="comments" placeholder="Tell Us About Project *" autoComplete='off' required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <button className="btn-style-regular" type="submit" name="submit" id="submit">
                                                <span>Get in Touch</span> <i className="fas fa-arrow-right" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* Alert Message */}
                                    <div className="col-lg-12 alert-notification">
                                        <div id="message" className="alert-msg" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="contact-illustration">
                            <img src={illustration5} alt="Image Not Found" />
                            <img src={shape13} alt="Image Not Found" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactV1;