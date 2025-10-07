'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

interface DataType {
    sectionClass?: string;
}

const ContactV1 = ({ sectionClass }: DataType) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        comments: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.comments) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        toast.success('Message sent successfully!');
        
        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            comments: ''
        });
    };

    return (
        <>
            <div id="contact" className={`contact-style-one-area ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Contact</h4>
                                <h2 className="title">Let&apos;s Work Together</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="contact-style-one-items">
                        <div className="row align-items-center">
                            <div className="col-lg-7 contact-form-box">
                                <div className="form-content">
                                    <form className="contact-form" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input 
                                                        className="form-control" 
                                                        id="name" 
                                                        name="name" 
                                                        placeholder="Name *" 
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <input 
                                                        className="form-control" 
                                                        id="email" 
                                                        name="email" 
                                                        placeholder="Email *" 
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <input 
                                                        className="form-control" 
                                                        id="phone" 
                                                        name="phone" 
                                                        placeholder="Phone" 
                                                        type="text"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group comments">
                                                    <textarea 
                                                        className="form-control" 
                                                        id="comments" 
                                                        name="comments" 
                                                        placeholder="Tell me about your project *"
                                                        value={formData.comments}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button type="submit" name="submit" id="submit">
                                                    <i className="fa fa-paper-plane" /> Send Message
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-5 contact-illustration">
                                <img src="/assets/img/illustration/contact.png" alt="Image Not Found" />
                                <img src="/assets/img/shape/9.png" alt="Image Not Found" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactV1; 